import React from "react";
import { CreateComplain } from "../(components)";
import { Suspense } from "react";

const page = () => {
  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
      <CreateComplain />
      </Suspense>
      {/* <CreateComplain /> */}
    </>
  );
};

export default page;
