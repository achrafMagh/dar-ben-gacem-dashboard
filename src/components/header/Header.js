import { WindmillContext } from "@windmill/react-ui";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoLogOutOutline, IoMenu, IoMoonSharp, IoSunny } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import en from "assets/img/us.svg";
import fr from "assets/img/fr.svg";
import logoAvatar from "assets/img/logo/logo.svg";
import { AdminContext } from "context/AdminContext";
import { SidebarContext } from "context/SidebarContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const history = useHistory();
  const { toggleSidebar, handleLanguageChange, lang } = useContext(SidebarContext);
  const { state, dispatch } = useContext(AdminContext);
  const { adminInfo } = state;
  const { toggleMode } = useContext(WindmillContext);
  const { t } = useTranslation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const pRef = useRef(null);

  const userEmail = adminInfo?.email || "admin@darbengacem.com";
  const userInitial = (adminInfo?.name || userEmail).trim().charAt(0).toUpperCase() || "A";

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("adminInfo");
    localStorage.removeItem("token");
    setProfileOpen(false);
    history.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pRef.current && !pRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const syncThemeIcon = () => {
      const hasDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.classList.contains("theme-dark");
      setIsDarkTheme(hasDarkClass);
    };

    syncThemeIcon();

    const observer = new MutationObserver(syncThemeIcon);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="z-30 py-3 bg-white/90 shadow-sm backdrop-blur-md dark:bg-gray-800/90 dark:border-b dark:border-gray-700">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        <button
          className="p-2 mr-4 -ml-1 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <IoMenu className="w-6 h-6" aria-hidden="true" />
        </button>
        <span />

        <ul className="flex items-center flex-shrink-0 space-x-3">
          <li className="flex items-center rounded-xl border border-gray-200/80 dark:border-gray-700 px-1.5 py-1 bg-white dark:bg-gray-900 shadow-sm">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`inline-flex items-center text-xs px-2.5 py-1.5 rounded-lg font-semibold ${
                lang === "en"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label="Switch language to English"
            >
              <img src={en} width={14} alt="English" className="mr-1" />
              EN
            </button>
            <button
              onClick={() => handleLanguageChange("fr")}
              className={`inline-flex items-center text-xs px-2.5 py-1.5 rounded-lg font-semibold ${
                lang === "fr"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-label="Switch language to French"
            >
              <img src={fr} width={14} alt="French" className="mr-1" />
              FR
            </button>
          </li>

          <li className="flex">
            <button
              className="rounded-xl p-2 text-gray-700 border border-gray-200/80 dark:border-gray-700 dark:text-gray-200 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {isDarkTheme ? (
                <IoMoonSharp className="w-6 h-6" aria-hidden="true" />
              ) : (
                <IoSunny className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </li>

          <li className="relative" ref={pRef}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="rounded-full focus:outline-none ring-2 ring-transparent hover:ring-green-500 transition-all"
              aria-label="Profile"
            >
              <span className="relative w-10 h-10 rounded-full overflow-hidden border border-green-200 dark:border-green-700 bg-gradient-to-br from-green-500 to-emerald-600 inline-flex items-center justify-center shadow-md">
                <img
                  src={logoAvatar}
                  alt="Dar Ben Gacem"
                  className="w-7 h-7 object-contain opacity-15"
                />
                <span className="absolute text-sm font-semibold text-white">
                  {userInitial}
                </span>
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-2xl p-3">
                <div className="pb-3 mb-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t("ProfileEmail")}</p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-100 break-all">
                    {userEmail}
                  </p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {t("updateProfile")}
                </Link>

                <button
                  onClick={handleLogOut}
                  className="w-full mt-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 inline-flex items-center"
                >
                  <IoLogOutOutline className="mr-2" />
                  {t("LogOut")}
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
