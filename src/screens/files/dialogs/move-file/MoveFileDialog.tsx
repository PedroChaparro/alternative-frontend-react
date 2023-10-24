import { FilesGrid } from "@/components/files-grid/FilesGrid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";
import {
  AuthContext,
  FilesContext,
  FilesDialogsContext,
  FoldersNavigationContext
} from "@/context/index";
import { FilesActionType } from "@/hooks/user-files/filesReducer";
import { listFilesService } from "@/services/files/list-files.service";
import { moveFileService } from "@/services/files/move-file.service";
import { File } from "@/types/entities";
import { Dialogs, NavigationParams } from "@/types/enums";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const MoveFileDialog = () => {
  // Session state
  const { session } = useContext(AuthContext);

  // Files state
  const { userFilesDispatcher } = useContext(FilesContext);

  // Navigation state
  const { clearHistory, getParam } = useContext(FoldersNavigationContext);
  const moveTo = getParam(NavigationParams.MOVE_FILE);

  // Dialog states
  const { selectedFile, dialogsOpenState, updateDialogOpenState, closeDialog } =
    useContext(FilesDialogsContext);
  const [folders, setFolders] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [moving, setMoving] = useState(false);

  // Get folders when the query param changes
  useEffect(() => {
    const getUserFolders = async () => {
      setLoading(true);

      const { success, ...res } = await listFilesService({
        directory: moveTo,
        token: session?.token as string
      });

      if (!success) {
        toast.error(res.msg);
        closeDialog(Dialogs.MOVE_FILE);
      }

      setFolders(res.files.filter((file) => !file.isFile));
      setLoading(false);
    };

    getUserFolders();
  }, [moveTo]);

  if (!selectedFile) return null;

  const moveFile = async () => {
    if (moving) return;

    setMoving(true);
    const { success, ...res } = await moveFileService({
      directoryUUID: moveTo,
      fileUUID: selectedFile.uuid,
      token: session?.token as string
    });

    if (!success) {
      toast.error(res.msg);
      setMoving(false);
      return;
    }

    setMoving(false);
    toast.success("The file has been moved successfully");
    closeDialog(Dialogs.MOVE_FILE);

    // Remove the file from the ui
    userFilesDispatcher({
      type: FilesActionType.REMOVE_FILE,
      payload: { uuid: selectedFile.uuid }
    });
  };

  return (
    <Dialog
      open={dialogsOpenState.MOVE_FILE}
      onOpenChange={(state) => {
        if (!state) {
          clearHistory(NavigationParams.MOVE_FILE);
          return closeDialog(Dialogs.MOVE_FILE);
        }

        updateDialogOpenState(Dialogs.MOVE_FILE, true);
      }}
    >
      <DialogContent className="max-h-[75vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Move {selectedFile.isFile ? "file" : "directory"}
          </DialogTitle>
          <DialogDescription>
            Navigate to the directory you want to move the file by clicking on
            the folders. Click on the move here button when you're done.
          </DialogDescription>
        </DialogHeader>
        <FilesGrid isInMovingMode={true} areLoading={loading} files={folders} />
        <DialogFooter>
          <Button onClick={moveFile}>
            {moving && <Loader2 className="mr-2 animate-spin" />}
            Move here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
