"use client";

import { useSession } from "next-auth/react";
import * as React from "react";
import { useStateCtx } from "@/context/StateCtx";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { NewTemplateModal } from "@/components/modal";

const Templatenav = () => {
  const { data: session } = useSession();
  const { setNewTemplate } = useStateCtx();
  return (
    <>
      <section className="flex items-start justify-between p-10">
        <Button
          type="button"
          onClick={() => setNewTemplate(true)}
          className={cn(
            // @ts-ignore
            session?.user.role === "agent" ? "hidden" : "flex",
            "bg-yellow-100 w-[150px] h-[56px]"
          )}
        >
          Create New Template
        </Button>
      </section>
    </>
  );
};

export { Templatenav };
