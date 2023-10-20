import { ReactNode } from "react";

export const FilesContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-row flex-wrap items-stretch justify-center gap-8 md:justify-start">
      {children}
    </section>
  );
};
