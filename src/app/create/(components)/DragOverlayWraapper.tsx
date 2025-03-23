"use client";

import { useDndMonitor, DragOverlay, Active } from "@dnd-kit/core";
import React, { useState } from "react";
import SidebarBtnElementDragOverlay from "./SidebarBtnElement";
import { ElementsType, FormElements } from "./FormElement";
import useDesigner from "@/src/hooks/useDesigner";

function DragOverlayWraapper() {
  const {elements} = useDesigner();

  const [draggingItem, setDraggingItem] = useState<Active | null>(null);
  useDndMonitor({
    onDragStart: (event) => {
        setDraggingItem(event.active);
    },
    onDragCancel:()=>{
        setDraggingItem(null)
    },
    onDragEnd:()=>{
        setDraggingItem(null);
    }
  });

  if(!draggingItem) return null;

  let node = <div>No drag overlay </div>;
  const isSidebarBtnElement = draggingItem?.data?.current?.isDesignerBtnElement;

  if(isSidebarBtnElement){
    const type = draggingItem?.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggingItem?.data?.current?.isDesignerElement;

  if(isDesignerElement){
   const elementId = draggingItem?.data?.current?.elementId;
   const element = elements.find((element) => element.id === elementId);
   if(!element) {
     node = <div>Element not found</div>;
   } else {
     const DesignerElementComponent = FormElements[element.type as ElementsType].designerComponent;

     node =  <div className="flex bg-accent border rounded-md h-[100px] w-full py-2 px-4 opacity-80">
      <DesignerElementComponent elementInstance={element} />
      </div>
   }
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWraapper;
