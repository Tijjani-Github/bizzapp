"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { getAllcomplains } from "@/actions/customer";
import { acceptComplain } from "@/actions/account";
import { Complain } from "@/types";
import { shrinkString } from "@/utils";
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

interface routeProps {
  tab: "pending" | "attending" | "closed";
}

const CasePage = () => {
  const [activeTab, setActiveTab] =
    React.useState<routeProps["tab"]>("pending");
  const route: routeProps["tab"][] = ["pending", "attending", "closed"];
  const [complains, setComplains] = React.useState<Complain[]>([]);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      const comp = await getAllcomplains();
      setComplains(comp.complains);
    };

    fetchAccounts();
  }, [complains]);

  const pendingComplains = complains.filter(
    (complain) => complain.status === "pending"
  );
  const attendingComplains = complains.filter(
    (complain) => complain.status === "attending"
  );
  const closedComplains = complains.filter(
    (complain) => complain.status === "closed"
  );

  const pendingCount = pendingComplains.length;
  const attendingCount = attendingComplains.length;
  const closedCount = closedComplains.length;

  const tabs = [
    { name: "pending", count: pendingCount },
    { name: "attending", count: attendingCount },
    { name: "closed", count: closedCount },
  ];

  const getFilteredComplains = () => {
    switch (activeTab) {
      case "pending":
        return pendingComplains;
      case "attending":
        return attendingComplains;
      case "closed":
        return closedComplains;
      default:
        return [];
    }
  };

  return (
    <>
      <section className="p-10">
        <div className="flex max-sm:flex-col max-sm:w-full items-center mb-3 w-fit px-3 lg:mr-7 py-1 rounded-[30px] border border-gray-10 sm:[&>*:nth-child(n+2)]:after:absolute [&>*:nth-child(n+2)]:after:-left-[5px] [&>*:nth-child(n+2)]:after:-top-[2px] laptop:[&>*:nth-child(n+2)]:after:top-1 [&>*:nth-child(n+2)]:after:w-[1px] [&>*:nth-child(n+2)]:after:h-10 [&>*:nth-child(n+2)]:after:bg-gray-400">
          {tabs.map((tab) => (
            <Button
              key={tab.name}
              variant="ghost"
              className={cn(
                "relative mx-1 py-2 laptop:py-[14px] px-[22px] laptop:px-[26px] capitalize text-black font-semibold max-laptop:text-sm leading-[18px] rounded-[30px] bg-white",
                {
                  " bg-yellow-200 bg-opacity-60 border border-black hover:bg-yellow-200":
                    activeTab === tab.name,
                }
              )}
              onClick={() =>
                setActiveTab(tab.name as "pending" | "attending" | "closed")
              }
            >
              {tab.name}
              <span className="flex items-center justify-center absolute top-[7px] right-[2px] laptop:right-[7px] w-[18px] height-[18px] rounded-full bg-main-blue text-yellow-100 font-inter text-xs font-semibold">
                {tab.count}
              </span>
            </Button>
          ))}
        </div>
        <Table>
          <TableCaption>A list of all cases</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Agent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getFilteredComplains().map((complain) => (
              <TableRow key={complain.id}>
                <TableCell>{complain.complaint.fullName}</TableCell>
                <TableCell>
                  {shrinkString({ str: complain.complain, len: 100 })}
                </TableCell>
                <TableCell>{complain.attendee?.department?.name}</TableCell>
                <TableCell>{complain.status}</TableCell>
                <TableCell>{complain.complaint.location}</TableCell>
                <TableCell>{complain.attendee?.fullName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      acceptComplain(complain.id.toString()).then((data) => {
                        console.log(data);
                      })
                    }
                  >
                    {activeTab === "pending" || complain.attendee !== undefined
                      ? "accept"
                      : "view"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {getFilteredComplains().length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </>
  );
};

export { CasePage };
