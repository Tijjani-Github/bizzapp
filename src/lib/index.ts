import { SidebarFooterProps, SidebarProps } from "@/types";

import {
  type Icon,
  Category,
  Briefcase,
  WalletMoney,
  MessageText,
  Personalcard,
  Notification,
  Profile2User,
  ArchiveBook,
  TrendUp,
  Box,
  DiscountShape,
  InfoCircle,
  ArrowCircleRight2,
  Setting2,
  Logout,
  BoxTick,
  I3DRotate,
  ShoppingCart,
  Coin1,
  Messages3,
} from "iconsax-react";
import {
  BAAgents,
  BACustomers,
  BACases,
  BATemplates,
  BAPending,
  BAResolved,
  
} from "./icon";

const ADMIN_SIDEBAR_LINKS: SidebarProps[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: Category,
    link: "/admin/dashboard",
  },

  {
    id: 2,
    label: "Agent",
    icon: BAAgents,
    link: "/admin/agent",
  },
  {
    id: 3,
    label: "Customers",
    icon: BACustomers,
    link: "/admin/customers",
  },
  {
    id: 4,
    label: "Cases",
    icon: BACases,
    link: "/admin/cases",
  },
  {
    id: 5,
    label: "Messages",
    icon: Messages3,
    link: "/admin/messages",
  },
  {
    id: 7,
    label: "Templates",
    icon: BATemplates,
    link: "/admin/templates",
  },
];

const SUPERVISORS_SIDEBAR_LINKS: SidebarProps[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: Category,
    link: "/supervisor/dashboard",
  },

  {
    id: 2,
    label: "Agent",
    icon: BAAgents,
    link: "/supervisor/agent",
  },
  {
    id: 3,
    label: "Customers",
    icon: BACustomers,
    link: "/supervisor/customers",
  },
  {
    id: 4,
    label: "Cases",
    icon: BACases,
    link: "/supervisor/cases",
  },
  {
    id: 5,
    label: "Messages",
    icon: Messages3,
    link: "/supervisor/messages",
  },
  {
    id: 7,
    label: "Templates",
    icon: BATemplates,
    link: "/supervisor/templates",
  },
];

const SIDEBAR_LINKS: SidebarProps[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: Category,
    link: "/agent/dashboard",
  },

  {
    id: 2,
    label: "Pending",
    icon: BAPending,
    link: "/agent/pending",
  },
  {
    id: 3,
    label: "Customers",
    icon: BACustomers,
    link: "/agent/customers",
  },
  {
    id: 4,
    label: "resolved",
    icon: BAResolved,
    link: "/agent/resolved",
  },
  {
    id: 5,
    label: "Templates",
    icon: BATemplates,
    link: "/agent/templates",
  },
  {
    id: 6,
    label: "Messages",
    icon: Messages3,
    link: "/agent/messages",
  },
];

const SIDEBAR_FOO_LINKS: SidebarFooterProps[] = [
  {
    id: 1,
    label: "Open sidebar",
    icon: ArrowCircleRight2,
    link: "open-sidebar",
  },
  {
    id: 2,
    label: "Settings",
    icon: Setting2,
    link: "/admin/settings",
  },

  {
    id: 3,
    label: "Logout",
    icon: Logout,
    link: "logout",
  },
];

const TYPESidebarLinks = ADMIN_SIDEBAR_LINKS.map((link) => link.link);

export {
  SIDEBAR_FOO_LINKS,
  TYPESidebarLinks,
  ADMIN_SIDEBAR_LINKS,
  SUPERVISORS_SIDEBAR_LINKS,
  SIDEBAR_LINKS,
};
