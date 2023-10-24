import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AuthContext,
  FilesContext,
  FoldersNavigationContext
} from "@/context/index";
import { FilesActionType } from "@/hooks/user-files/filesReducer";
import { uploadFileService } from "@/services/files/upload-file.service";
import { File } from "@/types/entities";
import { NavigationParams } from "@/types/enums";
import { useContext, useState } from "react";
import { toast } from "sonner";

interface UploadFileFormProps {
  closeDialogCallback: () => void;
}

export const UploadFileForm = ({
  closeDialogCallback
}: UploadFileFormProps) => {
  // Auth state
  const { session } = useContext(AuthContext);

  // Params id
  const { getParam } = useContext(FoldersNavigationContext);
  const directory = getParam(NavigationParams.DIRECTORY);

  // Files state
  const { filesDispatcher } = useContext(FilesContext);
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
        token: session?.token as string,
        directory
      });
    });

    try {
      const filesUploadRes = await Promise.all(promises);
      closeDialogCallback();

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
          isOwnedByUser: true,

          // Zero values
          name: "",
          size: 0
        };

        filesDispatcher({
          type: FilesActionType.ADD_FILE,
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
        <Input
          type="file"
          multiple={true}
          onChange={handleInputChange}
          aria-label="Choose files to upload"
        />
        <div className="mt-4 flex justify-end">
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </div>
  );
};
