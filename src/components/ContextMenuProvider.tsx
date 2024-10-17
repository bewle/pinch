"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function ContextMenuProvider({
  children,
  hasImport = true,
  hasClear = true,
  hasPreview = true,
  hasDownload = true,
}: {
  children: React.ReactNode;
  hasImport?: boolean;
  hasClear?: boolean;
  hasPreview?: boolean;
  hasDownload?: boolean;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        {hasImport ? <ContextMenuItem>import</ContextMenuItem> : null}
        {hasClear ? <ContextMenuItem>clear</ContextMenuItem> : null}
        {hasPreview ? <ContextMenuItem>preview</ContextMenuItem> : null}
        {hasDownload ? <ContextMenuItem>download</ContextMenuItem> : null}
      </ContextMenuContent>
    </ContextMenu>
  );
}
