import { AuthContext } from "@/contexts/authContext";
import { BASE_URL_API } from "@/customization/config-constants";
import UserIcon from "@/icons/User/UserIcon";
import { useContext } from "react";

export function ProfileIcon() {
  const { userData } = useContext(AuthContext);

  // const profileImageUrl = `${BASE_URL_API}files/profile_pictures/${
  //   userData?.profile_image ?? "Space/046-rocket.svg"
  // }`;

  // TODO:Ratmir / This is a real SVG Icon
  return <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M31 11.8091H29.5275V19.191H31V11.8091Z" fill="#000001"/>
  <path d="M29.5275 19.1909H28.0453V22.1359H29.5275V19.1909Z" fill="#000001"/>
  <path d="M28.0453 22.136H26.5728V25.0907H28.0453V22.136Z" fill="#000001"/>
  <path d="M28.0453 5.89966H26.5728V8.85435H28.0453V5.89966Z" fill="#000001"/>
  <path d="M26.5728 25.0906H25.1003V26.5631H26.5728V25.0906Z" fill="#000001"/>
  <path d="M26.5728 4.42725H25.1003V5.89975H26.5728V4.42725Z" fill="#000001"/>
  <path d="M25.1003 26.5632H22.1456V28.0454H25.1003V26.5632Z" fill="#000001"/>
  <path d="M25.1003 2.94507H22.1456V4.42726H25.1003V2.94507Z" fill="#000001"/>
  <path d="M22.1456 28.0454H19.1909V29.5179H22.1456V28.0454Z" fill="#000001"/>
  <path d="M22.1456 1.47241H19.1909V2.94491H22.1456V1.47241Z" fill="#000001"/>
  <path d="M19.1909 29.5178H11.8091V31H19.1909V29.5178Z" fill="#000001"/>
  <path d="M19.1909 22.136H13.2913V23.6182H19.1909V22.136Z" fill="#000001"/>
  <path d="M19.1909 0H11.8091V1.4725H19.1909V0Z" fill="#000001"/>
  <path d="M13.2912 20.6633H11.8091V22.1358H13.2912V20.6633Z" fill="#000001"/>
  <path d="M11.8091 28.0454H8.85437V29.5179H11.8091V28.0454Z" fill="#000001"/>
  <path d="M11.8091 1.47241H8.85437V2.94491H11.8091V1.47241Z" fill="#000001"/>
  <path d="M8.85436 26.5632H5.90936V28.0454H8.85436V26.5632Z" fill="#000001"/>
  <path d="M8.85436 2.94507H5.90936V4.42726H8.85436V2.94507Z" fill="#000001"/>
  <path d="M5.90937 25.0906H4.42719V26.5631H5.90937V25.0906Z" fill="#000001"/>
  <path d="M5.90937 4.42725H4.42719V5.89975H5.90937V4.42725Z" fill="#000001"/>
  <path d="M4.42718 22.136H2.95468V25.0907H4.42718V22.136Z" fill="#000001"/>
  <path d="M2.95468 14.7542H4.42718V16.2364H5.90936V17.7089H11.8091V16.2364H13.2912V14.7542H14.7637V13.2817H17.7184V14.7542H19.1909V16.2364H20.6634V17.7089H26.5728V16.2364H28.0453V11.8092H29.5275V8.85449H28.0453V10.327H2.95468V8.85449H1.48218V11.8092H2.95468V14.7542Z" fill="#000001"/>
  <path d="M4.42718 5.89966H2.95468V8.85435H4.42718V5.89966Z" fill="#000001"/>
  <path d="M2.95468 19.1909H1.48218V22.1359H2.95468V19.1909Z" fill="#000001"/>
  <path d="M1.48219 11.8091H0V19.191H1.48219V11.8091Z" fill="#000001"/>
  </svg>
  
  // return (
  //   <img
  //     src={profileImageUrl}
  //     className="h-7 w-7 shrink-0 focus-visible:outline-0"
  //   />
  // );
}
