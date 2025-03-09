import React, { forwardRef } from "react";
import SvgEntangle from "./Entangle";

export const EntangleIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{ color?: string }>
>((props, ref) => {
  return <SvgEntangle ref={ref} {...props} />;
});
