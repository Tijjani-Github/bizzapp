"use client";

import React from "react";
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
import { getAllCustomers } from "@/actions/customer";
import { Customer } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CustomerTable = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const { data: session } = useSession();

  React.useEffect(() => {
    const fetchAccounts = async () => {
      const res = await getAllCustomers();

      setCustomers(res.customers);
    };

    fetchAccounts();
  }, [customers]);

  return (
    <section className="p-10 w-full">
      <Table className="p-5 w-full">
        <TableCaption>A list of all Customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Loaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.fullName}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.location}</TableCell>
              <TableCell>
                <Button asChild>
                  <Link
                    //  @ts-ignore
                    href={`/${session?.user?.role}/customer/details?id=${customer.id}`}
                  >
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{customers.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  );
};

export { CustomerTable };
