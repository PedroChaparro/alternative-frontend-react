import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { FilesDialogsContext } from "@/context";
import { Dialogs } from "@/types/enums";
import { useContext } from "react";

export const RemoveFileDialog = () => {
  const { dialogsOpenState, selectedFile, updateDialogOpenState } =
    useContext(FilesDialogsContext);

  const dialogTitle = selectedFile?.isFile
    ? "Are you sure you want to remove this file?"
    : "Are you sure you want to remove this folder?";
  const dialogDescription = selectedFile?.isFile
    ? "This action cannot be undone."
    : "This action cannot be undone. All files and folders inside this folder will be removed.";

  return (
    <AlertDialog
      open={dialogsOpenState.REMOVE_FILE}
      onOpenChange={(open) => updateDialogOpenState(Dialogs.REMOVE_FILE, open)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => console.log("Close")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => console.log("Remove")}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
