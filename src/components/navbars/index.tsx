"use client";
import React from "react";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import { Add, HambergerMenu } from "iconsax-react";
import { useSession } from "next-auth/react";
import { handleMouseEnter } from "@/utils/text-effect";
import { UserContainer } from "./UserContainer";
const AdminNav = () => {
  const { currentPath, setOpenAdminSidebar, openAdminSidebar } = useStateCtx();
  const { data: session } = useSession();
  return (
    <>
      <nav className="w-full flex items-center justify-between px-2 md:px-4 py-2 md:py-[18px] md:h-[88px] border-b border-yellow-100 relative">
        <button
          type="button"
          aria-haspopup
          aria-label="Open sidebar menu"
          aria-expanded={openAdminSidebar}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setOpenAdminSidebar(true);
              return;
            }
          }}
          onClick={() => setOpenAdminSidebar(true)}
          tabIndex={0}
          className="focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success min-[900px]:hidden mr-4 h-10 w-10 relative z-50 "
        >
          <HambergerMenu className="text-copy dark:text-dark-copy h-full w-full " />
        </button>
        <div className="flex w-full max-w-[30%]">
          <h2
            onMouseEnter={handleMouseEnter}
            className="text-[20px] font-semibold text-copy dark:text-dark-copy capitalize"
            data-value={currentPath}
          >
            {currentPath}
          </h2>
        </div>
        <div className="flex items-center  w-full justify-end gap-x-3 md:gap-x-5">
          <UserContainer />
        </div>
      </nav>
    </>
  );
};

export { AdminNav };
