import { ReactNode } from "react";

import { FilesProvider } from "./FilesContext";
import { FilesDialogsProvider } from "./FilesDialogsContext";
import { FoldersNavigationProviders } from "./FoldersNavigationContext";

export const FilesContextsWrapper = ({
  children
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <FoldersNavigationProviders>
      <FilesDialogsProvider>
        <FilesProvider>{children}</FilesProvider>
      </FilesDialogsProvider>
    </FoldersNavigationProviders>
  );
};
