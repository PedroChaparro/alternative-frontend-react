import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AuthContext,
  FilesDialogsContext,
  UserFilesContext
} from "@/context/index";
import { UserFilesActionTypes } from "@/hooks/user-files/UserFilesReducer";
import { renameFileService } from "@/services/files/rename-file.service";
import { Dialogs } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const renameFileSchema = z.object({
  name: z
    .string()
    .min(1, "File name must be at least 1 character long")
    .max(255, "File name must be at most 255 characters long")
});

export const RenameFileForm = () => {
  const { selectedFile, closeDialog } = useContext(FilesDialogsContext);
  const { session } = useContext(AuthContext);
  const { userFilesDispatcher } = useContext(UserFilesContext);

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof renameFileSchema>>({
    resolver: zodResolver(renameFileSchema),
    defaultValues: {
      name: selectedFile?.name
    }
  });

  if (!selectedFile) return;

  const onSubmit = async (data: z.infer<typeof renameFileSchema>) => {
    await renameFile(data.name);
  };

  const renameFile = async (newName: string) => {
    setLoading(true);
    const { success, msg } = await renameFileService({
      fileUUID: selectedFile.uuid,
      newName: newName,
      token: session?.token ?? ""
    });
    setLoading(false);

    if (!success) {
      toast.error(msg);
      return;
    }

    userFilesDispatcher({
      type: UserFilesActionTypes.RENAME_FILE,
      payload: {
        uuid: selectedFile.uuid,
        name: newName
      }
    });
    toast.success(msg);
    closeDialog(Dialogs.RENAME_FILE);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>New name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a new name for the file" {...field} />
              </FormControl>
              {form.formState.errors.name && (
                <FormMessage className="col-span-3 col-start-2">
                  {form.formState.errors.name.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        ></FormField>
        <DialogFooter>
          <Button type="submit">
            {loading && <Loader2 className="mr-2 animate-spin" />}
            Rename
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
