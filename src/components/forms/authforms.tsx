"use client";

import { useEffect, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/utils";
import { Input } from "../ui/input";
// import { LoginWithGoggle } from "@/modules/auth/social";
import { LoginSchema, RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeSlash } from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";
// import { OtpModal } from "@/components/modals";
// import { User } from "@/types";
import { register, login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const LoginForm = () => {
  const { toast } = useToast();
  const [defaultInpType, setDefaultInpType] = useState<"password" | "text">(
    "password"
  );
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const [isLoading, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then(async (data) => {
        const loginva = JSON.stringify(values);
        signIn("credentials", { loginva, redirect: false });
        toast({
          title:
            data.status === 200 ? "Login successfull!" : "An error occured",
          description: `${data.message}`,
        });
        if (data.status === 200) {
          if (data.user.role === "admin") {
            router.push("/admin/dashboard");
          }
        } else {
          router.push("https://bizz-five.vercel.app/agent");
        }
      });
    });
  };
  useEffect(() => {
    router.prefetch(DEFAULT_LOGIN_REDIRECT);
  }, [router]);

  return (
    <div className="relative sm:pt-[30px] sm:pb-[24px] rounded-[16px] bg-white lg:px-[40px]">
      <h1 className="text-center font-montserrat font-[600] text-[28px]">
        Welcome back !
      </h1>
      <span className="block text-center font-[400] text-[20px] mt-2 mb-6 text-dark-400 font-nunito">
        Login to continue
      </span>
      <Form {...form}>
        <form
          action=""
          className="flex flex-col z-10 mt-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="identifier"
                      type="text"
                      disabled={isLoading}
                      className="mt-1 mb-3 block px-2.5 pb-2.5 placeholder:text-transparent pt-4 w-full  text-sm rounded-lg border border-main-blue h-[56px]  focus:border-yellow-100 peer"
                      placeholder="email | username"
                    />
                    <FormLabel
                      htmlFor="identifier"
                      className="absolute text-sm text-gray-500 duration-300 bg-main-blue peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  peer-focus:bg-main-blue px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                    >
                      Email | Username
                    </FormLabel>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex w-full relative items-center">
                    <div className="relative w-full">
                      <Input
                        {...field}
                        id="password"
                        disabled={isLoading}
                        type={defaultInpType}
                        className="mt-1 mb-3 block px-2.5 pb-2.5 placeholder:text-transparent pt-4 w-full  text-sm rounded-lg border border-main-blue h-[56px]  focus:border-yellow-100 peer"
                        placeholder="email | username"
                      />
                      <FormLabel
                        htmlFor="password"
                        className="absolute text-sm text-gray-500 duration-300 bg-main-blue peer-placeholder-shown:bg-transparent transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  peer-focus:bg-main-blue px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-3"
                      >
                        Email | Username
                      </FormLabel>
                    </div>
                    <span className="absolute right-2 top-4">
                      {defaultInpType === "text" ? (
                        <Eye
                          color="#777"
                          onClick={() => setDefaultInpType("password")}
                        />
                      ) : (
                        <EyeSlash
                          color="#777"
                          onClick={() => setDefaultInpType("text")}
                        />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="mb-4 text-xs dark:text-dark-background text-background">
            Forgot password?{" "}
            <Link
              href="/auth/forgot-password"
              className="text-primary-light dark:text-secondary-light font-medium"
            >
              Reset
            </Link>
          </span>
          <div className="flex relative items-center [perspective:300px] transform-gpu max-sm:w-full">
            <Button
              className={cn(
                "rounded-full w-full h-[56px] font-medium font-worksans flex space-x-2 text-[16px] bg-background dark:bg-dark-background dark:text-dark-copy hover:bg-inherit",
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
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export { LoginForm };
