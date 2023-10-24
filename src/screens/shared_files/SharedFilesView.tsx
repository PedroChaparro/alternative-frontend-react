import { FilesGrid } from "@/components/files-grid/FilesGrid";
import { FilesContext } from "@/context";
import { useContext } from "react";

export const SharedFilesView = () => {
  const { areFilesLoading: loading, files: sharedFiles } =
    useContext(FilesContext);

  return (
    <main className="md:col-span-3">
      <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
        <FilesGrid
          isInMovingMode={false}
          areLoading={loading}
          files={sharedFiles}
        />
      </section>
    </main>
  );
};
