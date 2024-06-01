type SidebarProps = {
  id?: number;
  label: string;
  icon: Icon;
  link: string;
};

type SidebarFooterProps = {
  id?: number;
  label: string;
  icon: Icon;
  link: "open-sidebar" | "/admin/settings" | "logout";
};

export { SidebarProps, SidebarFooterProps };
