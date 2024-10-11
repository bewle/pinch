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
import { type ImperativePanelHandle } from "react-resizable-panels";

export default function Page() {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);

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
      {/* <Card className="motion-preset-focus h-[80vh] w-[95vw] lg:w-full"> */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          onResize={(size) => console.log(size)}
          className="w-full flex-grow-0"
        >
          <CropPanel />
        </ResizablePanel>
        <ResizableHandle withHandle onDoubleClick={handleDoubleClick} />
        <ResizablePanel
          ref={settingsPanelRef}
          minSize={25}
          maxSize={55}
          onExpand={expandPanel}
          collapsible
        >
          <SettingsPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* </Card> */}
    </main>
  );
}
