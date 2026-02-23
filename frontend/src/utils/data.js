import {
  LuClipboardCheck,
  LuLayoutDashboard,
  LuLogOut,
  LuSquarePlus,
  LuUsers,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    id: "02",
    label: "Manage Tasks",
    path: "/admin/tasks",
    icon: LuClipboardCheck,
  },
  {
    id: "03",
    label: "Create Task",
    path: "/admin/create-task",
    icon: LuSquarePlus,
  },
  {
    id: "04",
    label: "Team Members",
    path: "/admin/users",
    icon: LuUsers,
  },
  {
    id: "05",
    label: "Logout",
    path: "logout",
    icon: LuLogOut,
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "My Tasks",
    path: "/user/tasks",
    icon: LuClipboardCheck,
  },
  {
    id: "03",
    label: "Logout",
    path: "logout",
    icon: LuLogOut,
  },
];

export const PRIORITY_DATA = [
  {
    label: "Low",
    value: "low",
  },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export const STATUS_DATA = [
    {label: "pending", value: "pending"},
    {label: "In Progress", value: "in_progress"},
    {label: "completed", value: "completed"},
]