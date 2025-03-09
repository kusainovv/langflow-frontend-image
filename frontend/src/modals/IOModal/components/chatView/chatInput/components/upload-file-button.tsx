import ShadTooltip from "@/components/common/shadTooltipComponent";
import ForwardedIconComponent from "../../../../../../components/common/genericIconComponent";
import { Button } from "../../../../../../components/ui/button";

const UploadFileButton = ({
  fileInputRef,
  handleFileChange,
  handleButtonClick,
  isBuilding,
}) => {
  return (
    <ShadTooltip
      styleClasses="z-50"
      side="right"
      content="Attach image (png, jpg, jpeg)"
    >
      <Button disabled={isBuilding}>
        <input
          disabled={isBuilding}
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div
          className={`flex items-center justify-center font-bold transition-all ${
            isBuilding
              ? "cursor-not-allowed"
              : "   hover:text-black"
          } p-0`}
          onClick={handleButtonClick}
          
        >
          <ForwardedIconComponent className="h-[6px] w-[6px]" name="Image" />
        </div>
      </Button>
    </ShadTooltip>
  );
};

export default UploadFileButton;
