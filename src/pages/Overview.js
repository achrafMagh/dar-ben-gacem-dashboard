import React from "react";
import { Card, CardBody } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import PageTitle from "components/Typography/PageTitle";
import useAsync from "hooks/useAsync";
import EventServices from "services/EventServices";
import PressServices from "services/PressServices";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";

const getPublishedCount = (items = []) =>
  items.filter((item) => item?.published === true).length;

const Overview = () => {
  const { t } = useTranslation();
  const { data: pressResponse } = useAsync(PressServices.getAllPress);
  const { data: eventResponse } = useAsync(EventServices.getAllEvents);

  const presses = pressResponse?.data || [];
  const events = eventResponse?.data || [];

  const cards = [
    { label: t("TotalPress"), value: presses.length, path: "/press" },
    { label: t("PublishedPress"), value: getPublishedCount(presses), path: "/press" },
    { label: t("TotalEvents"), value: events.length, path: "/events" },
    { label: t("PublishedEvents"), value: getPublishedCount(events), path: "/events" },
  ];

  return (
    <>
      <PageTitle>{t("Overview")}</PageTitle>
      <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card
            key={card.label}
            className="border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardBody className="p-5">
              <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <p className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                {card.value}
              </p>
              <Link
                to={card.path}
                className="inline-flex items-center mt-4 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                {t("Open")}
                <FiArrowRight className="ml-1" />
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Overview;
