import React, { forwardRef } from "react";
import FileIcon from "./FileIcon";

export const FileSvgIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{}>
>((props, ref) => {
  return <FileIcon ref={ref} {...props} />;
});
