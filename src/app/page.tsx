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
import ImageInputProvider from "@/components/ImageInputProvider";
import { useViewStore } from "@/lib/store/view";
import SplitViewPreview from "@/components/SplitViewPreview";

export default function Page() {
  const settingsPanelRef = useRef<ImperativePanelHandle>(null);
  const { isOpen, setIsOpen } = useIsSettingsPanelOpen();
  const { view, setView } = useViewStore();
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
      className="motion-preset-fade-lg h-screen"
    >
      <ProcessingAlert />
      <ImageInputProvider />
      {/* Desktop */}
      <MediaQuery minWidth={1226}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="relative w-full flex-grow-0">
            <div
              className={`grid h-full w-full ${
                view === "split" ? "grid-cols-2" : ""
              }`}
            >
              <CropPanel />
              {view === "split" ? <SplitViewPreview /> : null}
            </div>
            <ChevronsLeft
              onClick={() => {
                settingsPanelRef.current?.expand();
                setIsOpen(true);
                setView("");
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
              setView("fullscreen");
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
