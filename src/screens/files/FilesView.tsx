import { FilesGrid } from "@/components/files-grid/FilesGrid";
import { UserFilesContext } from "@/context/UserFilesContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { MoveFileDialog } from "./dialogs/move-file/MoveFileDialog";
import { RenameFileDialog } from "./dialogs/rename-file/RenameFileDialog";

export const FilesView = () => {
  const [params, _setParams] = useSearchParams();
  const directory = params.get("directory");

  const { areFilesLoading: loading, userFiles } = useContext(UserFilesContext);

  return (
    <main className="md:col-span-3" key={directory}>
      <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
        <FilesGrid areLoading={loading} files={userFiles} />
      </section>
      <RenameFileDialog />
      <MoveFileDialog />
    </main>
  );
};
