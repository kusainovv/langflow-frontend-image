import IconComponent from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
import { Button } from "@/components/ui/button";

export const UploadFolderButton = ({ onClick, disabled }) => (
  <ShadTooltip content="Upload a flow" styleClasses="z-50">
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 border-0 text-zinc-500"
      onClick={onClick}
      data-testid="upload-folder-button"
      disabled={disabled}
    >
      <IconComponent name="Upload" className="h-4 w-4" />
    </Button>
  </ShadTooltip>
);
