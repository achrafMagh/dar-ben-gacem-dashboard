import Tooltip from 'components/tooltip/Tooltip';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useTranslation } from "react-i18next";
//internal import


const EditDeleteButtonTwo = ({
  extra,
  variant,
  handleRemoveVariant,
  attribute,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-end text-right">
        {!attribute && (
          <div
            // onClick={() => handleEditVariant(variant)}
            className="p-2 cursor-pointer text-gray-400 hover:text-green-600"
          >
            <Tooltip id="edit" Icon={FiEdit} title={t("Edit")} bgColor="#14b8a6" />
          </div>
        )}

        <div
          onClick={() => handleRemoveVariant(variant, extra)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            title={t("Delete")}
            bgColor="#EF4444"
          />
        </div>
      </div>
    </>
  );
};

export default EditDeleteButtonTwo;
