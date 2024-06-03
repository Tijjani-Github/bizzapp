"use client";

import * as React from "react";
import { getAgentbyid } from "@/actions/account";
import { Account } from "@/types";
import Image from "next/image";

interface ProfileProps {
  imgSrc: string;
  altText: string;
  role: string;
  gender: string;
  department: string;
  email: string;
  supervisor: string;
}

interface CustomerCaseProps {
  name: string;
  issue: string;
  department: string;
  status: string;
}

const Profile: React.FC<ProfileProps> = ({
  imgSrc,
  altText,
  role,
  gender,
  department,
  email,
  supervisor,
}) => (
  <section className="flex flex-col px-5 pt-16 pb-5 mt-1.5 w-full bg-white rounded-md shadow-sm max-md:mt-8">
    <div className="flex overflow-hidden relative flex-col justify-center items-center self-center p-2 max-w-full rounded aspect-square w-[120px] max-md:px-5">
      <img
        loading="lazy"
        src={imgSrc}
        alt={altText}
        className="object-cover absolute inset-0 size-full"
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad9adf8165aa5d09a4d10f99cebdc82308ccae029140b15758f6e3b892a44669?apiKey=af97e94b909e4cdbb531b36fb1b19598&"
        alt=""
        className="w-6 aspect-square"
      />
    </div>
    <h2 className="self-center mt-4 text-xl font-medium tracking-normal leading-8 text-center text-zinc-700 text-opacity-90">
      Ummi Mohammed
    </h2>
    <p className="justify-center self-center px-1 py-1 mt-4 text-sm tracking-normal leading-4 text-blue-900 whitespace-nowrap rounded">
      {role}
    </p>
    <h3 className="mt-6 text-xl font-medium tracking-normal leading-8 text-center text-zinc-700 text-opacity-90">
      Profile
    </h3>
    <hr className="shrink-0 mt-4 h-px border border-solid bg-zinc-700 bg-opacity-10 border-zinc-700 border-opacity-10" />
    <p className="mt-4 text-sm font-medium tracking-normal leading-5 text-center text-zinc-700 text-opacity-70">
      Gender:{" "}
      <span className="tracking-normal leading-5 text-zinc-700">{gender}</span>
    </p>
    <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center text-zinc-700 text-opacity-70">
      Department:{" "}
      <span className="tracking-normal leading-5 text-zinc-700">
        {department}
      </span>
    </p>
    <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center underline text-zinc-700 text-opacity-70">
      Email: <span className="underline text-zinc-700">{email}</span>
    </p>
    <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center underline text-zinc-700 text-opacity-70">
      Supervisor: <span className="underline text-zinc-700">{supervisor}</span>
    </p>
    <hr className="shrink-0 mt-6 h-px border border-solid bg-zinc-700 bg-opacity-10 border-zinc-700 border-opacity-10" />
    <button className="justify-center self-center px-7 py-2 mt-6 text-base font-medium tracking-wide leading-7 text-black capitalize whitespace-nowrap bg-amber-400 rounded-md border border-black border-solid shadow-sm max-md:px-5">
      in-Message
    </button>
  </section>
);

