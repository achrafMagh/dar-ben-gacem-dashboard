import React from "react";
import { useParams } from "react-router";
//internal import
import MainDrawer from "components/drawer/MainDrawer";
import PressDrawer from "components/drawer/PressDrawer";
import Loading from "components/preloader/Loading";
import PageTitle from "components/Typography/PageTitle";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import PressServices from "services/PressServices";

const PressDetails = () => {
  const { id } = useParams();

  const { handleUpdate } = useToggleDrawer();

  const { data, loading } = useAsync(() => PressServices.getPressById(id));

  return (
    <>
      <MainDrawer product>
        <PressDrawer id={id} />
      </MainDrawer>

      <PageTitle>{"Press details"}</PageTitle>

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
            </div>
            <div className="w-full flex flex-col p-5 md:p-8 text-left dark:text-gray-400">
              <div className="mb-5 block ">
                <div className="font-serif font-semibold py-1 text-sm">
                  <p className="text-sm text-gray-500 pr-4">
                    Status:{" "}
                    {data.data.isPublished ? (
                      <span className="text-green-400">
                        This press is published
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

                <div className="pt-10 ">
                  <span className="font-semibold text-lg dark:text-gray-400">
                    Source:{" "}
                  </span>{" "}
                  {data?.data?.source}
                </div>
                <div className="pt-2 dark:text-gray-400">
                  <span className="font-semibold text-lg">Link:</span>{" "}
                  <a
                    href={data?.data?.link}
                    target="_blank"
                    className="underline hover:font-semibold"
                  >
                    Press link
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => handleUpdate(id)}
                  className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300"
                >
                  Edit Press
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PressDetails;
