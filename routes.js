import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Announcement from "@material-ui/icons/Announcement";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import AccessibilityNew from '@material-ui/icons/AccessibilityNew'
import LiveHelp from '@material-ui/icons/LiveHelp'
import Storage from '@material-ui/icons/Storage'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,

    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: AccessibilityNew,

    layout: "/admin",
  },
  {
    path: "/alerts",
    name: "Incidents",
    icon: Announcement,

    layout: "/admin",
  },
  {
    path: "/service-providers",
    name: "Service Providers",
    icon: AccessibilityNew,

    layout: "/admin",
  },
  {
    path: "/resource-center",
    name: "Resource Center",
    icon: Storage,

    layout: "/admin",
  },
  {
    path: "/faqs",
    name: "FAQs",
    icon: LiveHelp,

    layout: "/admin",
  },

];

export default dashboardRoutes;
