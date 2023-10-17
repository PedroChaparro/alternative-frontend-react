import { UserFilesAction } from "@/hooks/user-files/UserFilesReducer";
import { useUserFiles } from "@/hooks/user-files/useUserFiles";
import { File } from "@/types/entities";
import { ReactNode, createContext } from "react";

interface UserFilesContext {
  areFilesLoading: boolean;
  userFiles: File[];
  userFilesDispatcher: React.Dispatch<UserFilesAction>;
}

const defaultValues: UserFilesContext = {
  areFilesLoading: false,
  userFiles: [],
  userFilesDispatcher: () => {}
};

export const UserFilesContext = createContext<UserFilesContext>(defaultValues);

export const UserFilesProvider = ({ children }: { children: ReactNode }) => {
  const { loading, userFiles, userFilesDispatcher } = useUserFiles();

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
