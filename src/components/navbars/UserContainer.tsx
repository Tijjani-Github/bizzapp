"use client";

import { cn, shrinkString } from "@/utils";
import { Logout, Setting, User } from "iconsax-react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { DropdownButton } from "./dropdownlink";
import { useSession } from "next-auth/react";

const UserContainer = () => {
  const { data: session } = useSession();
  const [openProfile, setOpenProfile] = useState(false);
  console.log(session?.user?.image);

  return (
    <div
      role="button"
      className="w-full max-w-[50px] lg:max-w-[215px] h-[52px] flex items-center gap-x-1 justify-center lg:justify-between p-1 lg:px-2 lg:py-[6px] rounded-full border border-main-blue relative "
    >
      <button
        type="button"
        aria-haspopup
        aria-label="Open user menu"
        aria-expanded={openProfile}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpenProfile((prev) => !prev);
            return;
          }
        }}
        onClick={() => setOpenProfile((prev) => !prev)}
        tabIndex={0}
        className="focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Image
          src={
            session?.user?.image
              ? session.user.image
              : `https://ui-avatars.com/api/?name=${session?.user?.email}&background=random`
          }
          alt="user"
          height={38}
          width={38}
          className="rounded-full object-contain max-sm:scale-110"
        />
      </button>
      <div
        onClick={() => setOpenProfile((prev) => !prev)}
        className="hidden lg:flex flex-col  items-end"
      >
        <span className="text-black font-inter">
          {/*  @ts-ignore */}
          {shrinkString({ str: session?.user?.username, len: 10 })}
        </span>
        <span className="text-sm text-black">
          {/* @ts-ignore */}
          {shrinkString({ str: session?.user?.email, len: 10 })}
        </span>
      </div>
      <button
        type="button"
        aria-haspopup
        aria-label="Open user menu"
        aria-expanded={openProfile}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpenProfile((prev) => !prev);
            return;
          }
        }}
        onClick={() => setOpenProfile((prev) => !prev)}
        tabIndex={0}
        className="focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-blue hidden lg:inline-block"
      >
        <ChevronDown
          className={cn(
            "text-main-sec transition-all transform-gpu duration-300",
            openProfile ? "rotate-180" : ""
          )}
        />
      </button>
      {openProfile && (
        <div
          className="min-h-screen h-screen top-0 left-0 w-full fixed z-[99] opacity-0 bg-black/25 cursor-default"
          role="dialog"
          onClick={() => setOpenProfile(!openProfile)}
        />
      )}
      <div
        role="dialog"
        className={cn(
          " absolute max-h-max border p-4 border-main-blue  w-[220px] top-16 right-1 z-[999] backdrop-blur-xl flex flex-col gap-y-2   justify-between  shadow-[0_10px_40px_rgba(0,0,0,0.23)] rounded-xl before:absolute before:content-[''] before:h-[20px] before:w-[20px] before:bg-white before:overflow-hidden before:-top-2 before:rotate-[45deg] before:right-4 transform-gpu transition-all ",
          openProfile
            ? "opacity-100 h-[200px] duration-500 "
            : "opacity-0 h-0 duration-200 overflow-hidden pointer-events-none"
        )}
      >
        <div className="flex items-center  gap-x-2 w-full pb-2 backdrop-blur-sm border-b border-main-blue">
          <Image
            src={
              // @ts-ignore
              session?.user.image
                ? session.user.image
                : // @ts-ignore
                  `https://ui-avatars.com/api/?name=${session?.user?.email}&background=random`
            }
            alt="user"
            height={70}
            width={70}
            className="rounded-full object-contain object-center "
          />

          <div className="flex flex-col items-start">
            <span className={cn("text-black text-sm font-semibold  ")}>
              {/*  @ts-ignore */}
              {shrinkString({ str: session?.user?.username, len: 10 })}
            </span>
            <span className={cn("text-black text-sm   ")}>
              {/* @ts-ignore */}
              {shrinkString({ str: session?.user?.email, len: 10 })}
            </span>
          </div>
        </div>

        <DropdownButton
          icon={<User size={18} className="text-black  " />}
          text="My Profile"
        />
        <DropdownButton
          icon={<Setting size={18} className="text-black  " />}
          text="Account Settings"
        />
        <DropdownButton
          icon={<Logout size={18} className="text-black  " />}
          text="Logout"
        />
      </div>
    </div>
  );
};

export { UserContainer };
