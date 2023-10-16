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
import { loginService } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" }
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    const { success, msg } = await login(values.username, values.password);
    if (!success) {
      setLoading(false);
      toast.error(msg);
      return;
    }

    setLoading(false);
    toast.success(msg);
    navigate("/files");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto my-4 max-w-md space-y-4 border p-4 shadow-sm"
      >
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username here"
                  required
                  {...field}
                />
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
                  required
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
        <Button type="submit" className="w-full">
          {loading && <Loader2 className="mr-2 animate-spin" />}
          Submit
        </Button>
        <span className="block text-center text-foreground/60">
          Does not have an account?{" "}
          <Link to="/register" className={buttonVariants({ variant: "link" })}>
            Register
          </Link>
        </span>
      </form>
    </Form>
  );
}
