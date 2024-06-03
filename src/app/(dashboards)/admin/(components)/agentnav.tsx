"use client";

import { useStateCtx } from "@/context/StateCtx";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { Add, SearchNormal } from "iconsax-react";
import { ListFilter, X } from "lucide-react";
import { createnewagent, getAllDept } from "@/actions/account";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Department } from "@/types";

type SelectProps = {
  id?: number;
  label: string;
  value: string;
};

const selectedAccountFilters: SelectProps[] = [
  {
    id: 0,
    label: "All",
    value: "all",
  },
  {
    id: 1,
    label: "Agents",
    value: "agent",
  },
  {
    id: 2,
    label: "Supervisors",
    value: "supervisor",
  },
];

const AgentRole: SelectProps[] = [
  {
    id: 1,
    label: "Agents",
    value: "agent",
  },
  {
    id: 2,
    label: "Supervisors",
    value: "supervisor",
  },
];
const AgentPageNav = () => {
  const {
    setAccountSearchTerm,
    selectedAccountFilter,
    accountSearchTerm,
    setSelectedAccountFilter,
    setCreateNewAgent,
  } = useStateCtx();
  return (
    <div className="w-full md:h-[56px] flex justify-between min-[450px]:gap-x-4 items-center flex-col md:flex-row gap-y-4 sm:pt-4 md:px-9 mt-5">
      <div className="flex w-full max-w-1/3 relative items-center">
        <Button
          type="button"
          onClick={() => setCreateNewAgent(true)}
          className="flex w-full max-w-[170px] min-h-[56px] sm:w-[214px] lg:w-full lg:max-w-[250px] items-center lg:gap-x-5 gap-x-2 bg-yellow-100  text-white rounded-lg hover:opacity-80 transition-opacity duration-300 text-sm sm:text-base justify-center focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Add size={24} />
          Add New Agent
        </Button>
      </div>
      <div className="flex w-full sm:max-w-1/2 justify-between gap-x-2 ">
        <div className="flex w-full max-w-1/3 relative items-center">
          <div className="flex items-center w-full relative">
            <Input
              value={accountSearchTerm}
              tabIndex={0}
              type="text"
              placeholder="Search via account name..."
              onChange={(e) => setAccountSearchTerm(e.target.value)}
              className=" w-full h-[40px]  min-[900px]:h-[56px] outline-none focus-visible:border focus-visible:border-yellow-100 text-black border text-md font-medium rounded-md focus-visible:ring-yellow-100"
            />
            {accountSearchTerm.length === 0 && (
              <span className="absolute right-3 text-black">
                <SearchNormal size={18} />
              </span>
            )}
          </div>
          <button
            type="button"
            tabIndex={0}
            aria-label="Clear search"
            onClick={() => setAccountSearchTerm("")}
            className={cn(
              "absolute right-2 transition-opacity duration-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-100 rounded-full",
              {
                "opacity-0 duration-300": !accountSearchTerm,
              }
            )}
          >
            <X size={18} className="text-black" />
          </button>
        </div>
        <div className="flex items-center w-full">
          <ListFilter color="#282828" size={18} />
          <span className="hidden sm:inline-block w-[57px] text-sm text-black">
            Filter by
          </span>
          <Select
            value={selectedAccountFilter}
            onValueChange={(value) => setSelectedAccountFilter(value)}
          >
            <SelectTrigger className="w-[150px] select-none h-full py-3 text-black">
              <SelectValue
                placeholder={
                  selectedAccountFilters.find(
                    (filter) => filter.value === selectedAccountFilter
                  )?.label
                }
                className="text-center"
              />
            </SelectTrigger>
            <SelectContent className="backdrop-blur-xl bg-white/80">
              <SelectGroup>
                {selectedAccountFilters.map((filter) => (
                  <SelectItem
                    key={filter.id}
                    value={filter.value}
                    className="hover:bg-[#becbd7] text-black text-center"
                  >
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const NewUserProfileModal = () => {
  const { CreateNewAgent, setCreateNewAgent } = useStateCtx();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentid] = useState("");
  const [role, setRole] = useState("agent");
  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);

  React.useEffect(() => {
    const fetchDepartments = async () => {
      const res = await getAllDept();
      setDepartments(res.departments);
    };

    fetchDepartments();
  }, [CreateNewAgent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setisLoading(true);

    try {
      const values = { fullName, email, departmentId, role };

      const result = await createnewagent(values);

      if (result.status === 201) {
        toast({
          title: "Account created successfully",
          description: result.message,
        });
        setFullName("");
        setEmail("");
        setDepartmentid("");
        setRole("agent");
      } else {
        toast({
          title: "Account creation failed",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed min-h-screen w-full bg-black/50  min-[900px]:bg-black/10 dark:min-[900px]:bg-black/5 top-0 left-0 z-[99] transition-all duration-300 overflow-hidden",
          CreateNewAgent ? "opacity-100" : "opacity-0 pointer-events-none "
        )}
        onClick={() => setCreateNewAgent(false)}
      />
      <div
        role="dialog"
        aria-labelledby="create-client"
        aria-modal
        className={cn(
          "py-6   flex flex-col md:w-[50%] w-[95%]   h-[600px] max-h-[1458px]  justify-between items-start bg-white  backdrop-blur-lg  fixed top-1/2 left-1/2  -translate-y-1/2 z-[99]  transition-all opacity-0 select-none ",
          CreateNewAgent
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "-translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="text-lg md:text-2xl font-medium  text-black">
            Add New Agent
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setCreateNewAgent(false)}
            className="text-[#e80000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <section className="w-full h-full overflow-y-auto hide-scroll pt-4">
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex w-full flex-col max-sm:gap-y-6 gap-y-4 lg:gap-y-6 py-4 xl:py-8 px-2 sm:px-4 md:px-6 lg:px-8 h-full items-start"
          >
            <div className="flex flex-col  gap-y-2 w-full">
              <Label
                htmlFor="agent-name"
                className="text-sm sm:text-base font-medium text-black"
              >
                Agent Name
              </Label>
              <Input
                type="text"
                placeholder="agent name..."
                id="agent-name"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-primary-light"
              />
            </div>
            <Select
              value={departmentId}
              onValueChange={(value) => setDepartmentid(value)}
            >
              <SelectTrigger className="w-full select-none py-3 text-black">
                <SelectValue
                  placeholder={
                    departments.find(
                      (dept) => dept.id.toString() === departmentId
                    )?.name || "Select a department"
                  }
                  className="text-center"
                />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-xl bg-white/80 z-[150]">
                <SelectGroup>
                  {departments.map((dept) => (
                    <SelectItem
                      key={dept.id}
                      value={dept.id.toString()}
                      className="hover:bg-[#becbd7] text-black text-center"
                    >
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex flex-col  gap-y-2 w-full">
              <Label
                htmlFor="agent-name"
                className="text-sm sm:text-base font-medium text-black"
              >
                Email
              </Label>
              <Input
                type="email"
                placeholder="agent email..."
                id="agent-name"
                name="fullName"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-primary-light"
              />
            </div>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-full select-none py-3 text-black">
                <SelectValue
                  placeholder={
                    AgentRole.find((filter) => filter.value === role)?.label
                  }
                  className="text-center"
                />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-xl bg-white/80 z-[150]">
                <SelectGroup>
                  {AgentRole.map((filter) => (
                    <SelectItem
                      key={filter.id}
                      value={filter.value}
                      className="hover:bg-[#becbd7] text-black text-center"
                    >
                      {filter.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className={cn(
                "rounded-full w-full h-[56px] font-medium font-worksans flex space-x-2 text-[16px] bg-background dark:bg-dark-background dark:text-dark-copy hover:bg-inherit",
                isLoading && "relative"
              )}
            >
              {isLoading ? (
                <>
                  {/* <div className="loader">
                    <span className="loader-text">Please wait ...</span>
                    <span className="load" />
                  </div> */}
                  <svg
                    viewBox="0 0 240 240"
                    height="240"
                    width="240"
                    className="pl relative"
                  >
                    <circle
                      strokeLinecap="round"
                      strokeDashoffset="-330"
                      strokeDasharray="0 660"
                      strokeWidth="20"
                      stroke="#000"
                      fill="none"
                      r="105"
                      cy="120"
                      cx="120"
                      className="pl__ring pl__ring--a"
                    ></circle>
                    <circle
                      strokeLinecap="round"
                      strokeDashoffset="-110"
                      strokeDasharray="0 220"
                      strokeWidth="20"
                      stroke="#000"
                      fill="none"
                      r="35"
                      cy="120"
                      cx="120"
                      className="pl__ring pl__ring--b"
                    ></circle>
                    <circle
                      strokeLinecap="round"
                      strokeDasharray="0 440"
                      strokeWidth="20"
                      stroke="#000"
                      fill="none"
                      r="70"
                      cy="120"
                      cx="85"
                      className="pl__ring pl__ring--c"
                    ></circle>
                    <circle
                      strokeLinecap="round"
                      strokeDasharray="0 440"
                      strokeWidth="20"
                      stroke="#000"
                      fill="none"
                      r="70"
                      cy="120"
                      cx="155"
                      className="pl__ring pl__ring--d"
                    ></circle>
                  </svg>
                </>
              ) : (
                "Save Details"
              )}
            </Button>
          </form>
        </section>
      </div>
    </>
  );
};
export { AgentPageNav, NewUserProfileModal };
