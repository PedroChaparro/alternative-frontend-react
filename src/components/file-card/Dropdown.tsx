"use client";

import { File } from "@/types/entities";
import {
  Download,
  Key,
  MoreVertical,
  Share2Icon,
  Trash2,
  Truck
} from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

const getMenuOptions = (isFile: boolean) => {
  const sharedActions = (
    <>
      <DropdownMenuItem>
        <Share2Icon className="mr-2 h-4 w-4" />
        Share {isFile ? "file" : "directory"}
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Key className="mr-2 h-4 w-4" />
        Manage access
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Truck className="mr-2 h-4 w-4" />
        Move {isFile ? "file" : "directory"}
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Trash2 className="mr-2 h-4 w-4" />
        Remove {isFile ? "file" : "directory"}
      </DropdownMenuItem>
    </>
  );

  if (isFile) {
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

export const DropDown = ({ file }: { file: File }) => {
  return (
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
      {getMenuOptions(file.isFile)}
    </DropdownMenu>
  );
};
