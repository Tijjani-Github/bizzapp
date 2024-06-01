import { cn } from "@/utils";
import React from "react";

const DropdownButton = ({
  text,
  className,
  icon,
}: {
  text: string;
  className?: HTMLButtonElement["className"];
  icon?: JSX.Element;
}) => {
  return (
    <button
      type="button"
      tabIndex={0}
      aria-label="open search"
      className={cn(
        " transition-opacity duration-500 rounded-full flex items-center gap-x-3 text-copy dark:text-dark-copy hover:opacity-70 ",
        className
      )}
    >
      {icon && icon}
      <span className="text-sm">{text}</span>
    </button>
  );
};
export { DropdownButton };
