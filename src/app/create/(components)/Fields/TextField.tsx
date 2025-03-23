"use client"

import { ElementsType, FormElement, FormElementInstance } from "../FormElement";
import { PiTextAlignRight } from "react-icons/pi";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FC } from "react";

const type: ElementsType = "text";

const extraAttributes = {
    label: "Text Field",
    placeholder: "Enter text",
    required: false,
    helperText: "Helper text",
}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
}

const DesignerComponent: FC<{ elementInstance: FormElementInstance }> = ({ elementInstance }) => {
    const element = elementInstance as CustomInstance;
    const { label, placeholder, required, helperText } = element.extraAttributes;
    
    return (
        <div className="flex flex-col gap-2 w-96 mx-auto">
            <Label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-[#6b46c1] ml-1">*</span>}
            </Label>
            <Input 
                readOnly 
                disabled
                type="text" 
                className="w-full h-10 border-[#2a2a40] text-gray-500 placeholder:text-gray-400 focus:ring-[#6b46c1]" 
                placeholder={placeholder} 
            />
            {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
        </div>
    )
}

const FormComponent: FC<{ elementInstance: FormElementInstance }> = ({ elementInstance }) => {
    const element = elementInstance as CustomInstance;
    const { label, placeholder, required, helperText } = element.extraAttributes;
    
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-[#6b46c1] ml-1">*</span>}
            </Label>
            <Input 
                type="text" 
                className="w-full h-10 border-[#2a2a40] text-gray-700 placeholder:text-gray-400 focus:ring-[#6b46c1] focus:border-[#6b46c1]" 
                placeholder={placeholder}
                required={required}
            />
            {helperText && <p className="text-gray-500 text-xs">{helperText}</p>}
        </div>
    )
}

const PropertiesComponent: FC<{ elementInstance: FormElementInstance }> = ({ elementInstance }) => {
    const element = elementInstance as CustomInstance;
    
    return (
        <div className="flex flex-col gap-4 w-full">

            <div className="flex flex-col gap-2">
                <Label className="text-sm text-white">Label</Label>
                <Input 
                    className="bg-[#181828] border-[#2a2a40] text-white"
                    defaultValue={element.extraAttributes.label}
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <Label className="text-sm text-white">Placeholder</Label>
                <Input 
                    className="bg-[#181828] border-[#2a2a40] text-white"
                    defaultValue={element.extraAttributes.placeholder}
                />
            </div>
            
            <div className="flex flex-col gap-2">
                <Label className="text-sm text-white">Helper Text</Label>
                <Input 
                    className="bg-[#181828] border-[#2a2a40] text-white"
                    defaultValue={element.extraAttributes.helperText}
                />
            </div>
            
            <div className="flex items-center gap-2">
                <Label className="text-sm text-white">Required</Label>
                <input 
                    type="checkbox"
                    defaultChecked={element.extraAttributes.required}
                    className="h-4 w-4 accent-[#6b46c1]"
                />
            </div>
        </div>
    )
}

export const TextFieldFormatElement: FormElement = {
    type,
    constructor: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: PiTextAlignRight,
        label: "Text Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
}