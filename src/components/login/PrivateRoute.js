import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children, ...rest }) => {
  const token = localStorage.getItem("token");
  let cookieToken = null;

  const adminInfo = Cookies.get("adminInfo");
  if (adminInfo) {
    try {
      cookieToken = JSON.parse(adminInfo)?.token;
    } catch (error) {
      cookieToken = null;
    }
  }

  const isAuthenticated = Boolean(token || cookieToken);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
