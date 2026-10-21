import { Badge } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const Status = ({ status }) => {
  const { t } = useTranslation();
  const translatedStatus = {
    Pending: t("Pending"),
    Inactive: t("Inactive"),
    "Waiting for Password Reset": t("WaitingForPasswordReset"),
    Processing: t("Processing"),
    Delivered: t("Delivered"),
    Active: t("Active"),
    Cancel: t("Cancel"),
    "POS-Completed": t("POSCompleted"),
  }[status] || status;

  return (
    <>
      <span className="font-serif">
        {(status === "Pending" || status === "Inactive") && (
          <Badge type="warning">{translatedStatus}</Badge>
        )}
        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{translatedStatus}</Badge>
        )}
        {status === "Processing" && <Badge>{translatedStatus}</Badge>}
        {(status === "Delivered" || status === "Active") && (
          <Badge type="success">{translatedStatus}</Badge>
        )}
        {status === "Cancel" && <Badge type="danger">{translatedStatus}</Badge>}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{translatedStatus}</Badge>
        )}
      </span>
    </>
  );
};

export default Status;
