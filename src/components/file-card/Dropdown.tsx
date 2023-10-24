"use client";

import { FilesDialogsContext } from "@/context/index";
import { File } from "@/types/entities";
import { Dialogs } from "@/types/enums";
import { Download, Key, MoreVertical, PenBox, Truck } from "lucide-react";
import { useContext } from "react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

export const DropDown = ({ file }: { file: File }) => {
  const { openDialog } = useContext(FilesDialogsContext);

  const getMenuOptions = () => {
    const sharedActions = (
      <>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            openDialog(Dialogs.RENAME_FILE, file);
          }}
        >
          <PenBox className="mr-2 h-4 w-4" />
          Rename {file.isFile ? "file" : "directory"}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            openDialog(Dialogs.MOVE_FILE, file);
          }}
        >
          <Truck className="mr-2 h-4 w-4" />
          Move {file.isFile ? "file" : "directory"}
        </DropdownMenuItem>
        {/*
          <DropdownMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove {file.isFile ? "file" : "directory"}
          </DropdownMenuItem>
        */}
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            openDialog(Dialogs.ACCESS_MANAGEMENT, file);
          }}
        >
          <Key className="mr-2 h-4 w-4" />
          Manage access
        </DropdownMenuItem>
      </>
    );

    if (file.isFile) {
      return (
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            Download file
          </DropdownMenuItem>
          {sharedActions}
        </DropdownMenuContent>
      );
    } else {
      return (
        <DropdownMenuContent className="w-48">
          {sharedActions}
        </DropdownMenuContent>
      );
    }
  };

  const options = getMenuOptions();

  return (
    options && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="absolute right-2 top-2 p-2"
            aria-label={`More options for ${file.name}`}
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        {getMenuOptions()}
      </DropdownMenu>
    )
  );
};
