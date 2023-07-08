import PressDetails from "pages/PressDetails";
import { lazy } from "react";

// use lazy for better code splitting

const Category = lazy(() => import("../pages/Category"));

// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import("../pages/404"));

const Setting = lazy(() => import("../pages/Setting"));
const Event = lazy(() => import("../pages/Event"));
const EventDetails = lazy(() => import("../pages/EventDetails"));
/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: "/press",
    component: Category,
  },
  {
    path: "/press/:id",
    component: PressDetails,
  },
  {
    path: "/events",
    component: Event,
  },
  {
    path: "/events/:id",
    component: EventDetails,
  },
  { path: "/settings", component: Setting },
  {
    path: "/404",
    component: Page404,
  },
];

export default routes;
