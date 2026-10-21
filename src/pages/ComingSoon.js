import React from 'react';
import progress from '../assets/img/progress.svg';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  const { t } = useTranslation();

  return (
    <div className="px-6 py-12 lg:py-16 min-h-[calc(100vh-96px)] flex items-center justify-center">
      <div className="w-full max-w-3xl text-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-8 lg:p-10">
        <img
          width={480}
          height={320}
          src={progress}
          alt="Coming soon"
          className="mx-auto mb-6 w-full max-w-lg"
        />
        <h2 className="font-bold font-serif text-2xl lg:text-4xl leading-7 mb-3 text-gray-800 dark:text-gray-100">
          {t("ComingSoonTitle")}
        </h2>
        <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mb-6">
          {t("Overview")}
        </p>
        <Link
          to="/overview"
          className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-xl bg-green-500 text-white px-6 py-3 hover:text-white hover:bg-green-600 h-12 text-sm lg:text-base"
        >
          {t("BackToHome")}
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
