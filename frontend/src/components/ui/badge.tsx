import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils/utils";

const badgeVariants = cva(
  "inline-flex items-center bg-silver px-4 transition-colors font-w95fa focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-silver hover:bg-silver/80 border-transparent text-black-foreground",
        gray: "bg-border hover:bg-border/80 text-black",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-transparent text-black",
        // destructive:
        //   "bg-destructive hover:bg-destructive/80 border-transparent  -foreground",
        outline: "text-black/80 border-ring/60",
        secondaryStatic: "     border-0",
        successStatic:
          " -emerald text-white border-0",
        errorStatic: "bg-error-background text-error-foreground border-0",
      },
      size: {
        sm: "h-4 text-xs",
        md: "h-5 text-sm",
        lg: "h-6 text-base",
        sq: "h-6 px-1.5 text-sm  ",
        xq: "h-6 px-1.5 text-xs  ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
