import { File } from "@/types/entities";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FileCard } from "../file-card/FileCard";
import { FileCardSkeleton } from "../file-card/FileCardSkeleton";
import { Button } from "../ui/button";
import { EmptyContentText } from "../ui/empty-content-text";
import { FilesContainer } from "./FilesContainer";

interface FilesGridProps {
  navigationParam: string;
  areLoading: boolean;
  files: File[];
}

export const FilesGrid = ({
  navigationParam,
  areLoading,
  files
}: FilesGridProps) => {
  // Navigation state
  const [params, _] = useSearchParams();
  const canGoBack = params.get(navigationParam) !== null;

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  // Render
  if (areLoading) {
    const skeletons = Array.from({ length: 4 }).map((_, index) => (
      <FileCardSkeleton key={`file-card-skeleton-${index}`} />
    ));

    return <FilesContainer>{skeletons}</FilesContainer>;
  }

  if (!areLoading && files.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        {canGoBack && (
          <Button className="w-max" onClick={goBack}>
            <ArrowLeft className="mr-2" />
            Go back
          </Button>
        )}
        <EmptyContentText text="No files found here..." />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {canGoBack && (
        <Button className="w-max" onClick={goBack}>
          <ArrowLeft className="mr-2" />
          Go back
        </Button>
      )}
      <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
        {files.map((file) => (
          <FileCard key={file.uuid} file={file} />
        ))}
      </section>
    </div>
  );
};
