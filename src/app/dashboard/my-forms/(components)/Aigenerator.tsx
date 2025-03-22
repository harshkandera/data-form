"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface AIFormGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (formConfig: any) => void;
}

const AIFormGenerator: React.FC<AIFormGeneratorProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [formDescription, setFormDescription] = useState<string>("A simple contact form, with a name, email and message field");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">AI-powered form generator</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="py-4">
          <label className="block text-sm font-medium mb-2">Form Description</label>
          <Textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Give us a description of the form you want to build (the more details the better)"
            className="min-h-[100px]"
          />
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-blue-600 hover:bg-blue-700"
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
          <div className="w-full text-center text-sm text-gray-500">~60 sec</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIFormGenerator;