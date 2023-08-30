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
    path: "/press",
    icon: BsNewspaper,
    name: "Press",
  },
  {
    path: "/events",
    icon: BsCalendarEvent,
    name: "Events",
  },
];

export default sidebar;
