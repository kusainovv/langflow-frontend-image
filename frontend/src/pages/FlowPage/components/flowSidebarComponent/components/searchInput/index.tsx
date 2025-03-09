import { ForwardedIconComponent } from "@/components/common/genericIconComponent";
import { Input } from "@/components/ui/input";
import { memo } from "react";
import ShortcutDisplay from "../../../nodeToolbarComponent/shortcutDisplay";

export const SearchInput = memo(function SearchInput({
  searchInputRef,
  isInputFocused,
  search,
  handleInputFocus,
  handleInputBlur,
  handleInputChange,
}: {
  searchInputRef: React.RefObject<HTMLInputElement>;
  isInputFocused: boolean;
  search: string;
  handleInputFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleInputBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative w-full flex-1 bg-green-500">
      <ForwardedIconComponent
        name="Search"
        className="absolute inset-y-0 left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
      />
      <Input
        ref={searchInputRef}
        type="search"
        data-testid="sidebar-search-input"
        // className="w-full bg-white !pl-8 text-sm"
        placeholder=""
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="!pl-8"

        onChange={handleInputChange}
        value={search}
      />
      {!isInputFocused && search === "" && (
        <div className="pointer-events-none absolute inset-y-0 left-8 top-1/2 flex w-4/5 -translate-y-1/2 items-center justify-between gap-2 text-sm   ">
          Search{" "}
          <span>
            <ShortcutDisplay sidebar shortcut="/" />
          </span>
        </div>
      )}
    </div>
  );
});

SearchInput.displayName = "SearchInput";
