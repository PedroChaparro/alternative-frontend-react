import { FileCard } from "@/components/file-card/FileCard";
import { FileCardSkeleton } from "@/components/file-card/FileCardSkeleton";
import { EmptyContentText } from "@/components/ui/empty-content-text";
import { UserFilesContext } from "@/context/UserFilesContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { RenameFileDialog } from "./dialogs/rename-file/RenameFileDialog";

export const FilesView = () => {
  const [params, _setParams] = useSearchParams();
  const directory = params.get("directory");

  const { areFilesLoading: loading, userFiles } = useContext(UserFilesContext);

  const renderUserFiles = () => {
    if (loading) {
      const skeletons = Array.from({ length: 4 }).map((_, index) => (
        <FileCardSkeleton key={`file-card-skeleton-${index}`} />
      ));

      return skeletons;
    }

    if (userFiles.length === 0) {
      return <EmptyContentText text="No files found here..." />;
    }

    return userFiles.map((file) => <FileCard key={file.uuid} file={file} />);
  };

  return (
    <main className="md:col-span-3" key={directory}>
      <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
        {renderUserFiles()}
      </section>
      <RenameFileDialog />
    </main>
  );
};
