import { File } from "@/types/entities";

import { FileCard } from "../file-card/FileCard";
import { FileCardSkeleton } from "../file-card/FileCardSkeleton";
import { EmptyContentText } from "../ui/empty-content-text";
import { FilesContainer } from "./FilesContainer";

interface FilesGridProps {
  areLoading: boolean;
  files: File[];
}

export const FilesGrid = ({ areLoading, files }: FilesGridProps) => {
  if (areLoading) {
    const skeletons = Array.from({ length: 4 }).map((_, index) => (
      <FileCardSkeleton key={`file-card-skeleton-${index}`} />
    ));

    return <FilesContainer>{skeletons}</FilesContainer>;
  }

  if (!areLoading && files.length === 0) {
    <EmptyContentText text="No files found here..." />;
  }

  return (
    <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
      {files.map((file) => (
        <FileCard key={file.uuid} file={file} />
      ))}
    </section>
  );
};
