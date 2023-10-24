import { ReactNode } from "react";

import { FilesDialogsProvider } from "./FilesDialogsContext";
import { FoldersNavigationProviders } from "./FoldersNavigationContext";
import { UserFilesProvider } from "./UserFilesContext";

export const FilesContextsWrapper = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <FoldersNavigationProviders>
      <FilesDialogsProvider>
        <UserFilesProvider>{children}</UserFilesProvider>
      </FilesDialogsProvider>
    </FoldersNavigationProviders>
  );
};
