"use client";

import * as React from "react";
import { getallaccount } from "@/actions/account";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useStateCtx } from "@/context/StateCtx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Account } from "@/types";
import { cn } from "@/utils";

const AgentTable = () => {
  const {
    setAccountSearchTerm,
    selectedAccountFilter,
    accountSearchTerm,
    setSelectedAccountFilter,
  } = useStateCtx();
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = React.useState<Account[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedaccount, setSelectedAccount] = React.useState("");
  const [selected, setSelected] = React.useState("");
  console.log(accountSearchTerm);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      const result = await getallaccount();
      if (result.status === 200) {
        setAccounts(result.accounts);
      } else {
        setError(result.message);
      }
    };

    fetchAccounts();
  }, []);

  React.useEffect(() => {
    const filtered = accounts.filter((account) => {
      const matchesSearchTerm = account.fullName
        .toLowerCase()
        .includes(accountSearchTerm.toLowerCase());
      const matchesFilter =
        selectedAccountFilter === "all" ||
        account.role.toLowerCase() === selectedAccountFilter.toLowerCase();
      return matchesSearchTerm && matchesFilter;
    });

    setFilteredAccounts(filtered);
  }, [accountSearchTerm, selectedAccountFilter, accounts]);

  return (
    <div className="w-full flex items-center justify-center md:px-9 mt-9">
      <Table>
        <TableCaption>A list of all agents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                onChange={() => {
                  setSelected("all");
                }}
                value={selected}
              />
            </TableHead>
            <TableHead className="w-[190px]">Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Privileges</TableHead>
            <TableHead className="w-[75px]">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell className="w-[50px]">
                <Checkbox
                  onChange={() => {
                    setSelectedAccount(account.id);
                  }}
                  value={selectedaccount}
                />
              </TableCell>
              <TableCell className={cn("w-[190px]")}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: account.fullName.replace(
                      new RegExp(`(${accountSearchTerm})`, "gi"),
                      (match, group) =>
                        `<span style="color: black; background-color: ${
                          group.toLowerCase() ===
                          accountSearchTerm.toLowerCase()
                            ? "yellow"
                            : "inherit"
                        }">${match}</span>`
                    ),
                  }}
                />
                {/* {account.fullName} */}
              </TableCell>
              <TableCell>{account.department}</TableCell>
              <TableCell>{account.role}</TableCell>
              <TableCell className="w-[75px]">
                <div className="bg-green-200 w-[68px] text-center h-[30px] flex items-center justify-center  rounded-md">
                  <span className="">Online</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button asChild className="font-medium bg-blue-300">
                  <Link href={`/agent/details?agentid=${account.id}`}>
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export { AgentTable };
