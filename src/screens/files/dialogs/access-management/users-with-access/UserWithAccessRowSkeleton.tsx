import { Skeleton } from "@/components/ui/skeleton";

export const UserWithAccessRowSkeleton = () => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-2  p-2">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-10 w-24" />
    </div>
  );
};
