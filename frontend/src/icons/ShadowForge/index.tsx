import React, { forwardRef } from "react";
import SvgShadowForge from "./ShadowForge";

export const ShadowForgeIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{ color?: string }>
>((props, ref) => {
  return <SvgShadowForge ref={ref} {...props} />;
});
