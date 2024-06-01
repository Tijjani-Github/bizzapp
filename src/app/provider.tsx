"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import StateContextProvider from "@/context/StateCtx";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <StateContextProvider>
          {children}
        
        </StateContextProvider>
      </SessionProvider>
    </>
  );
};

export { Providers };
