import ForwardedIconComponent from "../../../../../../components/common/genericIconComponent";
import { Button } from "../../../../../../components/ui/button";

export default function DownloadButton({
  isHovered,
  handleDownload,
}: {
  isHovered: boolean;
  handleDownload: () => void;
}): JSX.Element | undefined {
  if (isHovered) {
    return (
      <div
        // className={`absolute right-1 top-1 text-sm font-bold text-foreground`}
      >
        <Button
          unstyled
          className="bg-transparent px-2 py-1 text-white"
          onClick={handleDownload}
        >
          <ForwardedIconComponent
            name="DownloadCloud"
            className="h-5 w-5 bg-transparent"
          />
        </Button>
      </div>
    );
  }
  return undefined;
}
