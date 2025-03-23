"use client"
import { FormElementInstance } from "../create/(components)/FormElement";
import { createContext ,ReactNode, useState} from "react";

type DesignerContextType = {
    elements: FormElementInstance[];

    addElement:(index:number , element:FormElementInstance) => void;

    removeElement:(elementId:string) => void;

}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({children}:{children:React.ReactNode}){
    const [elements, setElements] = useState<FormElementInstance[]>([]);

    const addElement = (index:number , element:FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        });
    }

    const removeElement = (elementId:string) => {
        setElements((prev) => {
            return prev.filter((element) => element.id !== elementId);
        });
    }

    return (
        <DesignerContext.Provider value={{elements, addElement, removeElement}}>
            {children}
        </DesignerContext.Provider>
    )
}

