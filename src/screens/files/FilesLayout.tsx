import { Button } from "@/components/ui/button";
import { FoldersNavigationContext } from "@/context/index";
import { NavigationParams } from "@/types/enums";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { CreateDirectoryDialog, UploadFileDialog } from "./dialogs";

export const FilesPageLayout = () => {
  const { clearHistory } = useContext(FoldersNavigationContext);
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl auto-rows-min gap-4 p-4 md:auto-rows-auto md:grid-cols-4">
      <aside className="flex flex-wrap justify-center gap-4 border-b pb-4 pr-4 md:flex-col md:justify-start md:border-b-0 md:border-r md:pb-0">
        <UploadFileDialog />
        <CreateDirectoryDialog />
        <Button
          variant={"outline"}
          className="w-full max-w-xs"
          onClick={() => {
            clearHistory(NavigationParams.DIRECTORY);
            navigate("/files");
          }}
        >
          My files
        </Button>
        <Button
          variant={"outline"}
          className="w-full max-w-xs"
          onClick={() => navigate("/files/shared-with-me")}
        >
          Shared with me
        </Button>
      </aside>
      {/* Outlet is defined by every nested route */}
      <Outlet />
    </div>
  );
};
