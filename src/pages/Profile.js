import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Card, CardBody, Input, Label } from "@windmill/react-ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PageTitle from "components/Typography/PageTitle";
import Error from "components/form/Error";
import { AdminContext } from "context/AdminContext";
import AdminServices from "services/AdminServices";
import { notifyError, notifySuccess } from "utils/toast";

const Profile = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AdminContext);
  const { adminInfo } = state;
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: adminInfo?.email || "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setValue("email", adminInfo?.email || "");
  }, [adminInfo, setValue]);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const res = await AdminServices.getMe();
        if (res?.data?.email) {
          setValue("email", res.data.email);
        }
      } catch (error) {
        // Keep existing cookie/context data if this request fails.
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [setValue]);

  const onSubmit = async ({ email, currentPassword, password }) => {
    setSaving(true);
    try {
      const payload = { email };
      if (password) {
        payload.password = password;
        payload.currentPassword = currentPassword;
      }

      const res = await AdminServices.updateMe(payload);
      const updatedEmail = res?.data?.email || email;

      const nextAdminInfo = {
        ...(adminInfo || {}),
        email: updatedEmail,
      };

      dispatch({ type: "USER_LOGIN", payload: nextAdminInfo });
      Cookies.set("adminInfo", JSON.stringify(nextAdminInfo), { expires: 0.5 });
      notifySuccess(t("ProfileUpdatedSuccessfully"));

      reset({
        email: updatedEmail,
        currentPassword: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      notifyError(error?.response?.data?.error || t("UnableToUpdateProfile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageTitle>{t("EditProfile")}</PageTitle>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:max-w-xl">
            <Label>
              <span>{t("ProfileEmail")}</span>
              <Input
                {...register("email", { required: t("EmailIsRequired") })}
                className="mt-1"
                placeholder="admin@example.com"
              />
              <Error errorName={errors.email} />
            </Label>

            <Label>
              <span>{t("CurrentPassword")}</span>
              <Input
                {...register("currentPassword", {
                  validate: (value) =>
                    watch("password") && !value
                      ? t("CurrentPasswordRequired")
                      : true,
                })}
                className="mt-1"
                type="password"
                placeholder={t("CurrentPassword")}
              />
              <Error errorName={errors.currentPassword} />
            </Label>

            <Label>
              <span>{t("NewPassword")}</span>
              <Input
                {...register("password", {
                  minLength: {
                    value: 6,
                    message: t("PasswordMinLength"),
                  },
                })}
                className="mt-1"
                type="password"
                placeholder={t("LeavePasswordEmpty")}
              />
              <Error errorName={errors.password} />
            </Label>

            <Label>
              <span>{t("ConfirmNewPassword")}</span>
              <Input
                {...register("confirmPassword", {
                  validate: (value) =>
                    watch("password") && value !== watch("password")
                      ? t("PasswordsDoNotMatch")
                      : true,
                })}
                className="mt-1"
                type="password"
                placeholder={t("ConfirmNewPassword")}
              />
              <Error errorName={errors.confirmPassword} />
            </Label>

            <Button type="submit" disabled={saving || loading} className="h-12 mt-2">
              {saving ? t("Saving") : t("SaveChanges")}
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default Profile;
