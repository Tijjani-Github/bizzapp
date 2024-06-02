"use client";

import { useStateCtx } from "@/context/StateCtx";
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
    value: "agents",
  },
  {
    id: 2,
    label: "Supervisors",
    value: "supervisors",
  },
];
const AgentPageNav = () => {
  const {
    setAccountSearchTerm,
    selectedAccountFilter,
    accountSearchTerm,
    setSelectedAccountFilter,
  } = useStateCtx();
  return (
    <div className="w-full md:h-[56px] flex justify-between min-[450px]:gap-x-4 items-center flex-col md:flex-row gap-y-4 sm:pt-4 md:px-9 mt-5">
      <div className="flex w-full max-w-1/3 relative items-center">
        <Button
          type="button"
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

export { AgentPageNav };
