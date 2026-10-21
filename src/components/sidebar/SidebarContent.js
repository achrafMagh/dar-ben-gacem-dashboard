import React, { useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import { WindmillContext } from "@windmill/react-ui";
import logoDark from "assets/img/logo/logo.svg";
import logoLight from "assets/img/logo/logo.svg";

import sidebar from "routes/sidebar";
import SidebarSubMenu from "./SidebarSubMenu";
// import SidebarSubMenu from "SidebarSubMenu";
import { useTranslation } from "react-i18next";
const SidebarContent = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);

  return (
    <div className="py-5 text-gray-500 dark:text-gray-400">
      <a className="text-gray-900 dark:text-gray-200 block px-4" href="/overview">
        {mode === "dark" ? (
          <img
            src={logoLight}
            alt="dar ben gacem"
            width="168"
            className="mx-auto"
          />
        ) : (
          <img
            src={logoDark}
            alt="dar ben gacem"
            width="188"
            className="mx-auto"
          />
        )}
      </a>
      <ul className="mt-8 px-3 space-y-1.5">
        {sidebar.map((route) =>
          route.routes ? (
            <SidebarSubMenu route={route} key={route.name} />
          ) : (
            <li className="relative" key={route.name}>
              {route?.outside ? (
                <a
                  href={process.env.REACT_APP_STORE_DOMAIN}
                  target="_blank"
                  className="px-4 py-3 rounded-xl inline-flex items-center cursor-pointer w-full text-sm font-semibold transition-all duration-150 hover:text-green-700 hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  rel="noreferrer"
                >
                  <Route path={route.path} exact={route.exact}>
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  <route.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="ml-4">{t(`${route.name}`)}</span>
                  {/* <span className="ml-4">{route.name}</span> */}
                </a>
              ) : (
                <NavLink
                  exact
                  to={route.path}
                  target={`${route?.outside ? "_blank" : "_self"}`}
                  className="px-4 py-3 rounded-xl inline-flex items-center w-full text-sm font-semibold transition-all duration-150 hover:text-green-700 hover:bg-green-50 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  activeClassName="text-green-600 bg-green-50 dark:text-gray-100 dark:bg-gray-800"
                >
                  <Route path={route.path} exact={route.exact}>
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-green-500 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  <route.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="ml-4">{t(`${route.name}`)}</span>
                </NavLink>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SidebarContent;
