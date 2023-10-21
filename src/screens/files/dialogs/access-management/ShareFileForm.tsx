import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const shareFileSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be at least 1 character long")
    .max(255, "Username must be at most 255 characters long")
});

export const ShareFileForm = () => {
  const [sharing, setSharing] = useState(false);
  const form = useForm<z.infer<typeof shareFileSchema>>({
    resolver: zodResolver(shareFileSchema)
  });

  const onSubmit = async (data: z.infer<typeof shareFileSchema>) => {
    setSharing(true);
    await shareFile(data.username);
    setSharing(false);
  };

  const shareFile = async (username: string) => {
    console.log(`Sharing file with ${username}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
