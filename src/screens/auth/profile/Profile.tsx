import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/context/index";
import { useContext } from "react";

import { UpdatePasswordForm } from "./UpdatePasswordForm";

export const ProfilePage = () => {
  const { session } = useContext(AuthContext);
  const initial = session?.username[0].toUpperCase();

  return (
    <main className="mt-4 p-4">
      <section className="mx-auto flex max-w-md flex-col items-center gap-4 border p-4">
        <div className="grid h-16 w-16 place-content-center rounded-sm bg-primary text-white">
          <span className="text-lg font-bold">{initial}</span>
        </div>
        <h1 className="text-xl font-medium tracking-wide">
          {session?.username}
        </h1>
        <Tabs defaultValue="update-password" className="w-full">
          <TabsList>
            <TabsTrigger value="update-password">Update password</TabsTrigger>
          </TabsList>
          <TabsContent value="update-password">
            <UpdatePasswordForm />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};
