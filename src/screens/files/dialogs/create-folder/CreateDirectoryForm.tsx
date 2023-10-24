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
  FoldersNavigationContext,
  UserFilesContext
} from "@/context/index";
import { UserFilesActionTypes } from "@/hooks/user-files/UserFilesReducer";
import { createFoldersService } from "@/services/files/create-folders.service";
import { Dialogs, NavigationParams } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const createDirectorySchema = z.object({
  name: z
    .string()
    .min(1, "Directory name must be at least 1 character long")
    .max(255, "Directory name must be at most 255 characters long")
});

export const CreateDirectoryForm = () => {
  const { getParam } = useContext(FoldersNavigationContext);
  const parent = getParam(NavigationParams.DIRECTORY);

  const { closeDialog } = useContext(FilesDialogsContext);
  const { session } = useContext(AuthContext);
  const { userFilesDispatcher } = useContext(UserFilesContext);

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof createDirectorySchema>>({
    resolver: zodResolver(createDirectorySchema),
    defaultValues: {
      name: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof createDirectorySchema>) => {
    if (loading) return;

    setLoading(true);
    await createDirectory(data.name);
    setLoading(false);
  };

  const createDirectory = async (name: string) => {
    const { success, ...res } = await createFoldersService({
      name,
      directory: parent,
      token: session?.token as string
    });

    if (!success) {
      toast.error(res.msg);
      return;
    }

    userFilesDispatcher({
      type: UserFilesActionTypes.ADD_FILE,
      payload: {
        uuid: res.directoryUUID,
        isFile: false,
        isReady: true,
        isOwnedByUser: true,
        name,
        size: 0
      }
    });
    toast.success("The folder has been created successfully");
    closeDialog(Dialogs.CREATE_DIRECTORY);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a name for the folder" {...field} />
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
            Create
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
