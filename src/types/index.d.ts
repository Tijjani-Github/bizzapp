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

type UserRole = "admin" | "supervisor" | "agent";

interface Account {
  id: string;
  fullName: string;
  gender: string;
  username: string;
  location: string;
  phone: string;
  email: string;
  role: UserRole;
  department: string;
  image?: string;
  isactive?: boolean;
}

interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

interface Template {
  id: number;
  question: string;
  answer: string;
}

export { SidebarProps, SidebarFooterProps, Account, Customer, Template };
