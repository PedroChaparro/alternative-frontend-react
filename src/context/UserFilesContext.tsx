import { useUserFiles } from "@/hooks/user-files/useUserFiles";
import { File } from "@/types/entities";
import { ReactNode, createContext } from "react";

interface UserFilesContext {
  areFilesLoading: boolean;
  userFiles: File[];
}

const defaultValues: UserFilesContext = {
  areFilesLoading: false,
  userFiles: []
};

export const UserFilesContext = createContext<UserFilesContext>(defaultValues);

export const UserFilesProvider = ({ children }: { children: ReactNode }) => {
  const { loading, userFiles } = useUserFiles();

  return (
    <UserFilesContext.Provider
      value={{
        areFilesLoading: loading,
        userFiles
      }}
    >
      {children}
    </UserFilesContext.Provider>
  );
};
