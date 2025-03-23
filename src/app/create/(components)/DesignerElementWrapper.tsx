"use client";

import { FormElementInstance } from "./FormElement";
import { FormElements } from "./FormElement";

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const DesignerComponent = FormElements[element.type].designerComponent;
  return <DesignerComponent elementInstance={element} />;
}

export default DesignerElementWrapper; 