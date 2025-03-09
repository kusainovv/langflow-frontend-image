import { useState } from "react";
import ForwardedIconComponent from "../../../../../../components/common/genericIconComponent";
import FileCard from "../../fileComponent/components/file-card";
import formatFileName from "../../fileComponent/utils/format-file-name";

export default function FileCardWrapper({
  index,
  path,
}: {
  index: number;
  path: { path: string; type: string; name: string } | string;
}) {
  const [show, setShow] = useState<boolean>(true);
  let name: string = "";
  let type: string = "";
  let pathString: string = "";
  if (typeof path === "string") {
    name = path.split("/").pop() || "";
    type = path.split(".").pop() || "";
    pathString = path;
  } else {
    name = path.name;
    type = path.type;
    pathString = path.path;
  }

  return (
    <div key={index} className="flex flex-col gap-px w-fit">
      <span
        onClick={() => setShow(!show)}
        className="flex items-center w-fit px-2 cursor-pointer gap-2 text-xs  bg-navy text-white"
      >
        {formatFileName(name, 50)}
        <ForwardedIconComponent name={show ? "ChevronDown" : "ChevronRight"} />
      </span>
      <FileCard
        showFile={show}
        fileName={name}
        fileType={type}
        path={pathString}
      />
    </div>
  );
}
