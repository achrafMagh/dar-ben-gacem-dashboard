import { FiGrid, FiPackage, FiShoppingCart, FiTool } from "react-icons/fi";

import { BsNewspaper, BsCalendarEvent } from "react-icons/bs";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/overview",
    icon: FiGrid,
    name: "Overview",
  },
  {
    path: "/press",
    icon: BsNewspaper,
    name: "Press",
  },
  {
    path: "/events",
    icon: BsCalendarEvent,
    name: "Events",
  },
  {
    path: "/products",
    icon: FiPackage,
    name: "Products",
  },
  {
    path: "/orders",
    icon: FiShoppingCart,
    name: "Orders",
  },
  {
    path: "/services",
    icon: FiTool,
    name: "Services",
  },
];

export default sidebar;
