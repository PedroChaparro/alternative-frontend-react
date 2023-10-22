import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext, FilesDialogsContext } from "@/context";
import { shareFileService } from "@/services/files/share-file.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const shareFileSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be at least 1 character long")
    .max(255, "Username must be at most 255 characters long")
});

interface ShareFileFormProps {
  shareCallback: (username: string) => void;
}

export const ShareFileForm = ({ shareCallback }: ShareFileFormProps) => {
  const { selectedFile } = useContext(FilesDialogsContext);
  const { session } = useContext(AuthContext);
  const [sharing, setSharing] = useState(false);
  const [_usernameValue, setUsernameValue] = useState("");

  const form = useForm<z.infer<typeof shareFileSchema>>({
    resolver: zodResolver(shareFileSchema),
    defaultValues: {
      username: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof shareFileSchema>) => {
    setSharing(true);
    await shareFile(data.username);
    setSharing(false);
    setUsernameValue("");
  };

  const shareFile = async (username: string) => {
    setSharing(true);

    const response = await shareFileService({
      token: session?.token as string,
      fileUUID: selectedFile?.uuid as string,
      otherUsername: username
    });

    if (response.success) {
      shareCallback(username);
      toast.success("File shared successfully");
      form.setValue("username", "");
    } else {
      toast.error(`Error shared file: ${response.msg}`);
    }

    setSharing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-4 items-center gap-x-4">
                <FormControl>
                  <Input
                    required
                    className="col-span-3"
                    placeholder="Enter a username to share with"
                    aria-label="Share with"
                    {...field}
                  />
                </FormControl>
                <Button type="submit">
                  {sharing && <Loader2 className="mr-2 animate-spin" />}
                  Share
                </Button>
              </div>
              {form.formState.errors.username && (
                <FormMessage className="col-span-full">
                  {form.formState.errors.username.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};
