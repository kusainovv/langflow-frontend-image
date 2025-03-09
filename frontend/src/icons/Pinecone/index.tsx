// import { useDarkStore } from "@/stores/darkStore";
import React, { forwardRef } from "react";
import SvgPineconeLogo from "./PineconeLogo";

export const PineconeIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{}>
>((props, ref) => {
  // const isDark = useDarkStore((state) => state.dark);
  const isDark = true
  return (
    <SvgPineconeLogo ref={ref} {...props} color={false ? "#fff" : "#000"} />
  );
});
