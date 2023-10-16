import { Button, buttonVariants } from "@/components/ui/button";
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
import { registerService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(64, "Username must be at most 64 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string()
});

export function RegisterForm() {
  const { updateSession } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" }
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    if (!checkPasswordsMatch()) return;
    setLoading(true);

    const { username, password } = values;
    const response = await registerService({ username, password });
    if (!response.success || !response.token) {
      setLoading(false);
      toast.error(response.msg);
      return;
    }

    setLoading(false);
    toast.success("Account created successfully");
    logIn(values.username, response.token);
  }

  const checkPasswordsMatch = (): boolean => {
    if (form.getValues("password") !== form.getValues("confirmPassword")) {
      form.setError("confirmPassword", {
        message: "Passwords do not match"
      });
      return false;
    }

    return true;
  };

  async function logIn(username: string, token: string) {
    updateSession(username, token);
    navigate("/files");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto my-4 max-w-md space-y-4 border p-4 shadow-sm"
      >
        <h1 className="text-center text-2xl font-bold">Create an account</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username here" {...field} />
              </FormControl>
              {form.formState.errors.username && (
                <FormMessage>
                  {form.formState.errors.username.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password here"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.password && (
                <FormMessage>
                  {form.formState.errors.password.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password here"
                  required
                  {...field}
                />
              </FormControl>
              {form.formState.errors.confirmPassword && (
                <FormMessage>
                  {form.formState.errors.confirmPassword.message}
                </FormMessage>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {loading && <Loader2 className="mr-2 animate-spin" />}
          Submit
        </Button>
        <span className="block text-center text-foreground/60">
          Already have an account?
          <Link to="/login" className={buttonVariants({ variant: "link" })}>
            Login
          </Link>
        </span>
      </form>
    </Form>
  );
}
