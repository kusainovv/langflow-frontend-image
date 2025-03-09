import * as React from "react";
import { cn } from "../../utils/utils";
import ForwardedIconComponent from "../common/genericIconComponent";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputClassName, icon = "", type, ...props }, ref) => {
    if (icon) {
      return (
        <label className={cn("relative block w-full", className)}>
          <ForwardedIconComponent
            name={icon}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-black bg-green-500"
          />
          <input
            autoComplete="off"
            data-testid=""
            type={type}
            className={cn(
              "nopan nodelete nodrag noflow form-input block w-full appearance-none truncate border-border bg-white px-3 text-left text-sm shadow-field  focus:border-black focus:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:border-white dark:focus:ring-zinc-800 !bg-orange-500",
              inputClassName,
            )}
            ref={ref}
            {...props}
          />
        </label>
      );
    } else {
      return (
        <input
          data-testid=""
          type={type}
          className={cn(
            "nopan nodelete nodrag noflow primary-input min-h-[36px] w-full",
            className,
          )}
          ref={ref}
          {...props}
        />
      );
    }
  },
);
Input.displayName = "Input";

export { Input };
