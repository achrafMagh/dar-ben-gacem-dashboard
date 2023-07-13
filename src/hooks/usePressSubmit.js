import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import PressServices from "services/PressServices";
import { notifyError, notifySuccess } from "utils/toast";

const usePressSubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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

  const onSubmit = async ({ title, description, source, link, date }) => {
    try {
      setIsSubmitting(true);
      const pressData = {
        title: title,
        description: description,
        source: source,
        linl: link,
        date: date,
        image: imageUrl,
        isPublished: published ? "show" : "hide",
      };

      // console.log('category submit', categoryData);

      if (id) {
        const res = await PressServices.updatePress(id, pressData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await PressServices.addPress(pressData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
    }
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
            setResData(res);
            setValue("title", res.data.title);
            setValue("description", res.data.description);
            setValue("source", res.data.source);
            setValue("link", res.data.link);
            setValue("date", res.data.date);

            setChecked(res.parentId);
            setImageUrl(res.data.image);
            setPublished(res.status === "show" ? true : false);
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
  };
};

export default usePressSubmit;
