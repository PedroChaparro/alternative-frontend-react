import { Button } from "@/components/ui/button";
import { AuthContext, FilesDialogsContext } from "@/context";
import { unshareFileService } from "@/services/files/unshare-file.service";
import { useContext } from "react";
import { toast } from "sonner";

interface UserWithAccessRowProps {
  user: string;
  unshareCallback: (username: string) => void;
}

export const UserWithAccessRow = ({
  user,
  unshareCallback
}: UserWithAccessRowProps) => {
  const { session } = useContext(AuthContext);
  const { selectedFile } = useContext(FilesDialogsContext);

  const handleUnshare = async (userName: string) => {
    const unShareRequest = {
      token: session?.token as string,
      fileUUID: selectedFile?.uuid as string,
      otherUsername: userName
    };

    const { success, msg } = await unshareFileService(unShareRequest);
    if (!success) {
      toast.error(msg);
      return;
    }

    toast.success(msg);
    unshareCallback(userName);
  };

  return (
    <div
      key={user}
      className="flex flex-row items-center justify-between gap-x-2 rounded-md p-2 transition-colors hover:bg-muted"
    >
      <span className="max-w-[50%] truncate">{user}</span>
      <Button
        variant={"destructive"}
        aria-label={`Un-share with ${user}`}
        onClick={() => handleUnshare(user)}
      >
        Un-share
      </Button>
    </div>
  );
};
