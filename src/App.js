import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from "./utils/toast";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import PrivateRoute from "./components/login/PrivateRoute";

const Layout = lazy(() => import("./layout/Layout"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router basename={process.env.PUBLIC_URL}>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/">
            <Layout />
          </PrivateRoute>
        </Switch>
      </Router>
    </>
  );
};

export default App;
