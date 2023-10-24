import { FilesGrid } from "@/components/files-grid/FilesGrid";
import { useSharedFiles } from "@/hooks/shared-files/useSharedFiles";

export const SharedFilesView = () => {
  const { loading, sharedFiles } = useSharedFiles();
  console.log(sharedFiles);

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
