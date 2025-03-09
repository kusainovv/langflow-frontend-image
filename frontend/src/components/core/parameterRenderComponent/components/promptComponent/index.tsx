import { GRADIENT_CLASS } from "@/constants/constants";
import PromptModal from "@/modals/promptModal";
import { cn } from "../../../../../utils/utils";
import IconComponent from "../../../../common/genericIconComponent";
import { Button } from "../../../../ui/button";
import { getPlaceholder } from "../../helpers/get-placeholder-disabled";
import { InputProps, PromptAreaComponentType } from "../../types";
import { Input } from "@/components/ui/input";

const promptContentClasses = {
  base: "overflow-hidden text-clip whitespace-nowrap",
  editNode: "input-edit-node input-dialog",
  normal: "primary-input   ",
  disabled: "",
};

const externalLinkIconClasses = {
  gradient: ({
    disabled,
    editNode,
  }: {
    disabled: boolean;
    editNode: boolean;
  }) =>
    disabled
      ? ""
      : editNode
        ? "gradient-fade-input-edit-node" // gradient-fade-input-edit-node
        : "gradient-fade-input", // gradient-fade-input
  background: ({
    disabled,
    editNode,
  }: {
    disabled: boolean;
    editNode: boolean;
  }) =>
    disabled
      ? ""
      : editNode
        ? "background-fade-input-edit-node "
        : "background-fade-input",
  icon: "icons-parameters-comp absolute right-3 h-4 w-4 shrink-0",
  // editNodeTop: "top-[0.375rem]",
  normalTop: "top-0",
};

export default function PromptAreaComponent({
  field_name,
  nodeClass,
  handleOnNewValue,
  handleNodeClass,
  value,
  disabled,
  editNode = false,
  id = "",
  readonly = false,
}: InputProps<string, PromptAreaComponentType>): JSX.Element {
  const renderPromptText = () => (
    <Input
      id={id}
      data-testid={id}
      className={cn(
        "primary-input"
        // promptContentClasses.base,
        // editNode ? promptContentClasses.editNode : promptContentClasses.normal,
        // disabled && !editNode && promptContentClasses.disabled,
      )}
      placeholder={value !== ""
        ? value
        : getPlaceholder(disabled, "Type your prompt here...")}
    />
  );

  const renderExternalLinkIcon = () => (
    <>
      <div
        className={cn(
          // ""
          // externalLinkIconClasses.gradient({ disabled, editNode }),
          // "top-1/2 stroke-[1.5] -translate-y-1/2 h-full"
          // editNode
          "gradient-fade-input"
          //   ? "" // externalLinkIconClasses.editNodeTop
          //   : externalLinkIconClasses.normalTop,
        )}
        style={{
          // pointerEvents: "none",
          // background: disabled ? "" : GRADIENT_CLASS,
        }}
        aria-hidden="true"
      />
      {/* <div
        className={cn(
          "absolute top-0 right-0 w-1/4 h-full",
          externalLinkIconClasses.icon,
          "absolute top-0 right-0 w-1/4 h-full gradient-fade-input",
        )}
        aria-hidden="true"
      /> */}
      <IconComponent
        name={disabled ? "lock" : "Scan"}
        className={cn(
          "icons-parameters-comp absolute right-3 h-4 w-4 shrink-0 top-1/2 -translate-y-1/2 h-full",
        )}
      />
    </>
  );

  return (
    <div className={cn("w-full", disabled && "pointer-events-none", )}>
      <PromptModal
        id={id}
        field_name={field_name}
        readonly={readonly}
        value={value}
        setValue={(newValue) => handleOnNewValue({ value: newValue })}
        nodeClass={nodeClass}
        setNodeClass={handleNodeClass}
      >
        <div className="relative w-full ">
          {/* <Input placeholder={`${renderPromptText()}`} /> */}
          {renderPromptText()}
          {renderExternalLinkIcon()}
        </div>
        {/* <Button
          unstyled
          className="w-full"
          data-testid="button_open_prompt_modal"
        >
          <div className="relative w-full">
            {renderPromptText()}
            {renderExternalLinkIcon()}
          </div>
        </Button> */}
      </PromptModal>
    </div>
  );
}
