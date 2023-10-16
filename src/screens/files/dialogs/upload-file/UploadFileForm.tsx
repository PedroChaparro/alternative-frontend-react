import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { uploadFileService } from "@/services/files/upload-file.service";
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
