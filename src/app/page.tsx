"use client";
import CropPanel from "@/components/CropPanel";
import SettingsPanel from "@/components/SettingsPanel";
import { Card } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRef } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

export default function Page() {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);
  console.log(settingsPanelRef);

  const expandPanel = () => {
    const panel = settingsPanelRef.current;
    if (panel?.isCollapsed()) {
      panel.expand();
    }
  };

  function handleDoubleClick() {
    const settingsPanel = settingsPanelRef.current;

    settingsPanel?.resize(50);
  }

  return (
    <main className="grid h-screen place-items-center">
      <Card className="motion-preset-focus h-[80vh] sm:w-[90vw] md:w-[90vw] xl:w-[85vw] 2xl:w-[75vw]">
        {/* <CardMenubar /> */}
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="w-full flex-grow-0">
            <CropPanel />
          </ResizablePanel>
          <ResizableHandle withHandle onDoubleClick={handleDoubleClick} />
          <ResizablePanel
            ref={settingsPanelRef}
            minSize={35}
            maxSize={60}
            onExpand={expandPanel}
            collapsible
          >
            <SettingsPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </main>
  );
}
