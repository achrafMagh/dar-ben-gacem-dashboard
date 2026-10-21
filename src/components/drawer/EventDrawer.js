import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import TextAreaCom from "components/form/TextAreaCom";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import useEventSubmit from "hooks/useEventSubmit";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

const EventDrawer = ({ id, data }) => {
  const { t } = useTranslation();

  const {
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    handleSelectLanguage,
    isSubmitting,
    imageFile,
    setImageFile,
    files,
    setFiles,
  } = useEventSubmit(id, data);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateEvent")}
            description={t("UpdateEventDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddEvent")}
            description={t("AddEventDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Title")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label={t("EventTitle")}
                  name="title"
                  type="text"
                  placeholder={t("EventTitlePlaceholder")}
                />
                <Error errorName={errors.title} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Locations")} />
              <div className="col-span-8 sm:col-span-4">
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    label={t("EventLocation")}
                    name="location"
                    type="text"
                    placeholder={t("EventLocationPlaceholder")}
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
              <LabelArea label={t("StartDate")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`startDate`, {
                    required: t("EventDateRequired"),
                  })}
                  label={t("EventStartTime")}
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
              <LabelArea label={t("Description")} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  {...register(`description`, {
                    required: t("EventDescriptionRequired"),
                  })}
                  register={register}
                  label={t("Description")}
                  name="description"
                  type="text"
                  placeholder={t("EventDescriptionPlaceholder")}
                />
                <Error errorName={errors.description} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Image")} />
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
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title={t("Events")} isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default EventDrawer;
