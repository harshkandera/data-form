"use client"

import React, { useState } from 'react'
import SidebarButton from '../SidebarButton'
import { PiTextAlignRight } from "react-icons/pi";
import useElementStore from '@/src/store/element';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// UI Components
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Heading1, Heading2, Bold, Italic, Underline, Strikethrough, Link as LinkIcon, List, ListOrdered, AlignCenter } from 'lucide-react';




export interface IElement {
    id: string;
    type: string;
    label: string;
    required: boolean;
    hidden: boolean;
    disabled: boolean;
    options: {
        helpText: string;
        helpTextPosition: string;
        fieldWidth: string;
        placeholder: string;
    };
    page: number;
    position: number;
    isLayoutBlock: boolean;
}

function Text() {
    
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

    const { Elements, addItem } = useElementStore();

    const handleAddTextElement = () => {
        const newElement: IElement = {
            id: `${Date.now()}`, // Generate a unique ID
            type: "text",
            label: "Text",
            required: false,
            hidden: false,
            disabled: false,
            options: {
                helpText: "",
                helpTextPosition: "above",
                fieldWidth: "full",
                placeholder: ""
            },
            page: 1,
            position: Elements.length + 1, // Place at next position
            isLayoutBlock: false
        };

        addItem(newElement);
        setSelectedElementId(newElement.id); // Select the newly added element
    };

    return (
        <>
            {selectedElementId ? (
                <TextFieldProperties elementId={selectedElementId} onClose={() => setSelectedElementId(null)} />
            ) : (
                <SidebarButton onClick={handleAddTextElement} Icon={PiTextAlignRight} label="Text" />
            )}
        </>
    );
}

export default Text;


