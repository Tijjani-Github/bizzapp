"use client";

import * as React from "react";
import { getAgentbyid } from "@/actions/account";
import { Account, Collaboration } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

interface CustomerCaseProps {
  name?: string;
  issue?: string;
  department?: string;
  status?: string;
}

const CustomerCase: React.FC<CustomerCaseProps> = ({
  name,
  issue,
  department,
  status,
}) => (
  <div className="flex gap-5 items-start px-7 pt-6 pb-4 mt-4 w-full bg-white shadow-lg">
    <p className="flex gap-5  pr-8 mt-2.5 text-base text-black">
      <span>{name}</span>
      <span>{issue}</span>
      <span>{department}</span>
      <span className="justify-center px-1 py-1 text-sm leading-4 text-white whitespace-nowrap bg-lime-600 rounded">
        {status}
      </span>
    </p>
    <button className="justify-center p-2.5 text-sm font-black text-center whitespace-nowrap bg-amber-400 rounded-lg text-zinc-700 text-opacity-90">
      View
    </button>
  </div>
);

const AgentProfile = ({ agentid }: { agentid?: string }) => {
  const [agent, setAgent] = React.useState<Account | null>(null);

  React.useEffect(() => {
    const fetchAgentDetails = async () => {
      const response = await getAgentbyid(agentid);
      if (response.status === 200) {
        setAgent(response.agent);
      } else {
        return "";
      }
    };

    fetchAgentDetails();
  }, [agentid]);

  const [activetab, setActiveTab] = React.useState(1);

  console.log(agent);
  return (
    <>
      <section className="flex px-5 pt-16 pb-5 mt-1.5 w-full bg-white rounded-md max-md:mt-8">
        <div className="flex h-full overflow-hidden relative flex-col justify-center items-center w-full self-center p-2 rounded shadow-lg max-w-[340px] max-md:px-5">
          <Image
            src={
              agent?.image
                ? agent.image
                : `https://ui-avatars.com/api/?name=${agent?.email}&background=random`
            }
            alt="agent"
            width={120}
            height={120}
            className="object-cover inset-0 size-full max-w-[140px]"
          />
          <h2 className="self-center mt-4 text-xl font-medium tracking-normal leading-8 text-center text-zinc-700 text-opacity-90">
            {agent?.fullName}
          </h2>
          <p className="justify-center self-center px-1 py-1 mt-4 text-sm tracking-normal leading-4 text-blue-900 whitespace-nowrap rounded">
            {agent?.role}
          </p>
          <h3 className="mt-6 text-xl font-medium tracking-normal leading-8 text-center text-zinc-700 text-opacity-90">
            Profile
          </h3>
          <hr className="shrink-0 mt-4 h-px border border-solid bg-zinc-700 bg-opacity-10 border-zinc-700 border-opacity-10" />
          <p className="mt-4 text-sm font-medium tracking-normal leading-5 text-center text-zinc-700 text-opacity-70">
            Gender:{" "}
            <span className="tracking-normal leading-5 text-zinc-700">
              {agent?.gender}
            </span>
          </p>
          <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center text-zinc-700 text-opacity-70">
            Department:{" "}
            <span className="tracking-normal leading-5 text-zinc-700">
              {agent?.department?.name}
            </span>
          </p>
          <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center underline text-zinc-700 text-opacity-70">
            Email:{" "}
            <span className="underline text-zinc-700">{agent?.email}</span>
          </p>
          <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center underline text-zinc-700 text-opacity-70">
            Supervisor: <span className="underline text-zinc-700">{}</span>
          </p>
          <hr className="shrink-0 mt-6 h-px border border-solid bg-zinc-700 bg-opacity-10 border-zinc-700 border-opacity-10" />
          <button className="justify-center self-center px-7 py-2 mt-6 text-base font-medium tracking-wide leading-7 text-black capitalize whitespace-nowrap bg-amber-400 rounded-md border border-black border-solid shadow-sm max-md:px-5">
            in-Message
          </button>
        </div>
        <section className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
          <header className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
            <div className="flex gap-5 justify-between items-start w-full font-medium max-md:flex-wrap max-md:max-w-full">
              <div className="flex flex-col px-5 pt-2.5 mt-1.5 text-sm tracking-wide leading-6 text-center capitalize text-zinc-700 text-opacity-90">
                <h2>Agent data</h2>
                <hr className="shrink-0 mt-3.5 h-px border border-solid bg-zinc-700 bg-opacity-10 border-zinc-700 border-opacity-10" />
              </div>
              <div className="flex gap-2 justify-center px-5 py-2.5 text-base leading-6 text-gray-900 bg-amber-200 rounded-lg border border-yellow-400 border-solid shadow-sm">
                <div className="h-4 w-4 bg-green-500 rounded-full" />
                <span>User Active</span>
              </div>
            </div>
            <nav className="flex gap-5 self-start px-2.5 py-4 mt-8 text-base font-semibold tracking-normal leading-6 text-zinc-700 text-opacity-50 max-md:flex-wrap cursor-pointer">
              <Button
                onClick={() => setActiveTab(1)}
                className={cn(activetab === 1 && "text-zinc-700 ", "bg-white")}
              >
                Closed Cases
              </Button>
              <Button
                className={cn(activetab === 2 && "text-zinc-700", "bg-white")}
                onClick={() => setActiveTab(2)}
              >
                Active cases
              </Button>
              <Button
                onClick={() => setActiveTab(3)}
                className={cn(activetab === 3 && "text-zinc-700", "bg-white")}
              >
                Collaborations
              </Button>
              <Button
                onClick={() => setActiveTab(4)}
                className={cn(activetab === 4 && "text-zinc-700", "bg-white")}
              >
                Escalation
              </Button>
            </nav>

            <article className="flex z-10 flex-col px-6 leading-[150%] max-md:px-5 max-md:max-w-full">
              <header className="flex gap-5 justify-between self-start mt-10 text-base font-semibold tracking-normal text-zinc-700 text-opacity-90 max-md:mt-10">
                <span>Customer name</span>
                <span>Issue</span>
                <span>Department</span>
              </header>
              {activetab === 1 && (
                <>
                  {agent?.complain.map((comp) => (
                    <CustomerCase
                      key={comp.id}
                      name={comp.complaint.fullName}
                      issue={comp.complain}
                      department={agent.department?.name}
                      status={comp.status}
                    />
                  ))}
                  {agent?.complain.length === 0 && (
                    <p className="mt-10 text-center text-sm font-medium tracking-normal leading-5 text-zinc-700 text-opacity-70">
                      No closed cases
                    </p>
                  )}
                </>
              )}
              {activetab === 2 && (
                <>
                  {agent?.complain.map((comp) => (
                    <CustomerCase
                      key={comp.id}
                      name={comp.complaint.fullName}
                      issue={comp.complain}
                      department={agent.department?.name}
                      status={comp.status}
                    />
                  ))}
                  {agent?.complain.length === 0 && (
                    <p className="mt-10 text-center text-sm font-medium tracking-normal leading-5 text-zinc-700 text-opacity-70">
                      No Active Cases
                    </p>
                  )}
                </>
              )}
              {activetab === 3 && (
                <>
                  {agent?.collaboratingCollaborations.map((comp) => (
                    <CustomerCase
                      key={comp.id}
                      name={comp.colaborator.fullName}
                      issue={comp.complain.complain}
                      department={agent.department?.name}
                      status={comp.owner.isactive ? "active" : ""}
                    />
                  ))}
                  {agent?.complain.length === 0 && (
                    <p className="mt-10 text-center text-sm font-medium tracking-normal leading-5 text-zinc-700 text-opacity-70">
                      No Collaboration yet
                    </p>
                  )}
                </>
              )}
              {activetab === 4 && (
                <>
                  {agent?.collaboratingCollaborations.map((comp) => (
                    <CustomerCase
                      key={comp.id}
                      name={comp.colaborator.fullName}
                      issue={comp.complain.complain}
                      department={agent.department?.name}
                      status={comp.owner.isactive ? "active" : ""}
                    />
                  ))}
                  {agent?.complain.length === 0 && (
                    <p className="mt-10 text-center text-sm font-medium tracking-normal leading-5 text-zinc-700 text-opacity-70">
                      No escalated cases yet
                    </p>
                  )}
                </>
              )}
            </article>
          </header>
        </section>
      </section>
    </>
  );
};

export { AgentProfile };
