"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronLeft,
  Undo,
  Redo,
  HelpCircle,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RxCross2 } from "react-icons/rx";
import { IoIosExpand } from "react-icons/io";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import SidebarBtnElement from "../(components)/SidebarBtnElement";
import { FormElements } from "../(components)/FormElement";
import DragOverlayWraapper from "../(components)/DragOverlayWraapper";

const FormBuilderLayout = () => {
  const [open, setOpen] = useState(false);
  const [droppedElements, setDroppedElements] = useState<string[]>([]); // Stores dropped items

  const { isOver, setNodeRef } = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && over.id === "designer-drop-area") {
      setDroppedElements((prev) => [...prev, "Dropped Box"]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col min-h-screen bg-[#0f0f1a]">
        {/* Header */}
        <header className="h-16 bg-[#181828] border-b border-[#2a2a40] flex items-center px-4 justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-4 text-gray-400">
              <ChevronLeft size={20} />
            </Button>
            <div className="text-white font-bold text-2xl">
              <Link href="/">
                Data <span className="text-richblue-100">Form</span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-400">
              <Undo size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400">
              <Redo size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400">
              <HelpCircle size={16} />
            </Button>
            <Button className="bg-[#6b46c1] hover:bg-[#5a3ca6] text-white">
              <FileText />
              Publish Form
            </Button>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-1 relative overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 bg-[#181828] border-r border-[#2a2a40] p-4 flex flex-col">
            <Button
              onClick={() => setOpen(true)}
              className="bg-[#6b46c1] w-full hover:bg-[#5a3ca6]"
            >
              <Plus className="mr-2" />
              Add block
            </Button>

            <Tabs defaultValue="build" className="w-full mt-4">
              <TabsList className="w-full grid grid-cols-3 bg-[#14141f] mb-4">
                <TabsTrigger
                  value="build"
                  className="data-[state=active]:bg-[#6b46c1] data-[state=active]:text-white"
                >
                  Build
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="data-[state=active]:bg-[#6b46c1] data-[state=active]:text-white"
                >
                  Design
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-[#6b46c1] data-[state=active]:text-white"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="build"></TabsContent>
            </Tabs>
          </div>

          {/* Main content area */}
          <div
            className={cn(
              `flex-1 p-4 transition-all duration-300 ${open ? "mr-80" : ""}`,
              isOver && "ring-2 ring-blue-500"
            )}
            ref={setNodeRef}
          >
            <div className="w-[95%] mx-auto rounded-md bg-white min-h-screen">
              <div className="h-11 flex items-center justify-between px-5">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 ">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EAB305]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#21C55D]"></div>
                  </div>
                  <div className="text-gray-400 mx-10 font-regular text-sm">
                    Form Preview
                  </div>
                </div>
                <Button variant="outline" className="p-0 w-8 h-8">
                  <IoIosExpand />
                </Button>
              </div>
              <Separator />



              <div>
                
              </div>

              
            </div>
          </div>

          {/* Right sidebar */}
          <div
            className={`absolute right-0 top-0 h-full w-80 bg-[#181828] border-l border-[#2a2a40] p-4 flex flex-col transition-transform duration-300 ease-in-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col gap-4 items-center mb-4">
              <div className="flex items-center">
                <Button
                  onClick={() => setOpen(false)}
                  size="icon"
                  className="text-gray-400 hover:bg-[#2a2a40] rounded-3xl p-2 h-8 w-8"
                >
                  <RxCross2 className="h-4 w-4" />
                </Button>
                <h3 className="text-lg ml-20 font-medium text-white">
                  Add Block
                </h3>
              </div>

              <div className="flex flex-col gap-2">


                {/* <SidebarBtnElement formElement={FormElements.text} /> */}
              </div>
            </div>
          </div>
        </div>
        <DragOverlayWraapper />
      </div>
    </DndContext>
  );
};

export default FormBuilderLayout;


// {isOver && (
//   <div className="p-4 rounded-md bg-blue-500 w-96 h-12">
//     <p className="text-white text-sm">Drop here</p>
//   </div>
// )}

// {/* Show Dropped Elements */}
// {droppedElements.map((element, index) => (
//   <div
//     key={index}
//     className="p-4 m-2 bg-gray-200 rounded-md shadow-md"
//   >
//     {element}
//   </div>
// ))}