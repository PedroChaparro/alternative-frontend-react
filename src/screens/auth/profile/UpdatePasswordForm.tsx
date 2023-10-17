import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { updatePasswordService } from "@/services/account/update-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const UpdatePasswordSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"]
  });

export const UpdatePasswordForm = () => {
  const { session } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof UpdatePasswordSchema>) => {
    setLoading(true);

    const { success, msg } = await updatePasswordService({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      token: session?.token || ""
    });
    if (!success) {
      setLoading(false);
      toast.error(msg);
      return;
    }

    setLoading(false);
    toast.success("Password updated successfully");
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto my-4 max-w-md space-y-4 border p-4 shadow-sm"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username here"
                  type="password"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.oldPassword && (
                <FormMessage>
                  {form.formState.errors.oldPassword.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username here"
                  type="password"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.newPassword && (
                <FormMessage>
                  {form.formState.errors.newPassword.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username here"
                  type="password"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.confirmNewPassword && (
                <FormMessage>
                  {form.formState.errors.confirmNewPassword.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading && <Loader2 className="mr-2 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
