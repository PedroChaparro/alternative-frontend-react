import { PARAMETERS } from "@/config/parameters";
import {
  AuthContext,
  FilesContext,
  FilesDialogsContext,
  FoldersNavigationContext
} from "@/context/index";
import { FilesActionType } from "@/hooks/user-files/filesReducer";
import { downloadBlob } from "@/lib/utils";
import { downloadFileService } from "@/services/files/download-file.service";
import { getFileByUUIDService } from "@/services/files/get-file-by-uuid.service";
import { File } from "@/types/entities";
import { NavigationParams } from "@/types/enums";
import { FileText, FolderOpen } from "lucide-react";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

import { DropDown } from "./Dropdown";
import { FileCardSkeleton } from "./FileCardSkeleton";

const getFileIcon = (isFile: boolean) => {
  if (isFile) {
    return (
      <FileText
        className="flex text-primary"
        width={64}
        height={64}
        strokeWidth={1.25}
      />
    );
  } else {
    return (
      <FolderOpen
        className="flex text-primary"
        width={64}
        height={64}
        strokeWidth={1.25}
      />
    );
  }
};

export const FileCard = ({ file }: { file: File }) => {
  const { session } = useContext(AuthContext);

  const { pushToHistory } = useContext(FoldersNavigationContext);

  const { filesDispatcher } = useContext(FilesContext);
  const { dialogsOpenState } = useContext(FilesDialogsContext);

  const downloadFile = async () => {
    const request = {
      token: session?.token as string,
      fileUUID: file.uuid
    };

    try {
      const blob = await downloadFileService(request);
      const fileName = file.name;
      downloadBlob({ file: blob, fileName });
    } catch {
      toast.error("An error occurred while downloading the file");
    }
  };

  const handleDirectoryClick = () => {
    if (dialogsOpenState.MOVE_FILE) {
      pushToHistory(NavigationParams.MOVE_FILE, file.uuid);
    } else {
      pushToHistory(NavigationParams.DIRECTORY, file.uuid);
    }
  };

  useEffect(() => {
    if (file.isReady) {
      return;
    }

    let readyTries = 0;

    const checkIfFileIsReady = async (): Promise<boolean> => {
      const { success, ...res } = await getFileByUUIDService({
        fileUUID: file.uuid,
        token: session?.token as string
      });

      if (!success || !res.file) {
        readyTries++;
        return false;
      }

      filesDispatcher({
        type: FilesActionType.MARK_FILE_AS_READY,
        payload: res.file
      });

      return true;
    };

    // Check if the file is ready until the max tries is reached
    const interval = setInterval(() => {
      if (readyTries >= PARAMETERS.MAX_READY_CHECKS) {
        toast.error("Max ready checks reached");

        // Remove file from the UI
        filesDispatcher({
          type: FilesActionType.REMOVE_FILE,
          payload: file
        });

        // Stop trying to check if the file is ready
        clearInterval(interval);
        return;
      }

      checkIfFileIsReady().then((isReady) => {
        // Stop trying to check if the file is ready
        if (isReady) {
          clearInterval(interval);
        }
      });
    }, PARAMETERS.CHECK_IF_FILE_IS_READY_INTERVAL);

    // Clean the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderFile = () => {
    if (!file.isReady) {
      return <FileCardSkeleton />;
    }

    return (
      <article
        role="button"
        aria-label={`${file.name} card`}
        onClick={file.isFile ? downloadFile : handleDirectoryClick}
        className="relative flex w-52 cursor-pointer flex-col items-center space-y-2 rounded-md border bg-primary-foreground/25 p-4 shadow-none transition-colors hover:bg-primary-foreground/75 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {<DropDown file={file} />}
        {getFileIcon(file.isFile)}
        <span className="line-clamp-1 max-w-full text-lg font-semibold">
          {file.name}
        </span>
        {file.isFile && (
          <span className="line-clamp-1 max-w-full text-sm text-foreground/75">
            <span className="font-semibold">Size:</span> {file.size} KB
          </span>
        )}
      </article>
    );
  };

  return renderFile();
};
