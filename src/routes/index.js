import PressDetails from "pages/PressDetails";
import { lazy } from "react";

// use lazy for better code splitting

const Press = lazy(() => import("../pages/Press"));
const Overview = lazy(() => import("../pages/Overview"));
const Profile = lazy(() => import("../pages/Profile"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));

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
    path: "/overview",
    component: Overview,
  },
  {
    path: "/press",
    component: Press,
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
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/products",
    component: ComingSoon,
  },
  {
    path: "/orders",
    component: ComingSoon,
  },
  {
    path: "/services",
    component: ComingSoon,
  },
];

export default routes;
