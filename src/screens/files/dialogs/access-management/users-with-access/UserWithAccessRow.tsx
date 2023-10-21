import { Button } from "@/components/ui/button";

interface UserWithAccessRowProps {
  user: string;
  unshareCallback: (username: string) => void;
}

export const UserWithAccessRow = ({
  user,
  unshareCallback
}: UserWithAccessRowProps) => {
  const handleUnshare = () => {
    // TODO: Make the request to unshare the file

    // Remove the user from the UI
    unshareCallback(user);
  };

  return (
    <div
      key={user}
      className="flex flex-row items-center justify-between gap-x-2 rounded-md p-2 transition-colors hover:bg-muted"
    >
      <span className="max-w-[50%] truncate">{user}</span>
      <Button
        variant={"destructive"}
        aria-label={`Un-share with ${user}`}
        onClick={handleUnshare}
      >
        Un-share
      </Button>
    </div>
  );
};
