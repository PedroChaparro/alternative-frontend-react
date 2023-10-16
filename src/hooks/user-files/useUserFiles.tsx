import { AuthContext } from "@/context/AuthContext";
import { listFilesService } from "@/services/files/list-files.service";
import { File } from "@/types/entities";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const useUserFiles = () => {
  // Router state
  const navigate = useNavigate();
  const [params, _setParams] = useSearchParams();
  const directory = params.get("directory");

  // Session state
  const { session } = useContext(AuthContext);

  // User files state
  const [loading, setLoading] = useState(false);
  const [userFiles, setUserFiles] = useState<File[]>([]);

  // Get the user files when the directory changes
  useEffect(() => {
    const getFiles = async () => {
      setLoading(true);
      const { success, ...response } = await listFilesService({
        token: session?.token || "",
        directory
      });
      if (!success) {
        setLoading(false);
        toast.error(response.msg);
        navigate("/");
      }

      setUserFiles(response.files);
      setLoading(false);
    };

    getFiles();
  }, [directory]);

  return {
    loading,
    userFiles
  };
};
