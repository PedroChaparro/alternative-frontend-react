import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ Icon, title, description }: FeatureCardProps) => {
  return (
    <article className="flex w-full max-w-sm flex-col items-center space-y-4 rounded-sm border p-6 text-center shadow-sm transition-colors hover:bg-gray-50">
      <Icon className="text-primary" size={64} strokeWidth={1.25} />
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-lg text-muted-foreground">{description}</p>
    </article>
  );
};
