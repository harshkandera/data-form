"use client";

import { useDndMonitor, DragOverlay, Active } from "@dnd-kit/core";
import React, { useState } from "react";
import SidebarBtnElementDragOverlay from "./SidebarBtnElement";
import { ElementsType, FormElements } from "./FormElement";

function DragOverlayWraapper() {
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
  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWraapper;
