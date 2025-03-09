// import { useDarkStore } from "@/stores/darkStore";
import React, { forwardRef } from "react";
import SvgOllama from "./Ollama";

export const OllamaIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{}>
>((props, ref) => {
  // const isDark = useDarkStore((state) => state.dark);
  const isDark = true
  return <SvgOllama ref={ref} {...props} color={isDark ? "#fff" : "#000"} />;
});
