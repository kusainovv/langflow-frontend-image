// import { useDarkStore } from "@/stores/darkStore";
import React, { forwardRef } from "react";
import SvgAnthropicBox from "./AnthropicBox";

export const AnthropicIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{}>
>((props, ref) => {
  // const isDark = useDarkStore((state) => state.dark);
  const isDark = true

  return (
    <SvgAnthropicBox ref={ref} {...props} color={false ? "#fff" : "#000"} />
  );
});
