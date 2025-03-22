import { cn } from "@/lib/utils";
import {
  IconDragDrop,
  IconRefresh,
  IconPlugConnected,
  IconChartBar,
  IconShieldLock,
  IconRobot,
} from "@tabler/icons-react";

export function FeaturesSectionDemo() {
  const features = [
    {
      title: "Drag & Drop Builder",
      description:
        "Create beautiful forms without coding. Simply drag and drop elements to build your perfect form.",
      icon: <IconDragDrop className="w-6 h-6" />,  // Drag and drop icon
    },
    {
      title: "Real-Time Updates",
      description:
        "Get instant notifications and see responses in real-time as they come in.",
      icon: <IconRefresh className="w-6 h-6" />,  // Refresh/real-time icon
    },
    {
      title: "Smart Integrations",
      description:
        "Connect with your favorite tools like Google Sheets, Slack, and more.",
      icon: <IconPlugConnected className="w-6 h-6" />,  // Connection/plugin icon
    },
    {
      title: "Advanced Analytics",
      description: "Get detailed insights and visualize your data with powerful analytics tools.",
      icon: <IconChartBar className="w-6 h-6" />,  // Chart/analytics icon
    },
    {
      title: "Secure Data",
      description: "Enterprise-grade security with encrypted data transmission and storage.",
      icon: <IconShieldLock className="w-6 h-6" />,  // Security shield icon
    },
    {
      title: "Automated Workflows",
      description:
        "Set up automated actions based on form submissions and save time.",
      icon: <IconRobot className="w-6 h-6" />,  // Automation/robot icon
    },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#020015_40%,#63e_100%)]" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r border-gray-600 py-10 relative group/feature",
        (index % 3 === 0) && "lg:border-l",
        index < 3 && "lg:border-b"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#020015_40%,#63e_100%)] pointer-events-none" />
      <div className="mb-4 relative z-10 px-10 text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-600 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

export default FeaturesSectionDemo;