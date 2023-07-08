import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { Link } from "react-router-dom";

//internal import
import { IoRemoveSharp } from "react-icons/io5";
import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EventDrawer from "components/drawer/EventDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import dayjs from "dayjs";
import Tooltip from "components/tooltip/Tooltip";
import { FiZoomIn } from "react-icons/fi";

const EventTable = ({
  data,
  lang,
  isCheck,
  events,
  setIsCheck,
  useParamId,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  console.log("table", data);

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <MainDrawer>
        <EventDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <TableBody>
        {data?.map((event) => (
          <TableRow key={event._id}>
            <TableCell>
              {event?.image ? (
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50 p-1"
                  src={process.env.REACT_APP_UPLOAD_URL + "/" + event.image}
                  alt={event?.image}
                />
              ) : (
                <Avatar
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="event"
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                />
              )}
            </TableCell>
            <TableCell className="text-sm">{event?.title}</TableCell>
            <TableCell className="text-sm">
              {dayjs(event?.startDate).format("MM/D/YYYY HH:mm:ss")}
            </TableCell>
            <TableCell className="text-sm">{`${event?.numberOfDays} days`}</TableCell>

            <TableCell className="text-sm">{event?.location}</TableCell>

            <TableCell className="text-center">
              <ShowHideButton
                id={event._id}
                category
                status={event.isPublished}
              />
            </TableCell>
            <TableCell>
              <div className="flex justify-end items-center">
                <Link
                  to={`/events/${event?._id}`}
                  className="p-2 text-gray-400 hover:text-green-600"
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title={"View details"}
                    bgColor="#10B981"
                  />
                </Link>
                <EditDeleteButton
                  id={event?._id}
                  parent={event}
                  isCheck={isCheck}
                  children={event?.children}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={event?.title || "event"}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default EventTable;
