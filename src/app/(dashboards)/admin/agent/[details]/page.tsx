import React from "react";
import { AgentProfile } from "../../(components)/dashboard";

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
