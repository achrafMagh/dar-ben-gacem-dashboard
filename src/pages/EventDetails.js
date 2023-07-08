import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
//internal import
import MainDrawer from "components/drawer/MainDrawer";
import EventDrawer from "components/drawer/EventDrawer";
import Loading from "components/preloader/Loading";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import useProductSubmit from "hooks/useProductSubmit";
import useToggleDrawer from "hooks/useToggleDrawer";
import EventServices from "services/EventServices";
import dayjs from "dayjs";

const EventDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { handleUpdate } = useToggleDrawer();
  const { attribue } = useProductSubmit(id);
  const [variantTitle, setVariantTitle] = useState([]);
  const { lang } = useContext(SidebarContext);

  const { data, loading } = useAsync(() => EventServices.getEventById(id));

  console.log("data", data);

  return (
    <>
      <MainDrawer product>
        <EventDrawer id={id} />
      </MainDrawer>

      <PageTitle>{"Event details"}</PageTitle>

      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full w-full align-middle transition-all transform">
          <div className="flex flex-col  lg:flex-row md:flex-row w-full overflow-hidden ">
            <div className="w-full">
              <div className="flex-shrink-0 flex lg:w-7/12 items-center justify-center h-auto ">
                <img
                  src={process.env.REACT_APP_UPLOAD_URL + "/" + data.data.image}
                  alt={data?.data?.title}
                />
              </div>
              <p className="text-base leading-6 text-gray-500 dark:text-gray-400 md:leading-7 pt-20">
                {data?.data?.description.split(/\r?\n/).map((item, i) => {
                  return (
                    <li key={i}>
                      <span className="text-gray-700 dark:text-gray-400">
                        {item}
                      </span>
                    </li>
                  );
                })}
              </p>
            </div>
            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              <div className="mb-5 block ">
                <div className="font-serif font-semibold py-1 text-sm">
                  <p className="text-sm text-gray-500 pr-4">
                    Status:{" "}
                    {data.data.isPublished ? (
                      <span className="text-green-400">
                        This event is published
                      </span>
                    ) : (
                      <span className="text-red-400">
                        {" "}
                        This event is not published
                      </span>
                    )}
                  </p>
                </div>
                <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif dark:text-gray-400">
                  {data?.data?.title}
                </h2>

                <div className="pt-10">
                  <span className="font-semibold text-lg">Start Date: </span>{" "}
                  {dayjs(data?.data?.startDate).format("MM/D/YYYY HH:mm")}
                </div>
                <div className="pt-2">
                  <span className="font-semibold text-lg">Duration:</span>{" "}
                  {data?.data?.numberOfDays === 1
                    ? `${data?.data?.numberOfDays} day`
                    : `${data?.data?.numberOfDays} days`}
                </div>
                <div className="pt-2">
                  <span className="font-semibold text-lg">Location:</span>{" "}
                  {data?.data?.location}
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleUpdate(id)}
                  className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300"
                >
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetails;
