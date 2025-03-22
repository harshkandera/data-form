import React from 'react'
import { FormElement } from './FormElement'
import { Button } from '@/components/ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    }
  })

  return (
    <Button 
      variant="ghost" 
      className={cn(
        'w-60 h-12 flex items-center gap-3 px-4  text-sm font-medium text-gray-200 rounded-lg hover:bg-indigo-600/20 hover:text-white transition-colors',
        draggable.isDragging && 'ring-2 ring-indigo-500 bg-indigo-700/30'
      )}
      {...draggable.listeners}
      {...draggable.attributes}
      ref={draggable.setNodeRef}
    >
      <div className='h-8 w-8 rounded-md bg-indigo-500/20 flex justify-center items-center text-indigo-400'>
        <Icon className="h-4 w-4" />
      </div>
      <span>{label}</span>
    </Button>
  )
}

export default SidebarBtnElement






export function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    }
  })

  return (
    <Button 
      variant="ghost" 
      className=
        'w-60 h-12 flex items-center gap-3 px-4  text-sm font-medium text-gray-200 rounded-lg hover:bg-indigo-600/20 hover:text-white transition-colors'
      {...draggable.listeners}
      {...draggable.attributes}
      ref={draggable.setNodeRef}
    >
      <div className='h-8 w-8 rounded-md bg-indigo-500/20 flex justify-center items-center text-indigo-400'>
        <Icon className="h-4 w-4" />
      </div>
      <span>{label}</span>
    </Button>
  )
}




