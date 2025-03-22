import React from "react";
import { User2Icon, CircleCheck} from "lucide-react";
import { Icons } from "@/public/Icons/Icons";
import {
    IconDragDrop,
  } from "@tabler/icons-react";
import { MagicCard } from "@/components/ui/magic-card";
function HowWoks() {
  const steps = [
    {
      id: 1,
      title: "Sign Up",
      icon: <User2Icon />,
      description:
        "Create your free account in seconds. No credit card required.",
    },
    {
      id: 1,
      title: "Build Your Form",
      icon: <IconDragDrop />,
      description: "Use our drag-and-drop builder to create your perfect form.",
    },
    {
      id: 1,
      title: "Collect Data",
      icon: <CircleCheck />,
      description: "Share your form and start collecting responses instantly.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-20 lg:grid-cols-3 gap-16 z-10">
      {steps.map((step, index) => (
        <MagicCard 
        gradientColor="#3E1E90"
        key={step.title}
>

        <div
          className="flex relative flex-col border  glass border-white/10  rounded-xl w-80 h-60 p-4 justify-center items-center gap-4 text-white"
        >
          {/* <div className="absolute font-bold -top-6 w-12 h-12 flex items-center justify-center rounded-full text-white bg-richblue-100">
            {index + 1}
          </div> */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-richblue-500">
            {step.icon}
          </div>
          <div>
            <h3 className="text-lg text-center font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-center  text-gray-400">
              {step.description}
            </p>
          </div>
          {index === 0 && (
            <Icons.arrow className="text-richblue-500  w-44 absolute -top-24 hidden md:block -right-24 -rotate-45" />
          )}
          {index === 1 && (
            <Icons.arrow className="text-richblue-500  w-44 absolute -bottom-24 -right-32 hidden md:block -rotate-[120deg] transform scale-x-[-1]" />
          )}
        </div>
        </MagicCard>

      ))}
    </div>
  );
}

export default HowWoks;