const CustomerCase: React.FC<CustomerCaseProps> = ({
  name,
  issue,
  department,
  status,
}) => (
  <div className="flex gap-5 justify-center items-start px-7 pt-6 pb-4 mt-4 w-full bg-white shadow-lg max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <p className="flex gap-5 justify-between pr-8 mt-2.5 text-base text-black max-md:flex-wrap">
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

const MyComponent: React.FC = () => (
  <main>
    <section className="flex gap-5 max-md:flex-col max-md:gap-0">
      <aside className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
        <Profile
          imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/0e7430e93a389f428bd72239b261b75b51017947e1475c0aa81daf78f5f13fe3?apiKey=af97e94b909e4cdbb531b36fb1b19598&"
          altText="Ummi Mohammed's profile picture"
          role="Agent"
          gender="Female"
          department="General Services"
          email="yusuf_adamu2024@xyz.com"
          supervisor="Aliyu Mustapha"
        />
      </aside>
      <section className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
        <header className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
          <div className="flex gap-5 justify-between items-start w-full font-medium max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col px-5 pt-2.5 mt-1.5 text-sm tracking-wide leading-6 text-center capitalize text-zinc-700 text-opacity-90">
              <h2>Agent data</h2>
              <hr className="shrink-0 mt-3.5 h-px border border-solid bg-zinc-700 bg-opacity-10 border-zinc-700 border-opacity-10" />
            </div>
            <div className="flex gap-2 justify-center px-5 py-2.5 text-base leading-6 text-gray-900 bg-amber-200 rounded-lg border border-yellow-400 border-solid shadow-sm">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/73915c73e3399f7952ea6f9563484b4b28f26ac80c3d7990a3df0d7a8c6567f0?apiKey=af97e94b909e4cdbb531b36fb1b19598&"
                alt="User icon"
                className="shrink-0 w-6 aspect-square"
              />
              <span>User Active</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c303c3da322dc8541cd9b4bee9afbdb7da90a4d9fb01136ac7224e657375de48?apiKey=af97e94b909e4cdbb531b36fb1b19598&"
                alt="Active icon"
                className="shrink-0 my-auto aspect-square w-[18px]"
              />
            </div>
          </div>
          <nav className="flex gap-5 self-start px-2.5 py-4 mt-8 text-base font-semibold tracking-normal leading-6 text-zinc-700 text-opacity-50 max-md:flex-wrap">
            <span>Closed cases</span>
            <span className="text-zinc-700">Active cases</span>
            <span>Collaborations</span>
            <span>Escalation</span>
          </nav>
          <hr className="shrink-0 mt-1 h-px border border-solid bg-zinc-700 bg-opacity-20 border-zinc-700 border-opacity-20 max-md:max-w-full" />
          <article className="flex z-10 flex-col px-6 leading-[150%] max-md:px-5 max-md:max-w-full">
            <hr className="shrink-0 ml-24 h-px border border-solid bg-zinc-700 border-zinc-700 w-[120px] max-md:ml-2.5" />
            <header className="flex gap-5 justify-between self-start mt-10 text-base font-semibold tracking-normal text-zinc-700 text-opacity-90 max-md:mt-10">
              <span>Customer name</span>
              <span>Issue</span>
              <span>Department</span>
            </header>
            <CustomerCase
              name="Tanimu Ali Salisu"
              issue="Wallet"
              department="Finance"
              status="Active"
            />
            <CustomerCase
              name="Tanimu Ali Salisu"
              issue="Wallet"
              department="Finance"
              status="Active"
            />
          </article>
        </header>
        <footer className="flex flex-col justify-center items-start px-16 py-6 mt-60 rounded-none bg-neutral-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <nav className="flex gap-5 justify-between ml-16 max-md:ml-2.5">
            <span className="my-auto text-xs font-semibold leading-4 text-neutral-600">
              Previous page
            </span>
            <div className="flex gap-2 px-0.5">
              <button className="flex flex-col justify-center text-xs font-semibold leading-4 text-white whitespace-nowrap">
                <span className="justify-center items-center w-5 h-5 bg-black rounded-full">
                  1
                </span>
              </button>
              <button className="flex flex-col justify-center text-xs font-semibold leading-4 whitespace-nowrap text-neutral-600">
                <span className="justify-center items-center px-2 w-5 h-5 rounded-full bg-neutral-200">
                  2
                </span>
              </button>
              <button className="flex flex-col justify-center text-xs font-semibold leading-4 whitespace-nowrap text-neutral-600">
                <span className="justify-center items-center px-2 w-5 h-5 rounded-full bg-neutral-200">
                  3
                </span>
              </button>
              <button className="flex flex-col justify-center text-xs font-semibold leading-4 whitespace-nowrap text-neutral-600">
                <span className="justify-center items-center px-2 w-5 h-5 rounded-full bg-neutral-200">
                  4
                </span>
              </button>
              <button className="flex flex-col justify-center text-xs font-semibold leading-4 whitespace-nowrap text-neutral-600">
                <span className="justify-center items-center px-2 w-5 h-5 rounded-full bg-neutral-200">
                  5
                </span>
              </button>
              <button className="flex flex-col justify-center">
                <span className="shrink-0 h-5 rounded-full bg-neutral-200" />
              </button>
            </div>
          </nav>
        </footer>
      </section>
    </section>
  </main>
);

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
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
              {agent?.department}
            </span>
          </p>
          <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center underline text-zinc-700 text-opacity-70">
            Email:{" "}
            <span className="underline text-zinc-700">{agent?.email}</span>
          </p>
          <p className="mt-2 text-sm font-medium tracking-normal leading-5 text-center underline text-zinc-700 text-opacity-70">
            Supervisor:{" "}
            <span className="underline text-zinc-700">{}</span>
          </p>
          <hr className="shrink-0 mt-6 h-px border border-solid bg-zinc-700 bg-opacity-10 border-zinc-700 border-opacity-10" />
          <button className="justify-center self-center px-7 py-2 mt-6 text-base font-medium tracking-wide leading-7 text-black capitalize whitespace-nowrap bg-amber-400 rounded-md border border-black border-solid shadow-sm max-md:px-5">
            in-Message
          </button>
        </div>
      </section>
    </>
  );
};

export { AgentProfile };
