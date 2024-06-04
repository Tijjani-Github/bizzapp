import React from "react";
import { CustomerTable } from "../../admin/customers/customtable";
import { AgentCase } from "@/app/(components)/agentcasePage";
import { Closed } from "../resolved/resolved";

const page = () => {
  return (
    <>
      <div className="flex w-full">
        <div className="w-1/2">
          <AgentCase />
        </div>
        <div className="w-1/2">
          <Closed />
        </div>
      </div>
      <CustomerTable />
    </>
  );
};

export default page;
