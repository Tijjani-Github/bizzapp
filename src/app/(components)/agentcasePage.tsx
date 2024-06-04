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

const AgentCase = () => {
  const [complains, setComplains] = React.useState<Complain[]>([]);

  React.useEffect(() => {
    const fetchAccounts = async () => {
      const comp = await getAllcomplains();
      setComplains(comp.complains);
    };

    fetchAccounts();
  }, [complains]);

  return (
    <>
      <section className="p-10">
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
            {complains.map((complain) => (
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
                    disabled={complain.attendee !== null}
                    onClick={() =>
                      acceptComplain(complain.id.toString()).then((data) => {
                        console.log(data);
                      })
                    }
                    className={cn(complain.attendee !== null ? "bg-green" : "")}
                  >
                    {"accept"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{complains.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </section>
    </>
  );
};

export { AgentCase };
