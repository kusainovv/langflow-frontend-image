import React, { forwardRef } from "react";
import SvgAspis from "./Aspis";

export const AspisIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{ color?: string }>
>((props, ref) => {
  return <SvgAspis ref={ref} {...props} />;
});
