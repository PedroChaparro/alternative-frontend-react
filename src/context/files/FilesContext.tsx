import { FilesAction } from "@/hooks/user-files/filesReducer";
import { useFiles } from "@/hooks/user-files/useFiles";
import { File } from "@/types/entities";
import { ReactNode, createContext } from "react";

interface FilesContext {
  areFilesLoading: boolean;
  userFiles: File[];
  userFilesDispatcher: React.Dispatch<FilesAction>;
}

const defaultValues: FilesContext = {
  areFilesLoading: false,
  userFiles: [],
  userFilesDispatcher: () => {
    console.log("hi");
  }
};

export const FilesContext = createContext<FilesContext>(defaultValues);

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const { loading, userFiles, userFilesDispatcher } = useFiles({
    filesToList: "user"
  });

  return (
    <FilesContext.Provider
      value={{
        areFilesLoading: loading,
        userFiles,
        userFilesDispatcher
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};
