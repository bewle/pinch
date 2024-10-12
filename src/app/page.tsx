"use client";
import CropPanel from "@/components/CropPanel";
import SettingsPanel from "@/components/SettingsPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChevronsLeft } from "lucide-react";
import { useRef, useState } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";

export default function Page() {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

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
          className="relative w-full flex-grow-0"
        >
          <CropPanel isSettingsPanelOpen={isSettingsPanelOpen} />
          <ChevronsLeft
            onClick={() => {
              settingsPanelRef.current?.expand();
              setIsSettingsPanelOpen(true);
            }}
            size={32}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-50 transition-all hover:-translate-x-2 hover:opacity-100"
            style={{
              display: isSettingsPanelOpen ? "none" : "block",
            }}
          />
        </ResizablePanel>
        <ResizableHandle
          withHandle={isSettingsPanelOpen}
          onDoubleClick={handleDoubleClick}
        />
        <ResizablePanel
          ref={settingsPanelRef}
          minSize={25}
          maxSize={55}
          onExpand={() => {
            expandPanel();
            setIsSettingsPanelOpen(true);
          }}
          onCollapse={() => {
            setIsSettingsPanelOpen(false);
          }}
          collapsible
        >
          <SettingsPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* </Card> */}
    </main>
  );
}
