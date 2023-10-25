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
import { AuthContext, FilesContext, FilesDialogsContext } from "@/context";
import { FilesActionType } from "@/hooks/user-files/filesReducer";
import { removeFileService } from "@/services/files/remove-file.service";
import { Dialogs } from "@/types/enums";
import { useContext } from "react";
import { toast } from "sonner";

export const RemoveFileDialog = () => {
  const { filesDispatcher } = useContext(FilesContext);
  const { session } = useContext(AuthContext);
  const { dialogsOpenState, selectedFile, updateDialogOpenState } =
    useContext(FilesDialogsContext);

  const dialogTitle = selectedFile?.isFile
    ? "Are you sure you want to remove this file?"
    : "Are you sure you want to remove this folder?";
  const dialogDescription = selectedFile?.isFile
    ? "This action cannot be undone."
    : "This action cannot be undone. All files and folders inside this folder will be removed.";

  const handleRemove = async () => {
    const { success, msg } = await removeFileService({
      fileUUID: selectedFile?.uuid as string,
      token: session?.token as string
    });

    if (!success) {
      toast.error(msg);
      return;
    }

    filesDispatcher({
      type: FilesActionType.REMOVE_FILE,
      payload: {
        uuid: selectedFile?.uuid as string
      }
    });
    toast.success(msg);
  };

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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
