"use client";

import * as React from "react";
import { People, ArrowRight } from "iconsax-react";
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
import { Account, Customer, Complain, Collaboration } from "@/types";
import { getallaccount, getAllColab } from "@/actions/account";
import { getAllCustomers, getAllcomplains } from "@/actions/customer";

interface InfoCardProps {
  total: number;
  tittle?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ total, tittle }) => {
  return (
    <section className="flex flex-col p-4 text-black bg-white rounded-lg border border-solid border-black w-[191px] h-[160px]">
      <header className="flex gap-5 justify-between items-start">
        <div className="flex flex-col justify-center mt-1.5">
          <h2 className="text-5xl font-semibold tracking-tighter leading-[58.56px]">
            {total}
          </h2>
          <p className="text-xs font-light">{tittle}</p>
        </div>
        <People size="32" className="shrink-0 w-6 aspect-square" />
      </header>
      <Link
        href="/"
        className="flex items-center gap-1.5 border-b-black justify-center py-0.5 pr-6 mt-4 text-xs font-medium tracking-normal uppercase border-b border-black border-solid"
        tabIndex={0}
      >
        <span>VIEW ALL</span>
        <ArrowRight className="shrink-0 self-start w-3 aspect-square" />
      </Link>
    </section>
  );
};

const SDashBoardPage = () => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [complains, setComplains] = React.useState<Complain[]>([]);
  const [collaborations, setCollaborations] = React.useState<Collaboration[]>(
    []
  );
  React.useEffect(() => {
    const fetchAccounts = async () => {
      const result = await getallaccount();
      const res = await getAllCustomers();
      const comp = await getAllcomplains();
      const collab = await getAllColab();
      setCollaborations(collab.collab);
      setComplains(comp.complains);
      setCustomers(res.customers);
      setAccounts(result.accounts);
    };

    fetchAccounts();
  }, [accounts]);

  const activeComplains = complains.filter(
    (complain: Complain) =>
      complain.status === "pending" && complain.session === "active"
  );

  const activeAgents = accounts.filter((account: Account) => account.isactive);

  const closedCase = complains.filter((complain: Complain) => complain.closed);

  return (
    <section className="flex flex-col w-full items-center justify-center h-full overflow-x-hidden overflow-y-auto p-4">
      <div className="flex items-center justify-between w-full mt-5">
        <InfoCard total={accounts.length} tittle="Total Agents" />
        <InfoCard total={customers.length} tittle="Total Customers" />
        <InfoCard
          total={activeComplains ? activeComplains.length : 0}
          tittle="Pending Customers"
        />
        <InfoCard
          total={closedCase ? closedCase.length : 0}
          tittle="Total Closed Cases"
        />
        <InfoCard
          total={collaborations ? collaborations.length : 0}
          tittle="Total Collaborations"
        />
        <InfoCard total={activeAgents.length} tittle="Active Agents" />

        {activeAgents ? (
          <div className="flex w-[320px] flex-col">
            Active Agent
            {activeAgents.map((activeAgent) => (
              <div
                key={activeAgent.id}
                className="p-4 m-2 border rounded shadow-lg"
              >
                <h2 className="text-xl font-semibold">
                  {activeAgent.fullName}
                </h2>
                <p className="text-gray-700">{activeAgent.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div>there are no active agents at the moment</div>
          </>
        )}
      </div>
    </section>
  );
};

export { SDashBoardPage };
