import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import { useFolderStore } from "@/stores/foldersStore";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCustomNavigate } from "@/customization/hooks/use-custom-navigate";
import { track } from "@/customization/utils/analytics";
import useAddFlow from "@/hooks/flows/use-add-flow";
import { Category } from "@/types/templates/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

type EmptyFolderProps = {
  setOpenModal: (open: boolean) => void;
};

export const EmptyFolder = ({ setOpenModal }: EmptyFolderProps) => {
  const folders = useFolderStore((state) => state.folders);

  const addFlow = useAddFlow();
  const navigate = useCustomNavigate();
  const { folderId } = useParams();
             

  return (
    <div className="m-0 flex w-full justify-center">
      <div className="absolute top-1/2 flex w-full -translate-y-1/2 flex-col items-center justify-center gap-2">
        <h3
          className="pt-5 font-w95fa text-2xl  "
          data-testid="mainpage_title"
        >
          {folders?.length > 1 ? "Empty folder" : "Start building"}
        </h3>
        <p className="pb-5 text-sm text-black">
          Begin with a template, or start from scratch.
        </p>
        <div className="m-auto">
        <Button
        
        variant="default"
        onClick={() => {
          // setOpenModal(true)
          addFlow().then((id) => {
            navigate(
              `/flow/${id}${folderId ? `/folder/${folderId}` : ""}`,
            );
          });
          track("New Flow Created", { template: "Blank Flow" });

        }}
        id="new-project-btn"
      >
        <ForwardedIconComponent
          name="plus"
          aria-hidden="true"
          className="h-4 w-4"
        />
        <span className="whitespace-nowrap  ">New Flow</span>
      </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyFolder;
