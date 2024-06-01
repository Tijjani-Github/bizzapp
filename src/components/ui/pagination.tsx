"use client";

import { cn } from "@/utils";
import { MouseEventHandler, memo, useCallback, useState } from "react";

function TablePagination({
  activeClassName,
  className,
  prevNextClassName,
}: {
  activeClassName: string;
  className?: string;
  prevNextClassName?: string;
}) {
  const pagesCount = 7;
  const [activePage, setActivePage] = useState(0);

  const handleSetActivePage: MouseEventHandler<HTMLSpanElement> = useCallback(
    (e) => {
      e.preventDefault();

      setActivePage(Number(e.currentTarget.dataset.page));
    },
    []
  );

  const cannotPrev = activePage <= 0;
  const cannotNext = activePage >= pagesCount - 1;

  const handlePrev = useCallback(() => {
    if (cannotPrev) return;
    setActivePage((prev) => prev - 1);
  }, [cannotPrev]);

  const handleNext = useCallback(() => {
    if (cannotNext) return;
    setActivePage((prev) => prev + 1);
  }, [cannotNext]);

  return (
    <div
      className={cn(
        "flex justify-center items-center gap-4 lg:gap-6 bg-slate-200 text-black-100 font-semibold py-4 md:py-[22px] max-md:mt-[6px] rounded-b",
        className
      )}
    >
      <p
        className={cn(
          "text-black-100 font-semibold",
          {
            "text-opacity-40 cursor-not-allowed": cannotPrev,
            "cursor-pointer": !cannotPrev,
          },
          prevNextClassName
        )}
        onClick={handlePrev}
      >
        Previous
        <span className="max-md:hidden"> page</span>
      </p>
      <div className="flex item-center gap-2">
        {Array(pagesCount)
          .fill(0)
          .map((_item, i) => {
            const isActive = i === activePage;
            return (
              <span
                key={i + 1}
                className={cn(
                  "cursor-pointer w-5 h-5 bg-slate-400 flex items-center justify-center rounded-full",
                  {
                    "max-md:hidden": i >= 4,
                    [activeClassName]: isActive,
                  }
                )}
                onClick={handleSetActivePage}
                data-page={i}
              >
                {i + 1}
              </span>
            );
          })}
      </div>
      <p
        className={cn(
          "text-black-100 font-semibold",
          {
            "text-opacity-40 cursor-not-allowed": cannotNext,
            "cursor-pointer": !cannotNext,
          },
          prevNextClassName
        )}
        onClick={handleNext}
      >
        Next
        <span className="max-md:hidden"> page</span>
      </p>
    </div>
  );
}

export default memo(TablePagination);
