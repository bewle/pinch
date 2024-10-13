"use client";
import CropPanel from "@/components/CropPanel";
import ProcessingAlert from "@/components/ProcessingAlert";
import SettingsPanel from "@/components/SettingsPanel";
import SettingsPanelMobile from "@/components/SettingsPanelMobile";
import { useIsSettingsPanelOpen } from "@/lib/store/settings-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChevronsLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { type ImperativePanelHandle } from "react-resizable-panels";
import MediaQuery from "react-responsive";

export default function Page() {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);
  const { isOpen, setIsOpen } = useIsSettingsPanelOpen();

  const expandPanel = () => {
    const panel = settingsPanelRef.current;
    if (panel?.isCollapsed()) {
      panel.expand();
    }
  };

  const collapsePanel = () => {
    const panel = settingsPanelRef.current;
    if (!panel?.isCollapsed()) {
      panel?.collapse();
    }
  };

  function handleDoubleClick() {
    const settingsPanel = settingsPanelRef.current;
    settingsPanel?.resize(50);
  }

  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      expandPanel();
    } else {
      collapsePanel();
    }
  }, [isOpen]);

  return (
    <main
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className="motion-preset-fade-lg grid h-screen place-items-center"
    >
      <ProcessingAlert />
      {/* Desktop */}
      <MediaQuery minWidth={1226}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            onResize={(size) => console.log(size)}
            className="relative w-full flex-grow-0"
          >
            <CropPanel />
            <ChevronsLeft
              onClick={() => {
                settingsPanelRef.current?.expand();
                setIsOpen(true);
              }}
              size={32}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer opacity-50 transition-all hover:-translate-x-2 hover:opacity-100"
              style={{
                display: isOpen ? "none" : "block",
              }}
            />
          </ResizablePanel>
          <ResizableHandle
            withHandle={isOpen}
            onDoubleClick={handleDoubleClick}
          />
          <ResizablePanel
            ref={settingsPanelRef}
            minSize={25}
            maxSize={55}
            onExpand={() => {
              setIsOpen(true);
            }}
            onCollapse={() => {
              setIsOpen(false);
            }}
            collapsible
          >
            <SettingsPanel />
          </ResizablePanel>
        </ResizablePanelGroup>
      </MediaQuery>
      {/* Mobile */}
      <MediaQuery maxWidth={1226}>
        <SettingsPanelMobile />
      </MediaQuery>
    </main>
  );
}
