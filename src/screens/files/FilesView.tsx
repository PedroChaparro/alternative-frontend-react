import { FilesGrid } from "@/components/files-grid/FilesGrid";
import { FilesContext } from "@/context/index";
import { useContext } from "react";

export const FilesView = () => {
  const { areFilesLoading: loading, files } = useContext(FilesContext);

  return (
    <main className="md:col-span-3">
      <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
        <FilesGrid isInMovingMode={false} areLoading={loading} files={files} />
      </section>
    </main>
  );
};
