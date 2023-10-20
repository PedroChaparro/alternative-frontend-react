import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FilesDialogsContext } from "@/context/index";
import { Dialogs } from "@/types/enums";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useContext } from "react";

import { CreateDirectoryForm } from "./CreateDirectoryForm";

export const CreateDirectoryDialog = () => {
  const { dialogsOpenState, updateDialogOpenState } =
    useContext(FilesDialogsContext);

  return (
    <Dialog
      open={dialogsOpenState.CREATE_DIRECTORY}
      onOpenChange={(open: boolean) => {
        updateDialogOpenState(Dialogs.CREATE_DIRECTORY, open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"default"} className="w-full max-w-xs">
          <PlusCircle strokeWidth={1.5} className="mr-2 h-5 w-5" />
          Create folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new folder</DialogTitle>
          <DialogDescription>
            Enter a name for the new folder. Click on the create button when
            you're done.
          </DialogDescription>
        </DialogHeader>
        <CreateDirectoryForm />
      </DialogContent>
    </Dialog>
  );
};
