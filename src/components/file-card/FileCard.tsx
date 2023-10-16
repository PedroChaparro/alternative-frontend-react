import { File } from "@/types/entities";
import { FileText, FolderOpen } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { DropDown } from "./Dropdown";

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
  const [_params, setParams] = useSearchParams();

  const downloadFile = () => {
    console.log("Downloading file");
  };

  const navigateToFolder = () => {
    setParams({ directory: file.uuid });
  };

  return (
    <button
      className="relative flex w-52 cursor-pointer flex-col items-center space-y-2 rounded-md border bg-primary-foreground/25 p-4 shadow-none transition-colors hover:bg-primary-foreground/75 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={file.isFile ? downloadFile : navigateToFolder}
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
    </button>
  );
};
