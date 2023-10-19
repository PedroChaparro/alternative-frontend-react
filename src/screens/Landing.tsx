import { buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <main>
      <header className="bg-primary px-4 py-8 text-white">
        {/* Hero */}
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {/* Hero texts */}
          <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-6 text-center md:items-start md:text-start">
            <h1 className="text-4xl font-bold">
              CapyFile: A Redundant and Distributed files storage system
            </h1>
            <p className="text-2xl">
              Effortlessly store, organize and access your files with build-in
              redundancy
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              <Link
                to={"/register"}
                className={`${buttonVariants({
                  variant: "secondary",
                  size: "lg"
                })} text-xl`}
              >
                Register
              </Link>
              <Link
                to={"https://github.com/hawks-atlanta"}
                target="_blank"
                rel="noreferrer noopener"
                className={`${buttonVariants({
                  variant: "secondary",
                  size: "lg"
                })} text-xl`}
              >
                <Github className="mr-2" />
                Source code
              </Link>
            </div>
          </div>
          {/* Hero image */}
          <div className="grid place-content-center">
            <img
              src="/images/files-preview.webp"
              alt="CapyFile preview"
              className="w-full max-w-xl drop-shadow-xl"
            />
          </div>
        </div>
      </header>
    </main>
  );
};
