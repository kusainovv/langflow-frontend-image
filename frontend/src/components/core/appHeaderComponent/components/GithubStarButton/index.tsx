import ShadTooltip from "@/components/common/shadTooltipComponent";
// import { useDarkStore } from "@/stores/darkStore";
import { FaGithub } from "react-icons/fa";

export const GithubStarComponent = () => {
  // const stars: number | undefined = useDarkStore((state) => state.stars);

  return (
    <ShadTooltip content="Go to Github repo" side="bottom" styleClasses="z-10">
      <div className="group inline-flex h-8 items-center justify-center gap-1 border px-2 pr-0 hover:border-input">
        <FaGithub className="h-4 w-4" />
        <div className="hidden text-xs   lg:block">Star</div>
        <div className="-mr-px ml-1 flex h-8 items-center justify-center     border bg-silver px-2 text-xs   text-black group-hover:border-input">
          {/* {stars?.toLocaleString() ?? 0} */}
        </div>
      </div>
    </ShadTooltip>
  );
};

export default GithubStarComponent;
