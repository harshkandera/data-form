


"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Particles from "@/components/ui/particles";
import GoogleSignIn from "@/components/googleSignIn";
import { googleSignIn } from "@/lib/action";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {toast} from 'sonner'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

// Define the form validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

type FormValues = z.infer<typeof formSchema>;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const { data: session, status } = useSession();
  console.log("Session:", session, "Status:", status);
  const isAuthenticated = status === "authenticated";

  if(isAuthenticated){
    redirect('/')
  }
  

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
  
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Prevents NextAuth from redirecting automatically
      });
  
      console.log("SignIn Result:", result);
  
      if (result?.error) {
        toast.error(result.error); 
        return; 
      }
  
      toast.success("Logged In Successfully");
      redirect('/dashboard')
  
      // console.log("Login submitted with:", data);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="w-full relative min-h-screen flex overflow-y-hidden">

    <Particles className="w-full absolute" />
    <div className="relative flex-1 hidden items-center justify-center min-h-screen bg-transparent lg:flex">

    <div className="absolute -z-1 inset-0  h-full w-full bg-transparent opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

    <div className="relative z-10 w-full max-w-lg">
        <img
         src="https://farmui.com/logo-dark.svg"
         width={100}
         className="rounded-full"
       />
       <div className=" mt-10 space-y-3">
         <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-normal  tracking-tighter">
           Start growing your business quickly
         </h3>

         <Separator className="h-px bg-white/20 w-[100px] mr-auto" />
         <p className="text-gray-300 text-md md:text-xl font-geist tracking-tight">
           Create an account and get access to all features for 14-days, No
           credit card required.
         </p>
         <div className="flex items-center -space-x-2 overflow-hidden">
           <img
             src="https://randomuser.me/api/portraits/women/79.jpg"
             className="w-10 h-10 rounded-full border-2 border-white"
           />
           <img
             src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
             className="w-10 h-10 rounded-full border-2 border-white"
           />
           <img
             src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
             className="w-10 h-10 rounded-full border-2 border-white"
           />
           <img
             src="https://randomuser.me/api/portraits/men/86.jpg"
             className="w-10 h-10 rounded-full border-2 border-white"
           />
           <img
             src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
             className="w-10 h-10 rounded-full border-2 border-white"
           />
           <p className="text-sm text-gray-400 font-medium translate-x-5">
             Join 5.000+ users
           </p>
         </div>
       </div>
     </div>
     <div
       className="absolute inset-0 my-auto h-full"
       style={{
         background:
           "linear- gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
         filter: "blur(118px)",
       }}
     >
       <div className="absolute  inset-0 opacity-15  w-full w bg-transparent  bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
       <img
         className="absolute inset-x-0 -top-20 opacity-25 "
         src={
           "https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
         }
         width={1000}
         height={1000}
         alt="back bg"
       />
     </div>
   </div>
   <div className="flex-1 relative flex items-center justify-center min-h-full">
     <img
       className="absolute inset-x-0 -z-1 -top-20 opacity-75 "
       src={
         "https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
       }
       width={1000}
       height={1000}
       alt="back bg"
     />
     <div className="w-full max-w-md md:max-w-lg space-y-8 px-4  text-gray-600 sm:px-0 z-20">
       <div className="relative">
         <img
           src="https://farmui.com/logo.svg"
           width={100}
           className="lg:hidden rounded-full"
         />
         <div className="mt-5 space-y-2">
           <h3 className="text-gray-200 text-3xl  font-semibold tracking-tighter sm:text-4xl">
             Login - Continue journey
           </h3>
           <p className="text-gray-400">
             Do not have an account?{" "}
             <Link
               href="/sign-up"
               className="font-medium text-indigo-600 hover:text-indigo-500"
             >
               Sign-up
             </Link>
           </p>
         </div>
       </div>


       <div className="">
         <form
           action={googleSignIn}
           className="w-full flex col-span-1"
         >
           <GoogleSignIn />
         </form>
       </div>




       <Separator className="h-px bg-white/20" />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 z-20"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-100/50 font-geist">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="w-full mt-2 px-3 py-6 text-gray-200 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-100/50 font-geist">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="w-full mt-2 px-3 py-6 text-gray-200 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-4 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-2"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;



