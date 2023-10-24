import { AuthContext, FoldersNavigationContext } from "@/context";
import { listFilesService } from "@/services/files/list-files.service";
import { listSharedFilesService } from "@/services/files/list-shared-files.service";
import { File } from "@/types/entities";
import { NavigationParams } from "@/types/enums";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSharedFiles = () => {
  // Router state
  const navigate = useNavigate();
  const { getParam } = useContext(FoldersNavigationContext);
  const directory = getParam(NavigationParams.DIRECTORY);

  // Session state
  const { session } = useContext(AuthContext);

  // Shared files state
  const [loading, setLoading] = useState(false);
  const [sharedFiles, setSharedFiles] = useState<File[]>([]);

  useEffect(() => {
    const getSharedFiles = async () => {
      setLoading(true);

      let response;
      if (!directory) {
        // If there is no directory, list all shared files
        response = await listSharedFilesService({
          token: session?.token as string
        });
      } else {
        // If there is a directory, navigate to it
        response = await listFilesService({
          token: session?.token as string,
          isListedFromSharedFiles: true,
          directory
        });
      }

      const { success, ...resp } = response;
      if (!success) {
        setLoading(false);
        toast.error(resp.msg);
        navigate("/");
      }

      setSharedFiles(resp.files);
      setLoading(false);
    };

    getSharedFiles();
  }, [directory]);

  return {
    loading,
    sharedFiles
  };
};
