import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import BaseModal from "../../../../modals/baseModal";
import SwitchOutputView from "./components/switchOutputView";

export default function OutputModal({
  nodeId,
  outputName,
  children,
  disabled,
}): JSX.Element {
  const [activeTab, setActiveTab] = useState<"Outputs" | "Logs">("Outputs");
  return (
    <BaseModal disable={disabled} size="large">
      <BaseModal.Header description="Inspect the output of the component below.">
        <div className="w-full flex justify-between">
          <div className="flex items-center">
            <span className="pr-2">Component Output</span>
          </div>
        </div>

        <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "Outputs" | "Logs")}
            className={
              "flex flex-col self-center"
            }
          >
            <TabsList>
              <TabsTrigger className="bg-white shadow-button" value="Outputs">Outputs</TabsTrigger>
              <TabsTrigger className="bg-white shadow-button" value="Logs">Logs</TabsTrigger>
            </TabsList>
          </Tabs>
      </BaseModal.Header>
      
      <BaseModal.Content>
        <SwitchOutputView
          nodeId={nodeId}
          outputName={outputName}
          type={activeTab}
        />
      </BaseModal.Content>
      <BaseModal.Footer close></BaseModal.Footer>
      <BaseModal.Trigger asChild>{children}</BaseModal.Trigger>
    </BaseModal>
  );
}
