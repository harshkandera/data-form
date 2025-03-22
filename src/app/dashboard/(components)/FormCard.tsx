import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, PenLine, MoreHorizontal, Calendar, Users } from 'lucide-react';

const FormCardGrid = () => {
  // Sample data for demonstration
  const forms = [
    { 
      id: 1, 
      title: "Customer Feedback Form", 
      description: "Collect feedback from customers about our services",
      responses: 24, 
      created: "Mar 12, 2025", 
      views: 142 
    },
    { 
      id: 2, 
      title: "Event Registration", 
      description: "Sign up form for the annual tech conference",
      responses: 156, 
      created: "Mar 15, 2025", 
      views: 384 
    },
    { 
      id: 3, 
      title: "Job Application", 
      description: "Apply for open positions at our company",
      responses: 47, 
      created: "Mar 10, 2025", 
      views: 218 
    },
    { 
      id: 4, 
      title: "Newsletter Signup", 
      description: "Subscribe to our weekly newsletter",
      responses: 319, 
      created: "Mar 05, 2025", 
      views: 726 
    }
  ];
  
  return (
    <div className="bg-[#0f0f1a] rounded-md mt-10 p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
       
        <div className="grid grid-cols-1  gap-4">
          {forms.map((form) => (
            <div key={form.id} className="w-full">
              <Card className="bg-[#181828] border-[#2a2a40] hover:border-[#6b46c1] transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-medium text-base truncate">{form.title}</h3>
                    <div className="flex flex-col items-end">
                      <Badge className="bg-[#6b46c1] hover:bg-[#5a3ca6] mb-1">Published</Badge>
                      <span className="text-xs text-gray-400">{form.responses} responses</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="bg-[#14141f] border border-dashed border-[#2a2a40] rounded-md p-4 mb-3">
                    <div className="flex flex-col">
                      <h4 className="text-white font-medium text-sm mb-2">{form.title}</h4>
                      <p className="text-gray-400 text-xs">{form.description}</p>
                    </div>
                    
                    <div className="flex items-center mt-3 pt-3 border-t border-[#2a2a40]">
                      <div className="flex items-center mr-4">
                        <Calendar size={14} className="text-gray-400 mr-1" />
                        <span className="text-gray-400 text-xs">{form.created}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="text-gray-400 mr-1" />
                        <span className="text-gray-400 text-xs">{form.responses}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center pt-0">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Created: {form.created}</span>
                    <span className="text-xs text-gray-400">{form.views} views</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#6b46c1]">
                      <PenLine size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#6b46c1]">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#6b46c1]">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormCardGrid;