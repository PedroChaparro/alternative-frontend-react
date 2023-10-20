import { FilesGrid } from "@/components/files-grid/FilesGrid";
import { UserFilesContext } from "@/context/index";
import { useContext } from "react";

import { MoveFileDialog } from "./dialogs/move-file/MoveFileDialog";
import { RenameFileDialog } from "./dialogs/rename-file/RenameFileDialog";

export const FilesView = () => {
  const { areFilesLoading: loading, userFiles } = useContext(UserFilesContext);

  return (
    <main className="md:col-span-3">
      <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
        <FilesGrid
          isInMovingMode={false}
          areLoading={loading}
          files={userFiles}
        />
      </section>
      <RenameFileDialog />
      <MoveFileDialog />
    </main>
  );
};
