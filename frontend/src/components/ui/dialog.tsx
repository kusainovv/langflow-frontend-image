import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import { cn } from "../../utils/utils";
import ShadTooltip from "../common/shadTooltipComponent";
import { Button } from "./button";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props}>
    <div className="nopan nodelete nodrag noflow fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "nopan nodelete nodrag noflow fixed inset-0 bottom-0 left-0 right-0 top-0 z-40 overflow-auto bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  // console.info(props)
  return <DialogPortal>
    <DialogOverlay />

    <div 
    className={cn(
      "fixed z-50 flex w-full max-w-lg data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95  data-[state=open]:zoom-in-95",
      className
    )}
    
       style={{ 
        // width: 150, height: 100, 
        background: '#BFBFBF', 
        boxShadow: '2px 2px 0px white inset' }}>

  <div className="w-full h-full" style={{ boxShadow: '-2px -2px 0px #808080 inset', backgroundColor: "#BFBFBF" }} >
    <div className="w-full h-full" style={{ boxShadow: '1px 1px 0px #DBDBDB inset', backgroundColor: "#BFBFBF" }}>
      <div className="w-full h-full" style={{ boxShadow: '-1px -1px 0px black inset', backgroundColor: "#BFBFBF" }}>
      <DialogPrimitive.Content
      className={cn(
        "flex flex-col h-full bg-light-gray duration-200 ",
      )}
      {...props}
      ref={ref}
    >
          
      <DialogPrimitive.Close className="w-full">
        <div className="relative bg-gradient-to-r from-navy-gradient-start to-navy-gradient-end w-full min-h-[18px] h-100% flex justify-between items-center">
              <p className="m-0 text-white text-xs	pl-2">Modal_Window.exe</p>

              <div className="h-full w-[30px]">
                <Button className="w-full h-full">
                  <Cross2Icon className="text-black" />
                </Button>
              <span className="sr-only">Close</span>
            </div>
          </div>
        </DialogPrimitive.Close>
        
     {children}

      <ShadTooltip
        styleClasses="z-50"
        content="Close"
        side="bottom"
        avoidCollisions
      >
      </ShadTooltip>
    </DialogPrimitive.Content>
      </div>
    </div>
  </div>
</div>


  </DialogPortal>
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1 p-4 text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse pb-2 px-2 sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg   leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm   ", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
