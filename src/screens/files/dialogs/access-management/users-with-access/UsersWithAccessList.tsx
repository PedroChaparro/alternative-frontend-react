import { EmptyContentText } from "@/components/ui/empty-content-text";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthContext, FilesDialogsContext } from "@/context";
import { getSharedWithWhoService } from "@/services/files/get-shared-with-who.service";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { UserWithAccessRow } from "./UserWithAccessRow";
import { UserWithAccessRowSkeleton } from "./UserWithAccessRowSkeleton";

export const UsersWithAccessList = () => {
  const { selectedFile } = useContext(FilesDialogsContext);
  const { session } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usersWithAccess, setUsersWithAccess] = useState<string[]>([]);

  useEffect(() => {
    async function fetchUsersWithAccess() {
      setIsLoading(true);

      const { success, ...res } = await getSharedWithWhoService({
        token: session?.token as string,
        fileUUID: selectedFile?.uuid as string
      });

      if (!success) {
        setIsLoading(false);
        toast.error(res.msg);
        return;
      }

      setUsersWithAccess(res.users);
      setIsLoading(false);
    }

    fetchUsersWithAccess();
  }, []);

  function renderList() {
    if (isLoading) {
      const skeletons = Array.from({ length: 3 }).map((_, i) => (
        <UserWithAccessRowSkeleton key={`users-with-access-skeleton-${i}`} />
      ));

      return (
        <ScrollArea className="flex max-h-64 flex-col gap-y-2">
          {skeletons}
        </ScrollArea>
      );
    }

    if (usersWithAccess.length === 0) {
      return <EmptyContentText text="This file is not shared with anyone" />;
    }

    return (
      <ScrollArea className="flex max-h-64 flex-col gap-y-2">
        {usersWithAccess.map((user) => (
          <UserWithAccessRow user={user} />
        ))}
      </ScrollArea>
    );
  }

  return (
    <section>
      <h3 className="my-2 font-semibold">Users with access</h3>
      {renderList()}
    </section>
  );
};
