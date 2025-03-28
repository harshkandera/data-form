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
import { BiSolidTrash } from "react-icons/bi";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RxCross2 } from "react-icons/rx";
import { IoIosExpand } from "react-icons/io";
import { useDroppable, useDndMonitor, DragEndEvent, useDraggable, useSensors, MouseSensor } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { IForm } from "../../../models/Form";
import { Separator } from "@/components/ui/separator";
import { DndContext } from "@dnd-kit/core";
import SidebarBtnElement from "../(components)/SidebarBtnElement";
import { FormElements, ElementsType, FormElementInstance } from "../(components)/FormElement";
import DragOverlayWraapper from "../(components)/DragOverlayWraapper";
import useDesigner from "@/src/hooks/useDesigner";
import { nanoid } from "nanoid";

const DesignerComponent = () => {
  const [open, setOpen] = useState(false);
  const { elements, addElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  console.log(elements);

  useDndMonitor({
    onDragEnd: (e: DragEndEvent) => {
      const { active, over } = e;
      if(!active || !over) return;
      
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      if(isDesignerBtnElement){
        const type = active.data?.current?.type as ElementsType;
        const newElement = FormElements[type].constructor(nanoid());
        addElement(0, newElement);
      }
    }
  });

  return (
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
            droppable.isOver && "ring-2 ring-blue-500"
          )}
          ref={droppable.setNodeRef}
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

            {droppable.isOver && (
              <div className="p-4 rounded-md bg-blue-500 mt-4 w-96 mx-auto h-12">
                <p className="text-white text-sm">Drop here</p>
              </div>
            )}

            {elements.length > 0 && <div>
              {
                elements.map((element) => {
                  return <DesignerElementWrapper key={element.id} element={element} />
                })
              }
            </div>
            }

          </div>
          <div></div>
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
                <RxCross2 className="h-4 w-40" />
              </Button>
              <h3 className="text-lg ml-20 font-medium text-white">
                Add Block
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              <SidebarBtnElement formElement={FormElements.text} />
            </div>
          </div>
        </div>
      </div>
      <DragOverlayWraapper />
    </div>
  );
};

const FormBuilderLayout = ({form}:{form:IForm}) => {
  const sensors = useSensors(
    {
      sensor: MouseSensor,
      options: {
        activationConstraint: {
          distance: 10
        }
      }
    }
  );

  return (
    <DndContext sensors={sensors}>
      <DesignerComponent />
    </DndContext>
  );
};

export default FormBuilderLayout;


function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const { removeElement } = useDesigner();

  const draggable = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      isDesignerElement: true,
      elementId: element.id,
    }
  });

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    }
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    }
  });
  
  const DesignerElement = FormElements[element.type].designerComponent;

  return (
    <div 
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-md ring-1 ring-inset ring-[#2a2a40] my-2"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      {/* Drop zones - invisible unless active */}
      <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="absolute bottom-0 w-full h-1/2 rounded-b-md" />

      {/* Hover controls */}
      {mouseIsOver && (
        <>
          <div className="absolute right-2 top-2 z-10">
            <Button 
              variant="outline" 
              className="w-8 h-8 p-0 rounded-full  text-white"
              onClick={() => {
                removeElement(element.id);
              }}

            >
              <BiSolidTrash className="w-4 h-4" />
            </Button>
          </div>
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse z-10"> 
            <p className="text-sm text-white bg-[#181828] px-2 py-1 rounded-md">Click for properties</p>
          </div> */}
        </>
      )}

      {/* Drop indicators */}
      {topHalf.isOver && (
        <div className="absolute top-0 left-0 w-full h-1 bg-[#6b46c1] rounded-t-md z-20" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#6b46c1] rounded-b-md z-20" />
      )}

      {/* Main content area */}
      <div className={cn(
        "flex w-full h-full items-center rounded-md bg-white px-4 py-2 pointer-events-none",
        mouseIsOver && "bg-opacity-95",
        draggable.isDragging && "ring-2 ring-[#6b46c1] opacity-50",
        topHalf.isOver && "border-t-2 border-t-[#6b46c1]",
        bottomHalf.isOver && "border-b-2 border-b-[#6b46c1]",
      )}>
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}