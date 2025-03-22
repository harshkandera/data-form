import React from 'react'
import SidebarButton from '../SidebarButton'
import { PiTextAlignRight } from "react-icons/pi";
import useElementStore from '@/src/store/element';

function Text() {
    const { Elements , addItem } = useElementStore();

  return (
    <SidebarButton onClick={() => addItem({ type: "text" })} Icon={PiTextAlignRight} label="Text" />
  )
}

export default Text

export const TextFieldProperties = () => {
    return (
        <div>

        </div>
    )
}