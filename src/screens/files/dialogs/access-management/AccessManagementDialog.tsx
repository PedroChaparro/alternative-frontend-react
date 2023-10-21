import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { AuthContext, FilesDialogsContext } from "@/context";
import { getSharedWithWhoService } from "@/services/files/get-shared-with-who.service";
import { Dialogs } from "@/types/enums";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { ShareFileForm } from "./ShareFileForm";
import { UsersWithAccessList } from "./users-with-access/UsersWithAccessList";

export const AccessManagementDialog = () => {
  const { session } = useContext(AuthContext);
  const { dialogsOpenState, updateDialogOpenState, selectedFile } =
    useContext(FilesDialogsContext);

  const [areUsersLoading, setAreUsersLoading] = useState<boolean>(false);
  const [usersWithAccess, setUsersWithAccess] = useState<string[]>([]);

  const removeUserFromSharedWithUI = (user: string) => {
    setUsersWithAccess(usersWithAccess.filter((username) => username !== user));
  };

  const addUserToSharedWithUI = (user: string) => {
    setUsersWithAccess([...usersWithAccess, user]);
  };

  useEffect(() => {
    async function fetchUsersWithAccess() {
      setAreUsersLoading(true);

      const { success, ...res } = await getSharedWithWhoService({
        token: session?.token as string,
        fileUUID: selectedFile?.uuid as string
      });

      if (!success) {
        setAreUsersLoading(false);
        toast.error(res.msg);
        return;
      }

      setUsersWithAccess(res.users);
      setAreUsersLoading(false);
    }

    fetchUsersWithAccess();
  }, []);

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
        <ShareFileForm shareCallback={addUserToSharedWithUI} />
        <UsersWithAccessList
          isLoading={areUsersLoading}
          usersWithAccess={usersWithAccess}
          unshareCallback={removeUserFromSharedWithUI}
        />
      </DialogContent>
    </Dialog>
  );
};
