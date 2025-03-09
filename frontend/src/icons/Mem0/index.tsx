// import { useDarkStore } from "@/stores/darkStore";
import React, { forwardRef } from "react";
import SvgMem from "./SvgMem";

export const Mem0 = forwardRef<SVGSVGElement, React.PropsWithChildren<{}>>(
  (props, ref) => {
    // const isdark = useDarkStore((state) => state.dark).toString();
    const isdark = true
    return <SvgMem className="icon" ref={ref} {...props} isdark={isdark} />;
  },
);
