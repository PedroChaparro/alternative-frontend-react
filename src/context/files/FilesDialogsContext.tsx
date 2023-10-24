import { File } from "@/types/entities";
import { Dialogs } from "@/types/enums";
import { ReactNode, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

type DialogState = {
  [key in Dialogs]: boolean;
};

interface FilesDialogsContext {
  dialogsOpenState: DialogState;
  selectedFile: File | null;
  updateDialogOpenState: (dialog: Dialogs, state: boolean) => void;
  openDialog: (dialog: Dialogs, file: File) => void;
  closeDialog: (dialog: Dialogs) => void;
}

const defaultValues: FilesDialogsContext = {
  dialogsOpenState: {
    RENAME_FILE: false,
    MOVE_FILE: false,
    CREATE_DIRECTORY: false,
    ACCESS_MANAGEMENT: false
  },
  selectedFile: null,
  updateDialogOpenState: () => {},
  openDialog: () => {},
  closeDialog: () => {}
};

export const FilesDialogsContext =
  createContext<FilesDialogsContext>(defaultValues);

export const FilesDialogsProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useSearchParams();

  const [dialogsOpenState, setDialogsOpenState] = useState<DialogState>(
    defaultValues.dialogsOpenState
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openDialog = (dialog: Dialogs, file: File) => {
    setSelectedFile(file);
    setDialogsOpenState({
      ...dialogsOpenState,
      [dialog]: true
    });
  };

  const closeDialog = (dialog: Dialogs) => {
    setSelectedFile(null);
    setDialogsOpenState({
      ...dialogsOpenState,
      [dialog]: false
    });

    if (dialog === Dialogs.MOVE_FILE) {
      params.delete("moveTo");
      setParams(params);
    }
  };

  const updateDialogOpenState = (dialog: Dialogs, state: boolean) => {
    setDialogsOpenState({
      ...dialogsOpenState,
      [dialog]: state
    });

    if (!state) setSelectedFile(null);
  };

  return (
    <FilesDialogsContext.Provider
      value={{
        dialogsOpenState,
        selectedFile,
        updateDialogOpenState,
        openDialog,
        closeDialog
      }}
    >
      {children}
    </FilesDialogsContext.Provider>
  );
};
