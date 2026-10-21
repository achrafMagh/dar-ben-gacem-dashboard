import { WindmillContext } from "@windmill/react-ui";
import { useContext, useEffect } from "react";

const ThemeSync = () => {
  const { mode } = useContext(WindmillContext);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.add("theme-dark");
      document.documentElement.classList.remove("theme-light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("theme-dark");
      document.documentElement.classList.add("theme-light");
    }
  }, [mode]);

  return null;
};

export default ThemeSync;
