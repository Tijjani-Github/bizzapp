"use client";

import { useSession } from "next-auth/react";
import * as React from "react";
import { useStateCtx } from "@/context/StateCtx";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { shrinkString } from "@/utils";
import { Template } from "@/types";
import { gettemplates } from "@/actions/customer";
import { Input } from "@/components/ui/input";
import { BAClose, BACopy, BADoc, BASearch } from "@/lib/icon";

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

const TemplatePage = () => {
  const [templates, setTemplates] = React.useState<Template[] | null>(null);
  const [searchinput, setsearchinput] = React.useState("");
  const [template, setTemplate] = React.useState<Template>();
  React.useEffect(() => {
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsearchinput(event.target.value.toLowerCase());
  };

  const filteredTemplates = React.useMemo(() => {
    if (!searchinput) {
      return templates;
    }

    return templates?.filter((template) =>
      template.question.toLowerCase().includes(searchinput)
    );
  }, [templates, searchinput]);

  return (
    <>
      <section className="flex items-start justify-between px-10">
        <div className="w-1/2 flex flex-col h-full border-r-black border-r cursor-pointer px-4 border-solid items-start justify-start">
          <div className="flex flex-1 items-center gap-[5px] relative w-full">
            <Input
              className="flex-1 outline-none border-none text-xs lg:leading-5 placeholder:text-gray-3 px-4"
              placeholder="Search via template name..."
              value={searchinput}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            {filteredTemplates?.map((temp) => (
              <div
                key={temp.id}
                onClick={() => setTemplate(temp)}
                className={cn(
                  "flex gap-[3px] border-b border-gray-400 p-1 mt-5",
                  {
                    "bg-yellow-300 rounded": template?.id === temp.id,
                  }
                )}
              >
                <div className="flex gap-[10px]">
                  <span className="w-[38px] flex-shrink-0 h-[38px] flex items-center justify-center rounded-full bg-[#CFE1F9]">
                    <BADoc />
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-800 leading-[14px]">
                      <span className="text-xs font-medium -tracking-[0.24px] text-opacity-70">
                        Question:
                      </span>
                      <span
                        className="text-sm font-semibold -tracking-[0.28px]"
                        dangerouslySetInnerHTML={{
                          __html: temp.question.replace(
                            new RegExp(`(${searchinput})`, "gi"),
                            (match, group) =>
                              `<span style="color: black; background-color: ${
                                group.toLowerCase() ===
                                searchinput.toLowerCase()
                                  ? "yellow"
                                  : "inherit"
                              }">${match}</span>`
                          ),
                        }}
                      />
                    </p>
                    <p className="text-gray-700 text-[10px] leading-4">
                      {shrinkString({ str: temp.answer, len: 300 })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full items-center justify-start">
          {template ? (
            <>
              <div className="flex-1 flex flex-col lg:overflow-hidden gap-4 p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-main-blue-100 text-lg lg:text-xl font-semibold lg:leading-8">
                    {template.question}
                  </p>
                  <div className="flex items-center gap-[10px]">
                    <button className="py-[10px] px-[18px] flex gap-2 rounded-lg border border-slate-900 shadow-template-copy">
                      <span>
                        <BACopy />
                      </span>
                      <span className="text-main-blue">Copy</span>
                    </button>
                  </div>
                </div>
                <div className="flex-1 lg:overflow-y-auto text-main-blue text-opacity-70 lg:pb-5">
                  {template.answer}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="items-center justify-center h-full flex w-full">
                select a templeate
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export { Templatenav, TemplatePage };
