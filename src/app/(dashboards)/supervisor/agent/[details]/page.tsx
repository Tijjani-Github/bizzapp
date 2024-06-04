import { AgentProfile } from "@/app/(dashboards)/admin/(components)/dashboard";
import React from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
const page = ({ searchParams: { agentid } }: PageProps) => {
  console.log(agentid);
  return (
    <>
      <AgentProfile agentid={agentid} />
    </>
  );
};

export default page;
