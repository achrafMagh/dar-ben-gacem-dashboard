import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { Link } from "react-router-dom";

//internal import
import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import PressDrawer from "components/drawer/PressDrawer";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import Tooltip from "components/tooltip/Tooltip";
import { FiZoomIn } from "react-icons/fi";

const PressTable = ({
  data,
  lang,
  isCheck,
  presses,
  setIsCheck,
  useParamId,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate, setServiceId } =
    useToggleDrawer();

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal
          id={serviceId}
          useParamId={useParamId}
          serviceId={serviceId}
          setServiceId={setServiceId}
          title={title}
        />
      )}

      <MainDrawer>
        <PressDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <TableBody>
        {presses?.map((press) => (
          <TableRow key={press._id}>
            <TableCell className="font-semibold uppercase text-xs h-full">
              {press?._id?.substring(20, 24)}
            </TableCell>
            <TableCell>
              {press?.image ? (
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50 p-1"
                  src={process.env.REACT_APP_UPLOAD_URL + "/" + press.image}
                  alt={press?.image}
                />
              ) : (
                <Avatar
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="product"
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                />
              )}
            </TableCell>
            <TableCell className="text-sm">{press?.title}</TableCell>

            <TableCell className="text-sm">{press?.source}</TableCell>

            <TableCell className="text-center">
              <ShowHideButton id={press._id} press status={press.isPublished} />
            </TableCell>
            <TableCell>
              <div className="flex justify-end items-center">
                <Link
                  to={`/press/${press?._id}`}
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
                  id={press?._id}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={() =>
                    handleModalOpen(press?._id, press?.title)
                  }
                  title={press?.title || "press"}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PressTable;
