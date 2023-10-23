import { EmptyContentText } from "@/components/ui/empty-content-text";
import { ScrollArea } from "@/components/ui/scroll-area";

import { UserWithAccessRow } from "./UserWithAccessRow";
import { UserWithAccessRowSkeleton } from "./UserWithAccessRowSkeleton";

interface UsersWithAccessListProps {
  isLoading: boolean;
  usersWithAccess: string[];
  unshareCallback: (username: string) => void;
}

export const UsersWithAccessList = ({
  isLoading,
  usersWithAccess,
  unshareCallback
}: UsersWithAccessListProps) => {
  function renderContent() {
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
          <UserWithAccessRow
            key={user}
            user={user}
            unshareCallback={unshareCallback}
          />
        ))}
      </ScrollArea>
    );
  }

  return (
    <section>
      <h3 className="my-2 font-semibold">Users with access</h3>
      {renderContent()}
    </section>
  );
};
