import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import EventServices from "services/EventServices";
import { notifyError, notifySuccess } from "utils/toast";
import dayjs from "dayjs";

const useEventSubmit = (id, data) => {
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

  // console.log("lang", lang, language);

  const onSubmit = async (data) => {
    console.log(data);
    console.log("imageFile", imageFile);
    console.log("imageUrl", imageUrl);
    co;
    const {
      title,
      description,
      startDate,

      numberOfDays,
      location,
      isPublished,
    } = data;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("startDate", startDate);
    formData.append("numberOfDays", numberOfDays);
    formData.append("description", description);
    formData.append("image", imageFile);
    formData.append("location", location);

    formData.append("isPublished", published);
    console.log("formaData", formData);

    if (id) {
      const res = await EventServices.updateEvent(id, formData);
      setIsUpdate(true);
      setIsSubmitting(false);
      notifySuccess(res.message);
      closeDrawer();
      reset();
    } else {
      const res = await EventServices.addEvent(formData);
      console.log("add EVENT");
      setIsUpdate(true);
      setIsSubmitting(false);
      notifySuccess(res.message);
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
      setValue("startDate");
      setValue("numberOfDays");
      // setValue("registrationEndDate");
      setValue("location");

      setImageUrl("");
      setImageFile("");
      setFiles([]);
      setPublished(true);

      clearErrors("title");
      clearErrors("description");
      clearErrors("startDate");
      clearErrors("numberOfDays");
      clearErrors("location");

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
          const res = await EventServices.getEventById(id);
          console.log("res category", res);

          if (res) {
            setValue("title", res.data.title);
            setValue("description", res.data.description);
            setValue(
              "startDate",
              dayjs(res.data.startDate).format("YYYY-MM-DD HH:mm")
            );

            setValue("location", res.data.location);
            setValue("numberOfDays", res.data.numberOfDays);
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

export default useEventSubmit;
