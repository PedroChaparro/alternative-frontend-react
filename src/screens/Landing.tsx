import { FeatureCard } from "@/components/Home/FeatureCard";
import { buttonVariants } from "@/components/ui/button";
import {
  DownloadCloud,
  Github,
  MonitorSmartphone,
  Share2Icon,
  UploadCloud,
  UserPlus
} from "lucide-react";
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
                <UserPlus className="mr-2" />
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
      <section className="mx-auto my-4 max-w-7xl p-4">
        <h2 className="mb-8 text-center text-3xl font-semibold text-primary">
          Main features
        </h2>
        <div className="flex flex-wrap items-stretch justify-center gap-8">
          <FeatureCard
            Icon={UploadCloud}
            title="Save your files"
            description="Add and access your data in our distributed storage system. Simple and fast"
          />
          <FeatureCard
            Icon={Share2Icon}
            title="Easy File Sharing"
            description="Share with your friends or coworkers, and simplify your file sharing experience"
          />
          <FeatureCard
            Icon={DownloadCloud}
            title="Reliable File Downloads"
            description="Access your files from anywhere with ease and convenience with our redundant system"
          />
          <FeatureCard
            Icon={MonitorSmartphone}
            title="Seamless Cross-Platform Access"
            description="Access your data seamlessly on both our web and mobile clients with a single CapyFile account"
          />
          <FeatureCard
            Icon={Github}
            title="Code Freedom"
            description="Our system is open for you to explore, and customize to your needs. You can even self-host it"
          />
        </div>
      </section>
    </main>
  );
};
