import ForwardedIconComponent from "../../../../../../components/common/genericIconComponent";

const GeneralPageHeaderComponent = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between gap-4 space-y-0.5">
        <div className="flex w-full flex-col">
          <h2 className="flex items-center text-lg   tracking-tight">
            General
            <ForwardedIconComponent
              name="SlidersHorizontal"
              className="ml-2 h-5 w-5 text-black"
            />
          </h2>
          <p className="text-sm   ">
            Manage settings and your account.
          </p>
        </div>
      </div>
    </>
  );
};
export default GeneralPageHeaderComponent;
