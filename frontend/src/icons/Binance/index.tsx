import React, { forwardRef } from "react";
import SvgBinance from "./Binance";

export const BinanceIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{ color?: string }>
>((props, ref) => {
  return <SvgBinance ref={ref} {...props} />;
});
