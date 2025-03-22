// AIFormGenerator.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X, ArrowLeft, Zap } from "lucide-react";
import {  MailIcon,  PuzzleIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface AIFormGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (formConfig: any) => void;
  onBack: () => void;
}




export const AIFormGenerator: React.FC<AIFormGeneratorProps> = ({
    isOpen,
    onClose,
    onGenerate,
    onBack,
  }) => {
    const [formDescription, setFormDescription] = useState("A simple contact form, with a name, email and message field");
    const [isGenerating, setIsGenerating] = useState(false);
  
    const handleGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        onGenerate({
          title: "Contact Form",
          fields: [
            { type: "text", label: "Name", required: true },
            { type: "email", label: "Email", required: true },
            { type: "textarea", label: "Message", required: true },
          ],
        });
        onClose();
      }, 2000);
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose} >
        <DialogContent  className="px-0 pb-0 pt-0  max-w-md bg-gray-900 border-gray-800 text-white" >
          <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center">
              <button 
                onClick={onBack} 
                className="mr-4 text-gray-400 hover:text-gray-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="bg-blue-900 rounded-full p-4 mr-4">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <DialogTitle className="text-xl font-semibold text-white">
                AI-powered form generator
              </DialogTitle>
              {/* Only one close button */}
              <button 
                onClick={onClose} 
                className="ml-auto text-gray-400 hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="px-6 py-6">
            <div className="space-y-2 mb-4">
              <label className="font-medium text-gray-300">Form Description</label>
              <Textarea 
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Give us a description of the form you want to build (the more details the better)"
                className="min-h-[100px] border border-gray-700 rounded-md px-3 py-2 bg-gray-800 text-white"
              />
              <p className="text-sm text-gray-400">
                Give us a description of the form you want to build (the more details the better)
              </p>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              disabled={isGenerating || !formDescription.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate a form"
              )}
            </Button>
            <div className="w-full text-center text-sm text-gray-400 mt-2">~60 sec</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };



interface FormBaseSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectContactForm: () => void;
  onSelectAIForm: () => void;
  onSelectTemplate: () => void;
}




export const FormBaseSelector: React.FC<FormBaseSelectorProps> = ({
    isOpen,
    onClose,
    onSelectContactForm,
    onSelectAIForm,
  }) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose} > 
        <DialogContent className="px-0 pb-0 pt-0 max-w-md bg-gray-900 border-gray-800 text-white">
           <div className="px-6 py-4 border-b border-gray-800">
            <div className="flex items-center">
              <div className="bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-400 text-xl font-bold">+</span>
              </div>
              <DialogTitle className="text-xl font-semibold text-white">
                Choose a base for your form
              </DialogTitle>
              {/* Only one close button */}
              <button 
                onClick={onClose} 
                className="ml-auto text-gray-400 hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 gap-4">
            <div 
              className="border border-gray-800 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center bg-gray-800/50"
              onClick={onSelectContactForm}
            >
              <MailIcon className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-medium mb-0 text-center text-white">Start from a simple form</h3>
            </div>
            
            <div 
              className="border border-gray-800 rounded-lg p-6 cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center bg-gray-800/50"
              onClick={onSelectAIForm}
            >
              <Zap className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-lg font-medium mb-0 text-center text-white">Use our AI to create the form</h3>
              <p className="text-sm text-gray-400 mt-1">(1 min)</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };


import { PlusCircle } from "lucide-react";
import SearchBar from "../(components)/search";
import FormCard from "../(components)/FormCard";


function FormsPage() {
  const handlequery = (query: string) => {
    console.log(query);
  };

  const [isBaseSelectorOpen, setIsBaseSelectorOpen] = useState(false);
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const [formConfig, setFormConfig] = useState(null);

  const handleGenerateForm = (config: any) => {
    setFormConfig(config);
  
  };

  const handleSelectAIForm = () => {
    setIsBaseSelectorOpen(false);
    setIsAiGeneratorOpen(true);
  };

  const handleSelectContactForm = () => {
    setIsBaseSelectorOpen(false);
    // Implement contact form creation logic
    console.log("Creating a contact form");
  };

  const handleSelectTemplate = () => {
    setIsBaseSelectorOpen(false);
    // Implement template selection logic
    console.log("Opening template selector");
  };

  const handleBackToBaseSelector = () => {
    setIsAiGeneratorOpen(false);
    setIsBaseSelectorOpen(true);
  };

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="text-3xl text-white font-bold">Your Forms</div>
          <p className="text-gray-400 text-sm">
            manage your forms and submissions
          </p>
        </div>

        <Button
          size="lg"
          className="bg-indigo-600 font-medium hover:bg-indigo-700 text-white rounded-md"
          onClick={() => setIsBaseSelectorOpen(true)}
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create a new form
        </Button>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={handlequery} />
      </div>

      <div>
        <FormCard />
      </div>

      {/* Form Base Selector Dialog */}
      <FormBaseSelector 
        isOpen={isBaseSelectorOpen}
        onClose={() => setIsBaseSelectorOpen(false)}
        onSelectContactForm={handleSelectContactForm}
        onSelectAIForm={handleSelectAIForm}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* AI Form Generator Dialog */}
      <AIFormGenerator 
        isOpen={isAiGeneratorOpen}
        onClose={() => setIsAiGeneratorOpen(false)}
        onGenerate={handleGenerateForm}
        onBack={handleBackToBaseSelector}
      /> 
    </div>
  );
}

export default FormsPage;