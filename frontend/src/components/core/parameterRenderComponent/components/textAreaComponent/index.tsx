import { GRADIENT_CLASS } from "@/constants/constants";
import ComponentTextModal from "@/modals/textAreaModal";
import { useRef, useState } from "react";
import { cn } from "../../../../../utils/utils";
import IconComponent from "../../../../common/genericIconComponent";
import { Input } from "../../../../ui/input";
import { getPlaceholder } from "../../helpers/get-placeholder-disabled";
import { InputProps, TextAreaComponentType } from "../../types";
import { getIconName } from "../inputComponent/components/helpers/get-icon-name";

const inputClasses = {
  base: ({ isFocused, password }: { isFocused: boolean; password: boolean }) =>
    `w-full ${isFocused ? "" : "pr-3"} ${password ? "pr-16" : ""}`,
  editNode: "input-edit-node",
  normal: ({ isFocused }: { isFocused: boolean }) =>
    `primary-input ${isFocused ? "text-black" : "  "}`,
  disabled: "disabled-state",
  password: "password",
};

const externalLinkIconClasses = {
  gradient: ({
    disabled,
    editNode,
    password,
  }: {
    disabled: boolean;
    editNode: boolean;
    password: boolean;
  }) =>
    disabled || password
      ? ""
      : editNode
        ? "gradient-fade-input-edit-node"
        : "gradient-fade-input",
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
        ? "background-fade-input-edit-node"
        : "background-fade-input",
  icon: "icons-parameters-comp absolute right-3 h-4 w-4 shrink-0",
  editNodeTop: "top-[-1.4rem] h-5",
  normalTop: "top-[-2.1rem] h-7",
  iconTop: "top-[-1.7rem]",
};

export default function TextAreaComponent({
  value,
  disabled,
  handleOnNewValue,
  editNode = false,
  id = "",
  updateVisibility,
  password,
  placeholder,
  isToolMode = false,
}: InputProps<string, TextAreaComponentType>): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const getInputClassName = () => {
    // return cn(
    //   inputClasses.base({ isFocused, password: password! }),
    //   editNode ? inputClasses.editNode : inputClasses.normal({ isFocused }),
    //   disabled && inputClasses.disabled,
    //   password && !passwordVisible && "text-clip",
    //   isFocused && "pr-10",
    // );
    return cn(
      "primary-input"
    )
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnNewValue({ value: e.target.value });
  };

  const renderIcon = () => (
    <div>
      {!disabled && (
        <div
          className={cn(
            // externalLinkIconClasses.gradient({
            //   disabled,
            //   editNode,
            //   password: password!,
            // }),
            // editNode
            //   ? externalLinkIconClasses.editNodeTop
            //   : externalLinkIconClasses.normalTop,
            "gradient-fade-input"
          )}
          // style={{
          //   pointerEvents: "none",
          //   background: isFocused
          //     ? undefined
          //     : disabled
          //       ? ""
          //       : GRADIENT_CLASS,
          // }}
          aria-hidden="true"
        />
      )}

      <IconComponent
        dataTestId={`button_open_text_area_modal_${id}${editNode ? "_advanced" : ""}`}
        name={getIconName(disabled, "", "", false, isToolMode) || "Scan"}
        className={cn(
           "icons-parameters-comp absolute right-3 h-4 w-4 shrink-0 top-1/2 -translate-y-1/2 h-full",
          // "cursor-pointer",
          // externalLinkIconClasses.icon,
          // editNode
          //   ? externalLinkIconClasses.editNodeTop
          //   : externalLinkIconClasses.iconTop,
          // disabled
          //   ? ""
          //   : "text-foreground",
        )}
        onClick={() => {
          setPasswordVisible(!passwordVisible);
        }}
      />
    </div>
  );

  return (
    <div className={"relative w-full"}>
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        id={id}
        data-testid={id}
        value={disabled ? "" : value}
        onChange={handleInputChange}
        disabled={disabled}
        // className={getInputClassName()}
        placeholder={getPlaceholder(disabled, placeholder)}
        aria-label={disabled ? value : undefined}
        ref={inputRef}
        type={password ? (passwordVisible ? "text" : "password") : "text"}
      />

<ComponentTextModal
        changeVisibility={updateVisibility}
        value={value}
        setValue={(newValue) => handleOnNewValue({ value: newValue })}
        disabled={disabled}
      >{renderIcon()}
        {/* <div className="relative w-full">{renderIcon()}</div> */}
      </ComponentTextModal>
      {/* <ComponentTextModal
        changeVisibility={updateVisibility}
        value={value}
        setValue={(newValue) => handleOnNewValue({ value: newValue })}
        disabled={disabled}
      > */}
        
      {/* </ComponentTextModal> */}
   
      

    </div>
  );
}
