import IconComponent from "@/components/common/genericIconComponent";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AddFolderButton } from "./add-folder-button";
import { UploadFolderButton } from "./upload-folder-button";

export const HeaderButtons = ({
  handleUploadFlowsToFolder,
  isUpdatingFolder,
  isPending,
  addNewFolder,
}: {
  handleUploadFlowsToFolder: () => void;
  isUpdatingFolder: boolean;
  isPending: boolean;
  addNewFolder: () => void;
}) => (
  <div className="flex shrink-0 items-center justify-between gap-2">
    <div>
      {/* <SidebarTrigger className="w-fit lg:hidden"> */}
        {/* <IconComponent name="PanelLeftClose" className="h-4 w-4" /> */}
      {/* </SidebarTrigger> */}
    </div>


    <div className="flex-1 text-sm  ">Folders</div>
    <div className="flex items-center gap-1">
      <UploadFolderButton
        onClick={handleUploadFlowsToFolder}
        disabled={isUpdatingFolder}
      />
      <AddFolderButton
        onClick={addNewFolder}
        disabled={isUpdatingFolder}
        loading={isPending}
      />
    </div>
  </div>
);
