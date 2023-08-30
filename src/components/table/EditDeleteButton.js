import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import Tooltip from "../tooltip/Tooltip";

import { useTranslation } from "react-i18next";

const EditDeleteButton = ({
  id,
  title,
  handleUpdate,
  handleModalOpen,
  isCheck,
  product,
}) => {
  const { t } = useTranslation();
  // console.log('edite delet button')
  return (
    <>
      <div className="flex justify-end text-right">
        <button
          disabled={isCheck?.length > 0}
          onClick={() => handleUpdate(id)}
          className="p-2 cursor-pointer text-gray-400 hover:text-green-600 focus:outline-none"
        >
          <Tooltip
            id="edit"
            Icon={FiEdit}
            title={t("Edit")}
            bgColor="#10B981"
          />
        </button>

        <button
          disabled={isCheck?.length > 0}
          onClick={() => handleModalOpen(id, title, product)}
          className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
        >
          <Tooltip
            id="delete"
            Icon={FiTrash2}
            title={t("Delete")}
            bgColor="#EF4444"
          />
        </button>
      </div>
    </>
  );
};

export default EditDeleteButton;
