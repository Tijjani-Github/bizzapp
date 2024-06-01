"use client";

import Image from "next/image";
import { SIDEBAR_FOO_LINKS, ADMIN_SIDEBAR_LINKS } from "@/lib";
import { useState, useEffect, useRef } from "react";
import { cn, shrinkString } from "@/utils";
import Link from "next/link";

import { useStateCtx } from "@/context/StateCtx";
import { handleMouseEnter } from "@/utils/text-effect";
import { ChevronLeftCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const ADMIN_SIDEBAR = () => {
  const pathname = usePathname();
  const { openAdminSidebar, setOpenAdminSidebar } = useStateCtx();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <>
      <div
        className={cn(
          "fixed min-h-screen w-full bg-black/50  min-[900px]:bg-black/10 dark:min-[900px]:bg-black/5 top-0 left-0 z-[99] transition-all duration-300 overflow-hidden",
          openAdminSidebar ? "opacity-100" : "opacity-0 pointer-events-none "
        )}
        onClick={() => setOpenAdminSidebar(false)}
      />
      <section
        className={cn(
          "bg-main-blue-100 z-[100]  transition-all duration-300 py-5 min-[900px]:flex flex-col gap-y-4 justify-between fixed lg:sticky min-h-screen left-0 top-0  border-r border-gray-200  sidebar-scroll select-none ",
          openAdminSidebar
            ? "w-[270px]  items-start flex translate-x-0 z-[99]"
            : "min-[900px]:w-[80px]  items-center   -translate-x-full min-[900px]:translate-x-0"
        )}
      >
        <button
          type="button"
          tabIndex={0}
          aria-label="close sidebar"
          onClick={() => setOpenAdminSidebar(false)}
          className={cn(
            "absolute -right-2 transition-opacity duration-700 focus-visible:outline-2 focus-visible:outline-offset-2 w-[24px] text-main-blue  bg-white rounded-full z-[9999]",
            {
              "opacity-0 duration-300": !openAdminSidebar,
            }
          )}
        >
          <ChevronLeftCircle stroke="currentColor" className="" />
        </button>
        <div
          className={cn(
            "flex flex-col gap-y-2 sm:gap-y-4  w-full  relative group-hover:items-start group-hover:pl-4 transition-all duration-300",
            openAdminSidebar ? "pl-4 delay-100" : "items-center "
          )}
        >
          <Link
            href="/"
            className=" w-full  h-10 my-5 mb-7 flex items-center transition-all duration-300"
          >
            <Image src="/logo.png" alt="Logo" width={60} height={60} />

            <Image
              src="/cs.png"
              alt="Logo"
              width={152}
              height={70}
              className={cn(
                "pointer-events-none opacity-0 group-hover:block w-[150px] pl-4 lg:pl-6 transition-all duration-0 whitespace-nowrap",
                openAdminSidebar &&
                  "opacity-100 duration-300 delay-100 pointer-events-auto"
              )}
            />
          </Link>
          {ADMIN_SIDEBAR_LINKS.map((link) => (
            <Button
              asChild
              type="button"
              role="link"
              aria-current={activeLink === link.link ? "page" : undefined}
              key={link.id}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveLink(link.link);
                  return;
                }
              }}
              tabIndex={0}
              aria-label={link.label}
              onClick={() => {
                setActiveLink(link.link);
                setOpenAdminSidebar(false);
              }}
              className={cn(
                "flex items-center justify-center bg-main-blue shadow-none h-10 w-full text-white font-medium text-base transition-colors duration-300 cursor-pointer relative before:content-[''] before:absolute before:right-0 before:h-[21px] before:w-[3px]  before:bg-slate-100 before:rounded-tl-md before:rounded-bl-md  before:transition-all before:duration-300 group/btn z-10",
                pathname === link.link
                  ? "[&>span]:font-semibold before:opacity-100 bg-white text-main-blue-100 rounded outline-none"
                  : " before:opacity-0 before:hover:opacity-30 hover:bg-blue-50 hover:text-black-300  focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-blue"
              )}
            >
              <Link href={link.link}>
                <link.icon
                  size={24}
                  aria-hidden
                  variant={activeLink === link.link ? "Bulk" : "Broken"}
                />
                <span
                  className={cn(
                    "hidden group-hover:inline cursor-no-drop w-[150px] font-medium text-left pl-4 lg:pl-6",
                    openAdminSidebar && "inline pointer-events-none"
                  )}
                >
                  {link.label}
                </span>
                <span
                  className={cn(
                    "absolute max-[450px]:hidden left-16  max-w-max w-[120px] z-10 bg-main-blue text-white rounded-md text-xs px-2 py-1  before:content-[''] backdrop-blur-xl before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:-rotate-45 before:bg-gradient-to-tl from-transparent via-main-blue/70 to-main-blue transform-gpu translate-x-8 opacity-0 transition-all duration-500 group-hover/btn:opacity-100 group-hover/btn:translate-x-5 pointer-events-none group-hover:translate-x-52 group-hover:group-hover/btn:translate-x-48",

                    {
                      "translate-x-52 group-hover/btn:translate-x-48":
                        openAdminSidebar,
                    }
                  )}
                >
                  {shrinkString({
                    str: link.label,
                    len: 17,
                  })}
                </span>
              </Link>
            </Button>
          ))}
        </div>
        <div
          className={cn(
            "flex flex-col gap-y-2 sm:gap-y-4  w-full  relative group-hover:items-start group-hover:pl-4 transition-all duration-300 bottom-0",
            openAdminSidebar ? "pl-4" : "items-center "
          )}
        >
          {SIDEBAR_FOO_LINKS.map((link) => (
            <Button
              type="button"
              role="link"
              key={link.id}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveLink(link.link);
                  return;
                }
              }}
              tabIndex={0}
              aria-label={link.label}
              className={cn(
                "flex items-center justify-center bg-main-blue shadow-none h-10 w-full text-white font-medium text-base transition-colors duration-300 cursor-pointer relative before:content-[''] before:absolute before:right-0 before:h-[21px] before:w-[3px]  before:bg-slate-100 before:rounded-tl-md before:rounded-bl-md  before:transition-all before:duration-300 group/btn z-10",
                activeLink === link.link
                  ? "[&>span]:font-semibold before:opacity-100 bg-white text-main-blue-100 rounded outline-none"
                  : " before:opacity-0 before:hover:opacity-30 hover:bg-blue-50 hover:text-black-100  focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-blue",
                link.link === "logout" ? "text-red" : ""
              )}
              onClick={() => {
                if (link.link === "open-sidebar") {
                  setOpenAdminSidebar(!openAdminSidebar);
                  return;
                }
                setActiveLink(link.link);
              }}
            >
              <link.icon
                className={cn(
                  "transition-transform duration-500",
                  link.link === "open-sidebar" && !openAdminSidebar
                    ? "rotate-0"
                    : link.link === "open-sidebar" && openAdminSidebar
                    ? "rotate-[540deg]"
                    : ""
                )}
                size={24}
                aria-hidden
                variant={activeLink === link.link ? "Bulk" : "Broken"}
              />
              <span
                className={cn(
                  "hidden group-hover:block w-[150px] font-medium text-left pl-4 lg:pl-6",
                  openAdminSidebar && "block"
                )}
              >
                {link.link === "open-sidebar" && !openAdminSidebar
                  ? "Open sidebar"
                  : link.link === "open-sidebar" && openAdminSidebar
                  ? "Close sidebar"
                  : link.label}
              </span>
              <span
                className={cn(
                  "absolute max-[450px]:hidden left-16  max-w-max w-[120px] z-10 bg-main-blue text-white rounded-md text-xs px-2 py-1  before:content-[''] backdrop-blur-xl before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:-rotate-45 before:bg-gradient-to-tl from-transparent via-main-blue/70 to-main-blue transform-gpu translate-x-8 opacity-0 transition-all duration-500 group-hover/btn:opacity-100 group-hover/btn:translate-x-5 pointer-events-none group-hover:translate-x-52 group-hover:group-hover/btn:translate-x-48",
                  {
                    "translate-x-52 group-hover/btn:translate-x-48":
                      openAdminSidebar,
                  },
                  link.link === "logout" ? "text-red" : "text-white"
                )}
              >
                {openAdminSidebar && link.link === "open-sidebar"
                  ? "Close sidebar"
                  : !openAdminSidebar && link.link === "open-sidebar"
                  ? "Open sidebar"
                  : link.label}
              </span>
            </Button>
          ))}
        </div>
      </section>
    </>
  );
};

export { ADMIN_SIDEBAR };
