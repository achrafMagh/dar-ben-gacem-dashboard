import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import PressServices from "services/CategoryServices";
import { notifyError, notifySuccess } from "utils/toast";
const useCategorySubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [files, setFiles] = useState([]);

  const [children, setChildren] = useState([]);
  const [language, setLanguage] = useState(lang);
  const [published, setPublished] = useState(true);
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { title, description, source, link, isPublished } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("source", source);
    formData.append("link", link);
    formData.append("image", imageFile);
    formData.append("isPublished", published);

    if (id) {
      const res = await PressServices.updatePress(id, formData);
      if (res.success === true) {
        notifySuccess("Press updated successfully!");
      } else {
        notifyError("Failed to update press, please try again");
      }
      setIsUpdate(true);
      setIsSubmitting(false);
      notifySuccess(res.message);
      closeDrawer();
      reset();
    } else {
      const res = await PressServices.addPress(formData);
      if (res.success === true) {
        notifySuccess("Press added successfully!");
      } else {
        notifyError("Failed to add press, please try again");
      }
      setIsUpdate(true);
      setIsSubmitting(false);
      closeDrawer();
    }

    /* try {
      setIsSubmitting(true);
      const categoryData = {
        name: {
          [language]: name,
        },
        description: { [language]: description ? description : "" },
        parentId: checked ? checked : undefined,
        parentName: selectCategoryName ? selectCategoryName : "Home",
        // parentName: selectCategoryName ? selectCategoryName : 'Home',

        icon: imageUrl,
        status: published ? "show" : "hide",
        lang: language,
      };

      // console.log('category submit', categoryData);

      if (id) {
        const res = await CategoryServices.updateCategory(id, categoryData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await CategoryServices.addCategory(categoryData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
      cl oseDrawer();
    }*/
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("title");
      setValue("description");
      setValue("source");
      setValue("link");
      setValue("date");
      setImageUrl("");
      setImageFile("");
      setFiles([]);
      setPublished(true);

      clearErrors("title");
      clearErrors("description");
      clearErrors("source");
      clearErrors("link");
      clearErrors("date");

      setLanguage(lang);
      setValue("language", language);

      if (data !== undefined && data[0]?._id !== undefined) {
        setChecked(data[0]._id);
      }
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await PressServices.getPressById(id);

          if (res) {
            setValue("title", res.data.title);
            setValue("description", res.data.description);
            setValue("source", res.data.source);
            setValue("link", res.data.link);
            setValue("date", res.data.date);
            setImageUrl(
              process.env.REACT_APP_UPLOAD_URL + "/" + res.data.image
            );
            setPublished(res.data.isPublished);

            /*  setResData(res);
            setValue("name", res.name[language ? language : "en"]);
            setValue(
              "description",
              res.description[language ? language : "en"]
            );
            setValue("language", language);
            setValue("parentId", res.parentId);
            setValue("parentName", res.parentName);
            setSelectCategoryName(res.parentName);
            setChecked(res.parentId);
            setImageUrl(res.icon);
            setPublished(res.status === "show" ? true : false); */
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, data, lang]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
    published,
    setPublished,
    checked,
    setChecked,
    isSubmitting,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
    imageFile,
    setImageFile,
    files,
    setFiles,
  };
};

export default useCategorySubmit;
