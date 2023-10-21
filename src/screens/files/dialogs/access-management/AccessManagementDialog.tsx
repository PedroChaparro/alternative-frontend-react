import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FilesDialogsContext } from "@/context";
import { Dialogs } from "@/types/enums";
import { useContext } from "react";

import { ShareFileForm } from "./ShareFileForm";
import { UsersWithAccessList } from "./users-with-access/UsersWithAccessList";

export const AccessManagementDialog = () => {
  const { dialogsOpenState, updateDialogOpenState } =
    useContext(FilesDialogsContext);

  return (
    <Dialog
      open={dialogsOpenState[Dialogs.ACCESS_MANAGEMENT]}
      onOpenChange={(open: boolean) => {
        updateDialogOpenState(Dialogs.ACCESS_MANAGEMENT, open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage access</DialogTitle>
        </DialogHeader>
        <ShareFileForm />
        <UsersWithAccessList />
      </DialogContent>
    </Dialog>
  );
};
