import { FileCard } from "@/components/file-card/FileCard";
import { FileCardSkeleton } from "@/components/file-card/FileCardSkeleton";
import { EmptyContentText } from "@/components/ui/empty-content-text";
import { AuthContext } from "@/context/AuthContext";
import { listFilesService } from "@/services/files/list-files.service";
import { File } from "@/types/entities";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const FilesView = () => {
  const navigate = useNavigate();
  const [params, _setParams] = useSearchParams();
  const directory = params.get("directory");

  const { session } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [userFiles, setUserFiles] = useState<File[]>([]);

  useEffect(() => {
    const getFiles = async () => {
      const { success, ...response } = await listFilesService({
        token: session?.token || "",
        directory
      });
      if (!success) {
        setLoading(false);
        toast.error(response.msg);
        navigate("/");
      }

      setUserFiles(response.files);
      setLoading(false);
    };

    getFiles();
  }, [directory]);

  const renderUserFiles = () => {
    if (loading) {
      const skeletons = Array.from({ length: 6 }).map((_, index) => (
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
    </main>
  );
};
