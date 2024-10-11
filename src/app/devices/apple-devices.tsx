"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Model = {
  model: string;
  logicalWidth: number;
  logicalHeight: number;
};

export const columns: ColumnDef<Model>[] = [
  {
    accessorKey: "model",
    header: "model",
  },
  {
    accessorKey: "logicalWidth",
    header: "width",
  },
  {
    accessorKey: "logicalHeight",
    header: "height",
  },
];
