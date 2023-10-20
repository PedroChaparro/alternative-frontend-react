import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FilesDialogsContext } from "@/context/index";
import { Dialogs } from "@/types/enums";
import { useContext } from "react";

import { RenameFileForm } from "./RenameFileForm";

export const RenameFileDialog = () => {
  const { dialogsOpenState, updateDialogOpenState } =
    useContext(FilesDialogsContext);

  return (
    <Dialog
      open={dialogsOpenState.RENAME_FILE}
      onOpenChange={(open: boolean) => {
        updateDialogOpenState(Dialogs.RENAME_FILE, open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename file</DialogTitle>
          <DialogDescription>
            Update the name of the file. Click on the rename button when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <RenameFileForm />
      </DialogContent>
    </Dialog>
  );
};
