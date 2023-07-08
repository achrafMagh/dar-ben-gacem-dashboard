import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { Link } from "react-router-dom";

//internal import
import { IoRemoveSharp } from "react-icons/io5";
import useToggleDrawer from "hooks/useToggleDrawer";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import CategoryDrawer from "components/drawer/CategoryDrawer";
import CheckBox from "components/form/CheckBox";
import ShowHideButton from "components/table/ShowHideButton";
import EditDeleteButton from "components/table/EditDeleteButton";
import { showingTranslateValue } from "utils/translate";
import Tooltip from "components/tooltip/Tooltip";
import { FiZoomIn } from "react-icons/fi";

const CategoryTable = ({
  data,
  lang,
  isCheck,
  categories,
  setIsCheck,
  useParamId,
  showChild,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category._id}>
            <TableCell className="font-semibold uppercase text-xs h-full">
              {category?._id?.substring(20, 24)}
            </TableCell>
            <TableCell>
              {category?.image ? (
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50 p-1"
                  src={process.env.REACT_APP_UPLOAD_URL + "/" + category.image}
                  alt={category?.image}
                />
              ) : (
                <Avatar
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="product"
                  className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                />
              )}
            </TableCell>
            <TableCell className="text-sm">{category?.title}</TableCell>
            {/* <TableCell className="text-sm w-10 h-8">
              {category?.description}
            </TableCell> */}
            {/* <TableCell className="text-sm ">{category?.link}</TableCell> */}
            <TableCell className="text-sm">{category?.source}</TableCell>

            <TableCell className="text-center">
              <ShowHideButton
                id={category._id}
                category
                status={category.isPublished}
              />
            </TableCell>
            <TableCell>
              <div className="flex justify-end items-center">
                <Link
                  to={`/press/${category?._id}`}
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
                  id={category?._id}
                  parent={category}
                  isCheck={isCheck}
                  children={category?.children}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={category?.title || "press"}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
