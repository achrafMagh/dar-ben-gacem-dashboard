import React, { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

// internal imports
import { notifyError, notifySuccess } from "../../utils/toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Container from "./Container";

const Uploader = ({
  setImageUrl,
  imageUrl,
  product,
  folder,
  imageFile,
  setImageFile,
  files,
  setFiles,
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      setImageFile(file);

      setFiles([
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ]);
    },
  });

  // 🔹 Upload to Cloudinary (Unsigned – Browser Safe)
  useEffect(() => {
    if (!files.length) return;

    const uploadImage = async () => {
      try {
        setLoading(true);
        setError(t("Uploading"));

        const file = files[0];
        const name = file.name.replace(/\s/g, "");
        const public_id = name.substring(0, name.lastIndexOf("."));

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );
        formData.append("folder", folder);
        formData.append("public_id", public_id);

        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL,
          formData
        );

        notifySuccess("Image uploaded successfully");

        if (product) {
          setImageUrl((prev) => [...prev, res.data.secure_url]);
        } else {
          setImageUrl(res.data.secure_url);
        }
      } catch (error) {
        console.error(error);
        notifyError("Image upload failed");
      } finally {
        setLoading(false);
        setError("");
      }
    };

    uploadImage();
  }, [files, folder, product, setImageUrl]);

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleRemoveImage = () => {
    setImageFile("");
    setImageUrl(product ? [] : "");
    setFiles([]);
  };

  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer px-6 pt-5 pb-6"
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-green-500" />
        </span>
        <p className="text-sm mt-2">{t("DragYourImage")}</p>
        <em className="text-xs text-gray-400">{t("imageFormat")}</em>
      </div>

      {loading && <div className="text-green-500 mt-2">{err}</div>}

      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : imageUrl ? (
          <div className="relative">
            <img
              src={imageUrl}
              alt={t("UploadedImage")}
              className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-0 text-red-500"
            >
              <FiXCircle />
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
};

export default Uploader;
