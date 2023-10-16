import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { UserFilesContext } from "@/context/UserFilesContext";
import { UserFilesActionTypes } from "@/hooks/user-files/UserFilesReducer";
import { uploadFileService } from "@/services/files/upload-file.service";
import { File } from "@/types/entities";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const UploadFileForm = () => {
  // Auth state
  const { session } = useContext(AuthContext);

  // Params id
  const [params, _setParams] = useSearchParams();
  const directory = params.get("directory");

  // Files state
  const { userFilesDispatcher } = useContext(UserFilesContext);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setFiles(files);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check files are not empty
    if (!files) {
      toast.error("You must select at least one file to upload.");
      return;
    }

    // Check files are not more than 5
    if (files.length > 5) {
      toast.error("You can only upload 5 files at a time");
      return;
    }

    // Upload files
    uploadFiles();
  };

  const uploadFiles = async () => {
    // Upload all files at once
    const promises = Array.from(files!).map((file) => {
      return uploadFileService({
        file,
        token: session?.token || "",
        directory
      });
    });

    try {
      const filesUploadRes = await Promise.all(promises);
      filesUploadRes.forEach((res) => {
        const { success } = res;
        if (!success) {
          toast.error(res.msg);
          return;
        }

        // Add file to state
        const newFile: File = {
          // Known properties
          uuid: res.fileUUID,
          isReady: false,
          isFile: true,

          // Zero values
          name: "",
          size: 0
        };

        userFilesDispatcher({
          type: UserFilesActionTypes.ADD_FILE,
          payload: newFile
        });

        toast.success(res.msg);
      });
    } catch (error) {
      toast.error("There was an error uploading your files.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input type="file" multiple={true} onChange={handleInputChange} />
        <div className="mt-4 flex justify-end">
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </div>
  );
};