// Define the schema for the form
const formSchema = z.object({
  label: z.string().min(1, "Field name is required"),
  required: z.boolean().default(false),
  hidden: z.boolean().default(false),
  disabled: z.boolean().default(false),
  hideFieldName: z.boolean().default(false),
  prefilled: z.string().optional(),
  placeholder: z.string().optional(),
  fieldWidth: z.string().default("Full"),
  helpText: z.string().optional(),
  helpTextPosition: z.string().default("Below input"),
  maxCharacterLimit: z.number().optional().nullable(),
  showCharacterLimit: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

export const TextFieldProperties = ({ elementId, onClose }: { elementId: string, onClose: () => void }) => {

  const { Elements, addItem } = useElementStore();
  
  const currentElement = Elements.find(el => el.id === elementId) as IElement;

  // If no element is selected, don't render
  if (!currentElement) return null;

  // Prepare default values
  const defaultValues: FormValues = {
    label: currentElement.label,
    required: currentElement.required,
    hidden: currentElement.hidden,
    disabled: currentElement.disabled,
    hideFieldName: false, // Add this to your IElement interface
    prefilled: "", // Add this to your IElement interface
    placeholder: currentElement.options.placeholder,
    fieldWidth: currentElement.options.fieldWidth,
    helpText: currentElement.options.helpText,
    helpTextPosition: currentElement.options.helpTextPosition,
    maxCharacterLimit: 2000, // Add this to your IElement interface
    showCharacterLimit: false // Add this to your IElement interface
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = (values: FormValues) => {
    addItem({
      ...currentElement,
      label: values.label,
      required: values.required,
      hidden: values.hidden,
      disabled: values.disabled,
      options: {
        ...currentElement.options,
        placeholder: values.placeholder || "",
        fieldWidth: values.fieldWidth,
        helpText: values.helpText || "",
        helpTextPosition: values.helpTextPosition
      }
    });
  };

  // This effect will update the form when any field changes
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onSubmit(value as FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <div className="p-4 text-gray-800 bg-white">
      <Form {...form}>
        <form onChange={form.handleSubmit(onSubmit)} className="space-y-6">
        <button onClick={onClose} className="mb-2 text-sm text-red-500">Close</button>

          <Tabs defaultValue="options" className="w-full">
            <TabsList className="w-full grid grid-cols-3 bg-gray-100 rounded-md mb-4">
              <TabsTrigger value="options" className="data-[state=active]:bg-[#6b46c1] data-[state=active]:text-white">
                Options
              </TabsTrigger>
              <TabsTrigger value="logic" className="data-[state=active]:bg-[#6b46c1] data-[state=active]:text-white">
                Logic
              </TabsTrigger>
              <TabsTrigger value="validation" className="data-[state=active]:bg-[#6b46c1] data-[state=active]:text-white">
                Validation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-6">
              {/* Field Name */}
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">
                      Field Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-md border-gray-300" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Field State Toggles */}
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="required"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center p-3 border rounded-md">
                      <div className="text-gray-500 text-2xl mb-1">*</div>
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          className="hidden"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600 text-center">Required</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hidden"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center p-3 border rounded-md">
                      <div className="text-gray-500 text-2xl mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          className="hidden"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600 text-center">Hidden</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="disabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center p-3 border rounded-md">
                      <div className="text-gray-500 text-2xl mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" />
                        </svg>
                      </div>
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          className="hidden"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-600 text-center">Disabled</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Customization Section */}
              <div>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mr-2">
                    <path d="M2 12h6" />
                    <path d="M16 12h6" />
                    <path d="M12 2v2" />
                    <path d="M12 8v2" />
                    <path d="M12 14v2" />
                    <path d="M12 20v2" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  <span className="text-gray-600 font-medium">Customization</span>
                </div>
                <Separator className="my-2" />
                
                <FormField
                  control={form.control}
                  name="hideFieldName"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between py-2">
                      <FormLabel className="text-sm text-gray-600">Hide field name</FormLabel>
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Pre-filled value */}
              <FormField
                control={form.control}
                name="prefilled"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Pre-filled value</FormLabel>
                    <div className="border rounded-md">
                      <div className="flex items-center p-2 border-b gap-2">
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Heading1 size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Heading2 size={16} /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Bold size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Italic size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Underline size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Strikethrough size={16} /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><LinkIcon size={16} /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><List size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><ListOrdered size={16} /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><AlignCenter size={16} /></Button>
                      </div>
                      <FormControl>
                        <textarea 
                          {...field} 
                          className="w-full p-2 min-h-[100px] outline-none border-none" 
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              {/* Placeholder */}
              <FormField
                control={form.control}
                name="placeholder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Empty Input Text (Placeholder)</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-md border-gray-300" />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Field Width */}
              <FormField
                control={form.control}
                name="fieldWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Field Width</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full">Full</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Small">Small</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Field Help */}
              <FormField
                control={form.control}
                name="helpText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Field Help</FormLabel>
                    <div className="border rounded-md">
                      <div className="flex items-center p-2 border-b gap-2">
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Heading1 size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Heading2 size={16} /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Bold size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Italic size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Underline size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><Strikethrough size={16} /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><LinkIcon size={16} /></Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><List size={16} /></Button>
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8"><ListOrdered size={16} /></Button>
                      </div>
                      <FormControl>
                        <textarea 
                          {...field} 
                          className="w-full p-2 min-h-[100px] outline-none border-none" 
                        />
                      </FormControl>
                    </div>
                    <FormDescription className="text-gray-500 text-sm mt-1">
                      Your field help will be shown below/above the field, just like this text.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Help Text Position */}
              <FormField
                control={form.control}
                name="helpTextPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Field Help Position</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-md">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Below input">Below input</SelectItem>
                        <SelectItem value="Above input">Above input</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Max character limit */}
              <FormField
                control={form.control}
                name="maxCharacterLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-700">Max character limit</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        value={field.value || ''} 
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                        className="rounded-md border-gray-300" 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Show character limit */}
              <FormField
                control={form.control}
                name="showCharacterLimit"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between py-2">
                    <FormLabel className="text-sm text-gray-600">Always show character limit</FormLabel>
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="logic">
              {/* Logic tab content would go here */}
              <div className="h-20 flex items-center justify-center text-gray-500">
                Logic configuration options will appear here
              </div>
            </TabsContent>

            <TabsContent value="validation">
              {/* Validation tab content would go here */}
              <div className="h-20 flex items-center justify-center text-gray-500">
                Validation configuration options will appear here
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};