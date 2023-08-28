import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import { Textarea, Select } from "@windmill/react-ui";
import SwitchToggle from "components/form/SwitchToggle";
import TextAreaCom from "components/form/TextAreaCom";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useEventSubmit from "hooks/useEventSubmit";
import Tree from "rc-tree";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";
//internal import
import EventServices from "services/CategoryServices";
import { notifyError } from "utils/toast";
import { showingTranslateValue } from "utils/translate";

const EventDrawer = ({ id, data, lang }) => {
  const { t } = useTranslation();

  const {
    checked,
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    setChecked,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
    isSubmitting,
    imageFile,
    setImageFile,
    files,
    setFiles,
  } = useEventSubmit(id, data);

  const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: showingTranslateValue(category.name, lang),
        key: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={"Update Event"}
            description={"Update event details with the form below"}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={"Add Event"}
            description={"Add event post by filling the form below"}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Title"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Event title"
                  name="title"
                  type="text"
                  placeholder={"Event Title"}
                />
                <Error errorName={errors.title} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Location"} />
              <div className="col-span-8 sm:col-span-4">
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label="Event location"
                    name="location"
                    type="text"
                    placeholder={"Event location"}
                  />
                  <Error errorName={errors.location} />
                </div>
                {/*  <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                >
                  <option value="" defaultValue hiden>
                    Location
                  </option>
                  <option value={"kahia"}>Kahia</option>
                  <option value={"pacha"}>Pacha</option>
                </Select>
                <Error errorName={errors.location} /> */}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Start Date"} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`startDate`, {
                    required: "Event Date required",
                  })}
                  label="Event Start Time"
                  name="startDate"
                  type="datetime-local"
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />

                <Error errorName={errors.startDate} />
              </div>
            </div>
            {/*   <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Duration"} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`numberOfDays`)}
                  label="Event duration"
                  name="numberOfDays"
                  type="number"
                  placeholder={"Event duration"}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />

                <Error errorName={errors.numberOfDays} />
              </div>
            </div> */}

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Description"} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  {...register(`description`, {
                    required: "Event description required",
                  })}
                  register={register}
                  label="Description"
                  name="description"
                  type="text"
                  placeholder="Event Description"
                />
                <Error errorName={errors.description} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Image"} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="category"
                  imageFile={imageFile}
                  setImageFile={setImageFile}
                  files={files}
                  setFiles={setFiles}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Published"} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Event" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default EventDrawer;
