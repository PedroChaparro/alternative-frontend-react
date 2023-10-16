import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useState } from "react";

import { UploadFileForm } from "./UploadFileForm";

export const UploadFileDialog = () => {
  // Modal state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} className="w-full max-w-xs">
          <Upload strokeWidth={1.5} className="mr-2 h-5 w-5" />
          Upload file
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Select some files to upload from your device. Click on the upload
            button when you're done.
          </DialogDescription>
        </DialogHeader>
        <UploadFileForm />
      </DialogContent>
    </Dialog>
  );
};
