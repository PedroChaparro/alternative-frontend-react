import { FilesAction } from "@/hooks/user-files/filesReducer";
import { useFiles } from "@/hooks/user-files/useFiles";
import { File } from "@/types/entities";
import { ReactNode, createContext } from "react";

interface FilesContext {
  areFilesLoading: boolean;
  showing: "personal" | "shared";
  files: File[];
  filesDispatcher: React.Dispatch<FilesAction>;
}

const defaultValues: FilesContext = {
  areFilesLoading: false,
  showing: "personal",
  files: [],
  filesDispatcher: () => {
    console.log("hi");
  }
};

export const FilesContext = createContext<FilesContext>(defaultValues);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const { loading, showing, files, filesDispatcher } = useFiles();

  return (
    <FilesContext.Provider
      value={{
        areFilesLoading: loading,
        showing,
        files,
        filesDispatcher
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
