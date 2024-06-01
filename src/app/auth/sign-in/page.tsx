import React from "react";
import { LoginForm } from "@/components/forms/authforms";

const page = () => {
  return (
    <section className="md:w-[80%] md:mx-auto h-[100vh]">
      <div className="lg:w-[50%] justify-center items-center lg:mx-auto lg:my-[20px] pt-[20px] lg:shadow-lg">
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
