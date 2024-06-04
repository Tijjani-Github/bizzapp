"use client";

import { useToast } from "@/components/ui/use-toast";
import React, { useState, useEffect } from "react";
import {
  createnewcustomers,
  gettemplates,
  createComplain,
  getcomplainbyId,
} from "@/actions/customer";
import { Customer, Template } from "@/types";
import { Button } from "@/components/ui/button";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DirectRight } from "iconsax-react";
import { Complain } from "@/types";

const NewCustomers = () => {
  const { CreateNewCustomer, setCreateNewCustomer } = useStateCtx();
  const [formdata, setformdata] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [isLoading, setisLoading] = useState(false);
  const { toast } = useToast();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, phone, location } = formdata;
    if (!fullName || !email || !phone || !location) {
      toast({
        title: "Missing Fields",
        description: "Please fill all fields",
      });
      return;
    }

    setisLoading(true);

    try {
      const result = await createnewcustomers(formdata);

      if (result.status === 201) {
        router.push("/createcomplain");
        localStorage.setItem("customer", JSON.stringify(result.customer));

        toast({
          title: "Customer Created",
          description: result.message,
        });
      } else {
        localStorage.setItem("customer", JSON.stringify(result.customer));
        if (result.customer) {
          router.push("/createcomplain");
        }
        toast({
          title: "Creation Failed",
          description: result.message,
        });
      }
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40  top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          CreateNewCustomer ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setCreateNewCustomer(false)}
      />
      <div
        role="dialog"
        aria-labelledby="remove-client"
        className={cn(
          "py-6   flex flex-col max-[350px]:h-[410px] w-[90%] h-[380px] min-[550px]:w-[500px] md:w-[682px] md:h-[400px] items-center bg-white  fixed top-1/2 left-1/2  z-[999]  transition-all opacity-0 select-none  -translate-y-1/2 -translate-x-1/2",
          CreateNewCustomer
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="sm:text-lg md:text-2xl font-medium text-black">
            Welcome Fill in your Details
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setCreateNewCustomer(false)}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full text-red-500"
          >
            <X size={24} />
          </button>
        </div>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex w-full items-center justify-center flex-col px-4 py-4 gap-y-3"
        >
          <div className="flex w-full items-center justify-between space-x-2">
            <div className="flex flex-col  gap-y-2 w-full">
              <Label htmlFor="fullName" className="font-medium">
                Full Name
              </Label>
              <Input
                type="text"
                name="fullName"
                id="fullName"
                value={formdata.fullName}
                onChange={handleInputChange}
                className="w-full rounded-md md:py-4 py-2 px-2 md:px-4 outline-none "
              />
            </div>
            <div className="flex flex-col  gap-y-2 w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formdata.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between space-x-2">
            <div className="flex flex-col  gap-y-2 w-full">
              <Label htmlFor="phone">Phone</Label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                value={formdata.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col  gap-y-2 w-full">
              <Label htmlFor="locaton">Locaton</Label>
              <Input
                type="text"
                name="location"
                id="locaton"
                value={formdata.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <Button
            className={cn(
              "rounded-full w-full h-[56px] font-medium font-worksans flex space-x-2 text-[16px] bg-main-blue text-white hover:bg-main-blue mt-6",
              isLoading && "relative"
            )}
          >
            {isLoading ? (
              <>
                {/* <div className="loader">
                    <span className="loader-text">Please wait ...</span>
                    <span className="load" />
                  </div> */}
                <svg
                  viewBox="0 0 240 240"
                  height="240"
                  width="240"
                  className="pl relative"
                >
                  <circle
                    strokeLinecap="round"
                    strokeDashoffset="-330"
                    strokeDasharray="0 660"
                    strokeWidth="20"
                    stroke="#000"
                    fill="none"
                    r="105"
                    cy="120"
                    cx="120"
                    className="pl__ring pl__ring--a"
                  ></circle>
                  <circle
                    strokeLinecap="round"
                    strokeDashoffset="-110"
                    strokeDasharray="0 220"
                    strokeWidth="20"
                    stroke="#000"
                    fill="none"
                    r="35"
                    cy="120"
                    cx="120"
                    className="pl__ring pl__ring--b"
                  ></circle>
                  <circle
                    strokeLinecap="round"
                    strokeDasharray="0 440"
                    strokeWidth="20"
                    stroke="#000"
                    fill="none"
                    r="70"
                    cy="120"
                    cx="85"
                    className="pl__ring pl__ring--c"
                  ></circle>
                  <circle
                    strokeLinecap="round"
                    strokeDasharray="0 440"
                    strokeWidth="20"
                    stroke="#000"
                    fill="none"
                    r="70"
                    cy="120"
                    cx="155"
                    className="pl__ring pl__ring--d"
                  ></circle>
                </svg>
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

const Home = () => {
  const { setCreateNewCustomer } = useStateCtx();
  return (
    <div className="xl:py-28 md:py-20 py-10 xl:px-0 px-10 w-full items-center justify-center flex flex-col">
      <span className="w-fit mx-auto flex items-center justify-center bg-emerald-50 rounded-full text-emerald-600 text-center text-sm font-medium leading-5 px-3 py-1 mb-5">
        Bizz App
      </span>
      <h1 className="text-gray-900 text-center font-manrope lg:text-5xl text-4xl font-bold leading-tight mb-8">
        Live Chat <br /> Help us serve you better
      </h1>
      <p className="text-gray-900 text-center text-lg font-normal leading-7">
        We give you all the best and most responsive live chat support to ensure
        your needs are met promptly. Our customer service agents are here to
        assist you in real-time.
      </p>
      <Button onClick={() => setCreateNewCustomer(true)}> Get Started </Button>
    </div>
  );
};

const CreateComplain = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const pathname = usePathname();
  const { replace } = useRouter();
  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    if (storedCustomer) {
      const parsedCustomer: Customer = JSON.parse(storedCustomer);
      setCustomer(parsedCustomer);
    }
  }, []);
  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await gettemplates();

      if (result.status === 200) {
        setTemplates(result.templates);
      } else {
        console.error("Failed to fetch templates:", result.message);
      }
    };

    fetchTemplates();
  }, [templates]);

  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const customerId = searchParams.get("customerId");
  const [openChat, setOpenChat] = useState(false);
  const [complain, setComplain] = React.useState<Complain | null>(null);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (templateId) {
      setOpenChat(true);
    }
  }, [templateId]);

  const selectedTemplate = templates?.find(
    (template: Template) => template.id === Number(templateId)
  );

  const name = `hi ${customer?.fullName} am Jaris am here to help`;
  const requesttospeak = `are you satisfied or you want me to patch you to customer support?`;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [done, setDone] = useState(false);

  const [response, setresponse] = useState("");
  const { toast } = useToast();
  const [patching, setPatching] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (response.includes("yes")) {
      const response = await createComplain(
        customerId!,
        selectedTemplate?.question!
      );

      if (response.status === 201) {
        setPatching(true);
      }
      localStorage.setItem("complain", response.complain);
      const complain = await getcomplainbyId(response.complain.id);
      setComplain(complain.complain);
      toast({
        title:
          response.status === 201
            ? "paching through now"
            : "something went wrong",
        description: response.message,
      });
      setIsSubmitting(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    const complaininLocal = localStorage.getItem("complain");
    if (complaininLocal) {
      try {
        const com: Complain = JSON.parse(complaininLocal);
        setComplain(com);
      } catch (error) {
        console.error("Failed to parse complain from localStorage", error);
      }
    }
  }, []);

  return (
    <div className="w-full flex items-center">
      <div className="w-1/2 flex flex-col p-5 space-y-2">
        <div className=" flex flex-col capitalize space-y-3">
          <span className="text-lg font-medium">
            Hello {customer?.fullName}
          </span>
          <span className="text-base">Are your complaints about:</span>
        </div>
        <div className="flex flex-col w-full space-y-5 mt-[25px]">
          {templates?.map((template) => (
            <div
              key={template.id}
              className={cn(
                "text-start w-full flex shadow-none items-start border-b border-blue-400 cursor-pointer",
                openChat ? "cursor-default" : ""
              )}
              onClick={() => {
                replace(
                  `${pathname}?templateId=${template.id}&customerId=${customer?.id}`
                );
                setOpenChat(true);
              }}
            >
              {template.question}
            </div>
          ))}
          <div>
            <span>something else?: </span>
          </div>
        </div>
      </div>
      {openChat && (
        <div className="flex-1 flex flex-col lg:overflow-x-hidden overflow-y-auto h-full py-6 relative">
          <div className="px-5 lg:px-10 flex flex-col gap-2 items-center  shadow-chat-open">
            {formatDate(currentDateTime)}, - {formatTime(currentDateTime)}
          </div>
          <div className="w-full justify-between flex flex-col py-5 space-y-4">
            <div className="w-full  flex justify-end space-y-5 items-center px-4">
              <div className="w-[250px] flex items-center gap-2">
                <span className="flex w-full h-fit bg-lime-300 rounded-md p-2">
                  {selectedTemplate?.question}
                </span>
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${customer?.email}&background=random`}
                    alt={customer?.fullName}
                  />
                  <AvatarFallback>
                    {getInitials(customer?.fullName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="w-[300px] flex justify-end gap-2 items-center">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={customer?.fullName}
                  />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
              </div>

              <span className="flex flex-col w-full h-fit bg-lime-300 rounded-md p-2">
                <strong>Jaris</strong>
                {name}
              </span>
            </div>
            <div className="w-[300px] flex justify-end gap-2 items-center">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={customer?.fullName}
                  />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
              </div>

              <span className="flex flex-col w-full h-fit bg-lime-300 rounded-md p-2">
                <strong>Jaris</strong>
                {selectedTemplate?.answer}
              </span>
            </div>
            <div className="w-[300px] flex justify-end gap-2 items-center">
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={customer?.fullName}
                  />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
              </div>

              <span className="flex flex-col w-full h-fit bg-lime-300 rounded-md p-2">
                <strong>Jaris</strong>
                {requesttospeak}
              </span>
            </div>
            {done && (
              <div className="w-full  flex justify-end space-y-5 items-center px-4">
                <div className="w-[250px] flex items-center gap-2">
                  <span className="flex w-full h-fit bg-lime-300 rounded-md p-2">
                    {response}
                  </span>
                  <Avatar>
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${customer?.email}&background=random`}
                      alt={customer?.fullName}
                    />
                    <AvatarFallback>
                      {getInitials(customer?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            )}
          </div>
          {!patching && (
            <div className="flex w-full items-center justify-end bottom-0 absolute p-4">
              <form
                action=""
                className="w-full items-center justify-center flex gap-3"
                onSubmit={handleSubmit}
              >
                <Input
                  value={response}
                  onChange={(e) => setresponse(e.target.value)}
                  placeholder="Type your message"
                  type="text"
                  disabled={isSubmitting}
                />
                <Button
                  className="text-white "
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => setDone(true)}
                >
                  <DirectRight />
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { NewCustomers, Home, CreateComplain };

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const formatTime = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
};

const getInitials = (name?: string): string => {
  if (!name) {
    return "";
  }
  const words = name.trim().split(" ");
  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return initials;
};
