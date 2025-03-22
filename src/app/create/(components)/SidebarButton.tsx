import React from 'react'
import { Button } from '@/components/ui/button'
function SidebarButton({Icon,label,onClick}:{Icon:React.ElementType,label:string,onClick:()=>void}) {
  return (
    <Button 
    variant="ghost" 
    className=
      'w-60 h-12 flex items-center gap-3 px-4  text-sm font-medium text-gray-200 rounded-lg hover:bg-indigo-600/20 hover:text-white transition-colors'
      onClick={onClick}
  >
    <div className='h-8 w-8 rounded-md bg-indigo-500/20 flex justify-center items-center text-indigo-400'>
      <Icon className="h-4 w-4" />
    </div>
    <span>{label}</span>
  </Button>
    )
}

export default SidebarButton