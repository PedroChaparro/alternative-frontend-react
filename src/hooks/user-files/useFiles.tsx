import { AuthContext, FoldersNavigationContext } from "@/context/index";
import { listFilesService } from "@/services/files/list-files.service";
import { NavigationParams } from "@/types/enums";
import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { FilesActionType, filesReducer } from "./filesReducer";

export const useFiles = () => {
  // Router state
  const navigate = useNavigate();
  const { getParam } = useContext(FoldersNavigationContext);
  const directory = getParam(NavigationParams.DIRECTORY);

  // Session state
  const { session } = useContext(AuthContext);

  // User files state
  const [loading, setLoading] = useState(false);
  const [userFiles, userFilesDispatcher] = useReducer(filesReducer, []);

  // Get the user files when the directory changes
  useEffect(() => {
    const getFiles = async () => {
      setLoading(true);
      const { success, ...response } = await listFilesService({
        token: session?.token as string,
        directory
      });
      if (!success) {
        setLoading(false);
        toast.error(response.msg);
        navigate("/");
      }

      userFilesDispatcher({
        type: FilesActionType.SET_FILES,
        payload: response.files
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
