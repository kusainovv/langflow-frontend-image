import React, { forwardRef } from "react";
import UserIcon from "./UserIcon";

export const UserSvgIcon = forwardRef<
  SVGSVGElement,
  React.PropsWithChildren<{}>
>((props, ref) => {
  return <UserIcon ref={ref} {...props} />;
});
