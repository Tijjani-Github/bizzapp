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

interface Department {
  id: number;
  name: string;
  accounts: Account[];
  supervisor?: Account;
  accountId?: string;
}

interface Account {
  id: string;
  fullName: string;
  gender?: string;
  username?: string;
  location?: string;
  phone?: string;
  email: string;
  role: string;
  departmentId?: number;
  department?: Department;
  supervisedDepartments: Department[];
  image?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  complain: Complain[];
  message: Message[];
  sentMessages: Inmessage[];
  receivedMessages: Inmessage[];
  ownedCollaborations: Collaboration[];
  collaboratingCollaborations: Collaboration[];
  inmessage: Inmessage[];
  isactive?: boolean;
}

interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  complain: Complain[];
  message: Message[];
}

interface Complain {
  id: number;
  complain: string;
  complaint: Customer;
  customerId: string;
  attendee?: Account;
  accountId?: string;
  feedback: Feedback[];
  closed: boolean;
  session: string;
  createdAt: Date;
  updatedAt: Date;
  status: "pending" | "active" | "attending" | "closed";
  colaborations: Collaboration[];
  escalated?: boolean;
}

interface Feedback {
  id: number;
  complain: Complain;
  complainId: number;
  feedback: string;
  rating: number;
}

interface Message {
  id: number;
  sender?: Customer;
  customerId?: string;
  attendee: Account;
  accountId: string;
}

interface Inmessage {
  id: number;
  from: Account;
  fromId: string;
  to?: Account;
  toId?: string;
  account?: Account;
  accountId?: string;
  message: string;
}

interface Collaboration {
  id: number;
  owner: Account;
  accountId: string;
  colaborator: Account;
  colaboratorId: string;
  complain: Complain;
  complainId: number;
}

interface Template {
  id: number;
  question: string;
  answer: string;
}

export {
  SidebarProps,
  SidebarFooterProps,
  Account,
  Customer,
  Template,
  Complain,
  Collaboration,
  Department,
};
