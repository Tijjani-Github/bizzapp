"use client";

import React, { useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronRight, Eye, X } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ChangePassword, createNewTemplatea } from "@/actions/account";
import { useToast } from "../ui/use-toast";
import { EyeSlash } from "iconsax-react";

const ChangePasswordModal = () => {
  const { changePassword, setchangePassword } = useStateCtx();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [defaultInpTypeNew, setDefaultInpTypeNew] = useState<
    "password" | "text"
  >("password");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Passwords do not match",
      });
      return;
    }

    const values = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    const result = await ChangePassword(values);

    if (result.status === 200) {
      toast({
        title: "Password changed successfully",
        description: result.message,
      });
    } else {
      toast({
        title: "Password change failed",
        description: result.message,
      });
    }
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 backdrop-blur-sm top-0 left-0  transition-all duration-300 z-[99]",
          changePassword ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setchangePassword(false)}
      />
      <div
        role="dialog"
        aria-labelledby="remove-client"
        className={cn(
          "py-6   flex flex-col w-[360px] h-[400px] min-[450px]:w-[400px] min-[550px]:w-[500px] md:w-[682px] md:h-[500px] justify-between items-center bg-white backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none ",
          changePassword
            ? "-translate-x-1/2 duration-700 opacity-100 rounded-xl md:rounded-2xl"
            : "-translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-2 sm:pb-4  px-2 sm:px-4 md:pl-8 ">
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <Image
              src={
                session?.user?.image
                  ? session.user.image
                  : `https://ui-avatars.com/api/?name=${session?.user?.email}&background=random`
              }
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-black font-semibold">
              {/* @ts-ignore */}
              {session?.user.fullName}
            </span>
            <span className="text-black hidden sm:inline">
              <ChevronRight size={24} />
            </span>
            <span className="text-black   sm:hidden">
              <ChevronRight size={18} />
            </span>{" "}
            <h3 className="sm:text-lg md:text-2xl font-medium text-black  ">
              Change Your Password
            </h3>
          </div>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setchangePassword(false)}
            className="text-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <section className="w-full h-full overflow-x-hidden overflow-y-auto hide-scroll pt-2 sm:pt-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col max-sm:gap-y-6 gap-y-4 lg:gap-y-6 py-4 xl:py-8 px-2 sm:px-4 md:px-6 lg:px-8 h-full items-start"
          >
            <div className="flex flex-col  gap-y-2 w-full">
              <label
                htmlFor="project-title"
                className="text-sm sm:text-base font-medium text-header dark:text-gray-200"
              >
                Old Password
              </label>
              <input
                placeholder="Old Password"
                id="oldPassword"
                className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-primary-light dark:bg-gray-950  dark:text-gray-200 dark:border-primary-light"
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col  gap-y-2 w-full">
              <label
                htmlFor="project-title"
                className="text-sm sm:text-base font-medium text-header dark:text-gray-200"
              >
                New Password
              </label>
              <input
                placeholder="newPassword"
                id="newPassword"
                className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-primary-light dark:bg-gray-950  dark:text-gray-200 dark:border-primary-light"
                type={defaultInpTypeNew}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex w-full relative items-center">
              <div className="flex flex-col  gap-y-2 w-full">
                <label
                  htmlFor="project-title"
                  className="text-sm sm:text-base font-medium text-header dark:text-gray-200"
                >
                  Confirm Password
                </label>
                <input
                  placeholder="newPassword"
                  id="newPassword"
                  className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-primary-light dark:bg-gray-950  dark:text-gray-200 dark:border-primary-light"
                  type={defaultInpTypeNew}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <span className="absolute right-2">
                {defaultInpTypeNew === "text" ? (
                  <Eye
                    color="#777"
                    onClick={() => setDefaultInpTypeNew("password")}
                  />
                ) : (
                  <EyeSlash
                    color="#777"
                    onClick={() => setDefaultInpTypeNew("text")}
                  />
                )}
              </span>
            </div>
            <button
              type="submit"
              tabIndex={0}
              aria-label="Remove"
              className={cn(
                "rounded-lg bg-main-blue text-white h-[56px] w-full py-4 px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light"
              )}
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

const NewTemplateModal = () => {
  const { NewTemplate, setNewTemplate } = useStateCtx();
  const { data: session } = useSession();
  const [templateData, setTemplateData] = useState({
    question: "",
    answer: "",
  });

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const values = {
      question: templateData.question,
      answer: templateData.answer,
    };

    const result = await createNewTemplatea(values);

    if (result.status === 201) {
      toast({
        title: "Templte created successfully",
        description: result.message,
      });
      setTemplateData({
        question: "",
        answer: "",
      });
    } else {
      toast({
        title: "template creation failed",
        description: result.message,
      });
    }
  };
  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 backdrop-blur-sm top-0 left-0  transition-all duration-300 z-[99]",
          NewTemplate ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setNewTemplate(false)}
      />
      <div
        role="dialog"
        aria-labelledby="make-payment"
        className={cn(
          "py-6   flex flex-col w-[360px] h-[350px] min-[450px]:h-[380px] min-[450px]:w-[400px] min-[550px]:w-[500px] md:w-[682px] md:h-[459px] justify-between items-start bg-white dark:bg-gray-900 backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 z-[999]  transition-all opacity-0 select-none ",
          NewTemplate
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-2 sm:pb-4  px-2 sm:px-4 md:pl-8 ">
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <Image
              src={
                session?.user?.image
                  ? session.user.image
                  : `https://ui-avatars.com/api/?name=${session?.user?.email}&background=random`
              }
              alt="User Image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-black font-semibold">
              {/* @ts-ignore */}
              {session?.user.fullName}
            </span>
            <span className="text-black hidden sm:inline">
              <ChevronRight size={24} />
            </span>
            <span className="text-black   sm:hidden">
              <ChevronRight size={18} />
            </span>{" "}
            <h3 className="sm:text-lg md:text-2xl font-medium text-black  ">
              Create New Template
            </h3>
          </div>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setNewTemplate(false)}
            className="text-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <section className="w-full h-full overflow-x-hidden overflow-y-auto hide-scroll">
          <form
            action=""
            className="text-base leading-[22px] flex flex-col gap-y-7 px-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-y-2">
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                className="text-sm p-4 border border-[#E1E1E1] rounded-lg outline-none ring-0"
                placeholder="Enter Template title"
                type="text"
                name="title"
                id="title"
                value={templateData.question}
                onChange={(e) =>
                  setTemplateData({ ...templateData, question: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <label htmlFor="description" className="font-semibold">
                Answer
              </label>
              <textarea
                rows={7}
                className="text-sm p-4 resize-none border border-[#E1E1E1] rounded-lg outline-none ring-0"
                placeholder="Please answer to the template"
                name="description"
                id="description"
                value={templateData.answer}
                onChange={(e) =>
                  setTemplateData({
                    ...templateData,
                    answer: e.target.value,
                  })
                }
              />
            </div>
            <button
              type="submit"
              tabIndex={0}
              aria-label="Remove"
              className={cn(
                "rounded-lg bg-main-blue text-white h-[56px] w-full py-4 px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-light"
              )}
            >
              Save Templte
            </button>
          </form>
        </section>
      </div>
    </>
  );
};
export { ChangePasswordModal, NewTemplateModal };
