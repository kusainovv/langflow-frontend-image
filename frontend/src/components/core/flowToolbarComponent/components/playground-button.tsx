import ForwardedIconComponent from "@/components/common/genericIconComponent";
import ShadTooltip from "@/components/common/shadTooltipComponent";
import { Button } from "@/components/ui/button";
import IOModal from "@/modals/IOModal/new-modal";

const PlaygroundButton = ({ hasIO, open, setOpen, canvasOpen }) => {
  const PlayIcon = () => (
    <ForwardedIconComponent name="Play" className="h-4 w-4 transition-all text-black" />
  );

  const ButtonLabel = () => <span className="hidden md:block text-black">Playground</span>;

  const ActiveButton = () => (
    <Button
      data-testid="playground-btn-flow-io"
      className="playground-btn-flow-toolbar"
    >
      <PlayIcon />
      <ButtonLabel />
    </Button>
  );

  const DisabledButton = () => (
    <div
      className="playground-btn-flow-toolbar cursor-not-allowed    duration-150"
      data-testid="playground-btn-flow"
    >
      <PlayIcon />
      <ButtonLabel />
    </div>
  );

  return hasIO ? (
    <IOModal
      open={open}
      setOpen={setOpen}
      disable={!hasIO}
      canvasOpen={canvasOpen}
    >
      <ActiveButton />
    </IOModal>
  ) : (
    <ShadTooltip content="Add a Chat Input or Chat Output to use the playground">
      <div>
        <DisabledButton />
      </div>
    </ShadTooltip>
  );
};

export default PlaygroundButton;
