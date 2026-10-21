import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../i18n';

const TOAST_TRANSLATION_KEYS = {
  "Login Success!": "ToastLoginSuccess",
  "Login Failed! Please try again.": "ToastLoginFailed",
  "Image uploaded successfully": "ToastImageUploaded",
  "Image upload failed": "ToastImageUploadFailed",
  "Please upload/select csv file first!": "ToastUploadCsvFirst",
  "Please select a valid .JSON/.CSV/.XLS file first!": "ToastSelectValidImportFile",
  "Event updated successfully!": "ToastEventUpdated",
  "Event added successfully!": "ToastEventAdded",
  "Press updated successfully!": "ToastPressUpdated",
  "Failed to update press, please try again": "ToastPressUpdateFailed",
  "Press added successfully!": "ToastPressAdded",
  "Failed to add press, please try again": "ToastPressAddFailed",
  "Event deleted successfully!": "ToastEventDeleted",
  "Press deleted successfully!": "ToastPressDeleted",
  "This category already selected!": "ToastCategoryAlreadySelected",
};

const normalizeMessage = (message = "") =>
  String(message).replace(/\s+/g, " ").trim();

const localizeToastMessage = (message) => {
  if (!message) return message;

  const normalized = normalizeMessage(message);
  const key = TOAST_TRANSLATION_KEYS[normalized];

  if (!key) return message;

  const translated = i18n.t(key, { defaultValue: normalized });
  return translated || message;
};

const notifySuccess = (message) =>
  toast.success(localizeToastMessage(message), {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const notifyError = (message) =>
  toast.error(localizeToastMessage(message), {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

// eslint-disable-next-line no-unused-expressions
<ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>;

export { ToastContainer, notifySuccess, notifyError };
