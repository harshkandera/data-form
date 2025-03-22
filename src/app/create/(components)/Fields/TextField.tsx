"use client"

import { ElementsType , FormElement} from "../FormElement";
import { PiTextAlignRight } from "react-icons/pi";

const type: ElementsType = "text";

export const TextFieldFormatElement:FormElement ={
type,
constructor : (id:string) => ({
    id,
    type,
    extraAttributes:{
        label: "Text Field",
        placeholder: "Enter text",
        required: false,
        helperText: "Helper text",
    }
}),
designerBtnElement:{
    icon: PiTextAlignRight,
    label: "Text Field",
},
designerComponent:() => <div></div>,
formComponent:() => <div></div>,
propertiesComponent:() => <div></div>,
}
