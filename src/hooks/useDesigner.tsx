import React,{useContext} from 'react'
import { DesignerContext } from '../app/context/DesignerContextType'

function useDesigner() {
    const context = useContext(DesignerContext);

    if(!context){
        throw new Error("useDesigner must be used within a DesignerContextProvider");
    }
    
  return context;
}

export default useDesigner