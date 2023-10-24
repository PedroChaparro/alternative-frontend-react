import { AuthContext, FoldersNavigationContext } from "@/context/index";
import { listFilesService } from "@/services/files/list-files.service";
import { listSharedFilesService } from "@/services/files/list-shared-files.service";
import { NavigationParams } from "@/types/enums";
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { FilesActionType, filesReducer } from "./filesReducer";

interface useFileProps {
  filesToList: "user" | "shared";
}

export const useFiles = ({ filesToList }: useFileProps) => {
  // Router state
  const navigate = useNavigate();
  const { getParam } = useContext(FoldersNavigationContext);
  const directory = getParam(NavigationParams.DIRECTORY);

  // Session state
  const { session } = useContext(AuthContext);

  // User files state
  const shouldListSharedFiles = filesToList === "shared";
  const [loading, setLoading] = useState(false);
  const [userFiles, userFilesDispatcher] = useReducer(filesReducer, []);

  // Get the user files when the directory changes
  useEffect(() => {
    const getFiles = async () => {
      setLoading(true);

      let response;
      if (shouldListSharedFiles && !directory) {
        // If there is no directory, list all shared files
        response = await listSharedFilesService({
          token: session?.token as string
        });
      } else {
        // If there is a directory, navigate to it
        response = await listFilesService({
          token: session?.token as string,
          isListedFromSharedFiles: shouldListSharedFiles,
          directory
        });
      }

      const { success, ...res } = response;
      if (!success) {
        setLoading(false);
        toast.error(res.msg);
        navigate("/");
      }

      userFilesDispatcher({
        type: FilesActionType.SET_FILES,
        payload: res.files
      });
      setLoading(false);
    };

    getFiles();
  }, [directory]);

  return {
    loading,
    userFiles,
    userFilesDispatcher
  };
};
