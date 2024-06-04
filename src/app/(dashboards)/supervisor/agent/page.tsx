import React from "react";
import { AgentTable } from "../../admin/(components)/agenttable";
import { AgentPageNav } from "../../admin/(components)/agentnav";

const page = () => {
  return (
    <>
      <AgentPageNav />
      <AgentTable />
    </>
  );
};

export default page;
