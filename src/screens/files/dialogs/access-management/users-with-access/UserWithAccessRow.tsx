import { Button } from "@/components/ui/button";

export const UserWithAccessRow = ({ user }: { user: string }) => {
  return (
    <div
      key={user}
      className="flex flex-row items-center justify-between gap-x-2 rounded-md p-2 transition-colors hover:bg-muted"
    >
      <span className="max-w-[50%] truncate">{user}</span>
      <Button variant={"destructive"} aria-label={`Un-share with ${user}`}>
        Un-share
      </Button>
    </div>
  );
};
