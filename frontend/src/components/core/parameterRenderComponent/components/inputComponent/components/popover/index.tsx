import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverContentWithoutPortal,
} from "@/components/ui/popover";
import { cn } from "@/utils/utils";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";

const OptionBadge = ({
  option,
  onRemove,
  variant = "emerald",
  className = "",
}: {
  option: string;
  variant?:
    | "default"
    | "emerald"
    | "gray"
    | "secondary"
    | "destructive"
    | "outline"
    | "secondaryStatic"
    | "pinkStatic"
    | "successStatic"
    | "errorStatic";
  className?: string;
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return <Badge
    variant={
      variant as
        | "default"
        | "emerald"
        | "gray"
        | "secondary"
        | "destructive"
        | "outline"
        | "secondaryStatic"
        | "pinkStatic"
        | "successStatic"
        | "errorStatic"
    }
    className={cn("flex items-center gap-1 truncate border-none shadow-button", className)}
  >
    <div className="truncate">{option}</div>
    <X
      className="h-3 w-3 cursor-pointer bg-transparent"
      onClick={(e) =>
        onRemove(e as unknown as React.MouseEvent<HTMLButtonElement>)
      }
      data-testid="remove-icon-badge"
    />
  </Badge>
}


const CommandItemContent = ({
  option,
  isSelected,
  optionButton,
}: {
  option: string;
  isSelected: boolean;
  optionButton: (option: string) => ReactNode;
}) => (
  <div className="group flex w-full items-center justify-between">
    <div className="flex items-center justify-between">
      <SelectionIndicator isSelected={isSelected} />
      <span className="max-w-52 truncate pr-2">{option}</span>
    </div>
    {optionButton && optionButton(option)}
  </div>
);

const SelectionIndicator = ({ isSelected }: { isSelected: boolean }) => (
  <div
    className={cn(
      "relative mr-2 h-4 w-4",
      isSelected ? "opacity-100" : "opacity-0",
    )}
  >
    <div className="absolute opacity-100 transition-all group-hover:opacity-0">
      <ForwardedIconComponent
        name="Check"
        className="mr-2 h-4 w-4 text-black"
        aria-hidden="true"
      />
    </div>
    <div className="absolute opacity-0 transition-all group-hover:opacity-100">
      <ForwardedIconComponent
        name="X"
        className="mr-2 h-4 w-4 text-status-red"
        aria-hidden="true"
      />
    </div>
  </div>
);

const getInputClassName = (
  editNode: boolean,
  disabled: boolean,
  password: boolean,
  selectedOptions: string[],
) => {
  return cn(
    "popover-input nodrag w-full truncate px-1 pr-4 min-h-[36px]",
    editNode && "px-2",
    editNode && disabled && "h-fit w-fit",
    disabled &&
      "disabled:   disabled:opacity-100 placeholder:disabled:  ",
    password && "text-clip pr-14",
    selectedOptions?.length >= 0 && "cursor-default",
  );
};

const getAnchorClassName = (
  editNode: boolean,
  disabled: boolean,
  isFocused: boolean,
) => {
  return cn(
    "primary-input noflow nopan nodelete nodrag flex h-full cursor-default flex-wrap items-center px-2 ",
    editNode && "min-h-7 p-0 pl-4",
    editNode && disabled && "min-h-5",
    disabled && "    ",
    isFocused &&
      "ring-1 ring-foreground hover:border-foreground",
    "min-h-[36px] py-0"
  );
};

const CustomInputPopover = ({
  id,
  refInput,
  onInputLostFocus,
  selectedOption,
  setSelectedOption,
  selectedOptions,
  setSelectedOptions,
  value,
  disabled,
  setShowOptions,
  required,
  password,
  pwdVisible,
  editNode,
  placeholder,
  onChange,
  blurOnEnter,
  options,
  optionsPlaceholder,
  optionsButton,
  handleKeyDown,
  showOptions,
  nodeStyle,
  optionButton,
  autoFocus,
  popoverWidth,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const memoizedOptions = useMemo(() => new Set<string>(options), [options]);

  const PopoverContentInput = editNode
    ? PopoverContent
    : PopoverContentWithoutPortal;

  const handleRemoveOption = (
    optionToRemove: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (setSelectedOptions) {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== optionToRemove),
      );
    } else if (setSelectedOption) {
      setSelectedOption("");
    }
  };

  const handleOptionSelect = (currentValue: string) => {
    if (setSelectedOption) {
      setSelectedOption(currentValue === selectedOption ? "" : currentValue);
    }
    if (setSelectedOptions) {
      setSelectedOptions(
        selectedOptions?.includes(currentValue)
          ? selectedOptions.filter((item) => item !== currentValue)
          : [...(selectedOptions || []), currentValue],
      );
    }
    !setSelectedOptions && setShowOptions(false);
  };

  return (
    <Popover modal open={showOptions} onOpenChange={setShowOptions}>
      <PopoverAnchor>
        <div
          data-testid={`anchor-${id}`}
          className={getAnchorClassName(editNode, disabled, isFocused)}
          onClick={() => !nodeStyle && !disabled && setShowOptions(true)}
        >
          {selectedOptions?.length > 0 ? (
            <div className="mr-5 flex flex-wrap gap-2">
              {selectedOptions.map((option) => (
                <OptionBadge
                  key={option}
                  option={option}
                  onRemove={(e) => handleRemoveOption(option, e)}
                  className="p-1 font-w95fa"
                />
              ))}
            </div>
          ) : selectedOption?.length > 0 ? (
            <OptionBadge
              option={selectedOption}
              onRemove={(e) => handleRemoveOption(selectedOption, e)}
              variant={nodeStyle ? "emerald" : "secondary"}
              className={cn(
                editNode && "text-xs",
                nodeStyle ? "px-1 font-w95fa" : " ",
              )}
            />
          ) : null}

          {!selectedOption?.length && !selectedOptions?.length && (
            <input
              autoComplete="off"
              onFocus={() => setIsFocused(true)}
              autoFocus={autoFocus}
              id={id}
              ref={refInput}
              type={!pwdVisible && password ? "password" : "text"}
              onBlur={() => {
                onInputLostFocus?.();
                setIsFocused(false);
              }}
              value={value || ""}
              disabled={disabled}
              required={required}
              // className={getInputClassName(
              //   editNode,
              //   disabled,
              //   password,
              //   selectedOptions,
              // )}
              placeholder={
                selectedOptions?.length > 0 || selectedOption ? "" : placeholder
              }
              onChange={(e) => onChange?.(e.target.value)}
              onKeyDown={(e) => {
                handleKeyDown?.(e);
                if (blurOnEnter && e.key === "Enter") refInput.current?.blur();
              }}
              data-testid={editNode ? id + "-edit" : id}
            />
          )}
        </div>
      </PopoverAnchor>

      <PopoverContentInput
        className="noflow nowheel nopan nodelete nodrag p-0"
        style={{
          minWidth: refInput?.current?.clientWidth ?? "200px",
          width: popoverWidth ?? null,
        }}
        side="bottom"
        align="start"
      >
        <Command
          filter={(value, search) => {
            if (
              value.toLowerCase().includes(search.toLowerCase()) ||
              value.includes("doNotFilter-")
            )
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={optionsPlaceholder} />
          <CommandList>
            <CommandGroup>
              {Array.from(memoizedOptions).map((option, id) => (
                <CommandItem
                  key={option + id}
                  value={option}
                  onSelect={handleOptionSelect}
                  className="group"
                >
                  <CommandItemContent
                    option={option}
                    isSelected={
                      selectedOption === option ||
                      selectedOptions?.includes(option)
                    }
                    optionButton={optionButton}
                  />
                </CommandItem>
              ))}
              {optionsButton}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContentInput>
    </Popover>
  );
};

export default CustomInputPopover;
