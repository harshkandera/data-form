export type ElementsType = "text";
import { TextFieldFormatElement } from "./Fields/TextField";

export type FormElement = {
  type: ElementsType;

  constructor : (id:string) => FormElementInstance;

  designerBtnElement:{
    icon: React.ElementType;
    label: string;
  }
  designerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

type FormElementsType ={
    [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
    text: TextFieldFormatElement,

}


export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};


