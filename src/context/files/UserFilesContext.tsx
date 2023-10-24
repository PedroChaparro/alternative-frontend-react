import { FilesAction } from "@/hooks/user-files/filesReducer";
import { useFiles } from "@/hooks/user-files/useFiles";
import { File } from "@/types/entities";
import { ReactNode, createContext } from "react";

interface UserFilesContext {
  areFilesLoading: boolean;
  userFiles: File[];
  userFilesDispatcher: React.Dispatch<FilesAction>;
}

const defaultValues: UserFilesContext = {
  areFilesLoading: false,
  userFiles: [],
  userFilesDispatcher: () => {
    console.log("hi");
  }
};

export const UserFilesContext = createContext<UserFilesContext>(defaultValues);

export const UserFilesProvider = ({ children }: { children: ReactNode }) => {
  const { loading, userFiles, userFilesDispatcher } = useFiles();

  return (
    <UserFilesContext.Provider
      value={{
        areFilesLoading: loading,
        userFiles,
        userFilesDispatcher
      }}
    >
      {children}
    </UserFilesContext.Provider>
  );
};
