import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export const FilesPageLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl auto-rows-min gap-4 p-4 md:auto-rows-auto md:grid-cols-4">
      <aside className="flex flex-wrap justify-center gap-4 border-b pb-4 pr-4 md:flex-col md:justify-start md:border-b-0 md:border-r md:pb-0">
        <Button variant={"default"} className="w-full max-w-xs">
          <Upload strokeWidth={1.5} className="mr-2 h-5 w-5" />
          Upload file
        </Button>
        <Button variant={"default"} className="w-full max-w-xs">
          <PlusCircle strokeWidth={1.5} className="mr-2 h-5 w-5" />
          Create folder
        </Button>
        <Button
          variant={"outline"}
          className="w-full max-w-xs"
          onClick={() => navigate("/files")}
        >
          My files
        </Button>
        <Button
          variant={"outline"}
          className="w-full max-w-xs"
          onClick={() => navigate("/files/shared_with_me")}
        >
          Shared with me
        </Button>
      </aside>
      {/* Outlet is defined by every nested route */}
      <Outlet />
    </div>
  );
};
