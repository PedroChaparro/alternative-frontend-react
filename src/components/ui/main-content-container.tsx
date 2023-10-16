import { ReactNode } from "react";

interface MainContentContainerProps {
  children: ReactNode;
}

export const MainContentContainer = ({
  children
}: MainContentContainerProps) => {
  return <main className="p-4">{children}</main>;
};
