import { FilesAction } from "@/hooks/user-files/filesReducer";
import { useFiles } from "@/hooks/user-files/useFiles";
import { File } from "@/types/entities";
import { ReactNode, createContext } from "react";

interface FilesContext {
  areFilesLoading: boolean;
  files: File[];
  filesDispatcher: React.Dispatch<FilesAction>;
}

const defaultValues: FilesContext = {
  areFilesLoading: false,
  files: [],
  filesDispatcher: () => {
    console.log("hi");
  }
};

export const FilesContext = createContext<FilesContext>(defaultValues);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const { loading, files, filesDispatcher } = useFiles();

  return (
    <FilesContext.Provider
      value={{
        areFilesLoading: loading,
        files,
        filesDispatcher
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
