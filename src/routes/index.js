import PressDetails from "pages/PressDetails";
import { lazy } from "react";

// use lazy for better code splitting

const Category = lazy(() => import("../pages/Category"));

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
];

export default routes;
