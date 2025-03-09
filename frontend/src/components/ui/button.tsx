import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils/utils";
import ForwardedIconComponent from "../common/genericIconComponent";

// here is settings for button
const buttonVariants = cva(
  "noflow nopan nodelete nodrag inline-flex items-center bg-silver justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-100 disabled:disabled-state [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-button", // bg-blue-300
  {
    variants: {
      variant: {
        default: "bg-silver text-black-foreground  hover: ",
        // destructive:
        //   "bg-destructive  -foreground hover: ",
        outline:
          "border border-input hover:  ",
        primary:
          "border bg-silver text-black hover: ",
        warning:
          "bg-warning-foreground text-warning-text hover: ",
        secondary:
          "border      text-black hover: ",
        ghost:
          "text-foreground hover:  disabled:!bg-transparent",
        ghostActive:
          "  text-foreground hover: ",
        menu: "hover:  focus:!ring-0 focus-visible:!ring-0",
        "menu-active":
          " focus-visible:!ring-offset-0",
        link: "underline-offset-4text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        xs: "py-0.5 px-3",
        lg: "h-11 px-8",
        iconMd: "p-1.5",
        icon: "p-1",
        iconSm: "p-0.5",
        "node-toolbar": "py-[6px] px-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  unstyled?: boolean;
  ignoreTitleCase?: boolean;
}

function toTitleCase(text: string) {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      unstyled,
      size,
      loading,
      type,
      disabled,
      asChild = false,
      children,
      ignoreTitleCase = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    let newChildren = children;
    if (typeof children === "string") {
      newChildren = ignoreTitleCase ? children : toTitleCase(children);
    }
    return (
      <>
        <Comp
          className={
            !unstyled
              ? buttonVariants({ variant, size, className })
              : cn(className)
          }
          disabled={loading || disabled}
          {...(asChild ? {} : { type: type || "button" })}
          ref={ref}
          {...props}
        >
          {loading ? (
            <span className="relative flex items-center justify-center">
              <span className="invisible">{newChildren}</span>
              <span className="absolute inset-0 flex items-center justify-center">
                <ForwardedIconComponent
                  name={"Loader2"}
                  className={"h-full w-full animate-spin"}
                />
              </span>
            </span>
          ) : (
            newChildren
          )}
        </Comp>
      </>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
