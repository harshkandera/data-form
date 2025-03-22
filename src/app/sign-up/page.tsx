"use client";

import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Particles from "@/components/ui/particles";
// import { signIn } from "@/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, SendIcon, LoaderCircle, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import GoogleSignIn from "@/components/googleSignIn";
import { googleSignIn } from "@/lib/action";
import { useSendOtp , useVerifyOtp } from "@/src/apis/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import CountdownTimer from "@/components/otp-counter";
import { useRouter } from "next/navigation";
import Link from 'next/link'

// Define the form validation schema
const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// OTP validation schema
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "Your one-time password must be exactly 6 digits." })
    .regex(/^\d+$/, { message: "OTP must contain only numbers." }),
});

type FormValues = z.infer<typeof formSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [otpExpired, setOtpExpired] = useState(false);
  const router = useRouter();

  const {
    mutate: sendOtp,
    isPending: isSendingOtp,
    isSuccess,
    error:otpError,
  } = useSendOtp();

  const {
    mutate: verifyOtp,
    isPending: isVerifyingOtp,
    isSuccess: isVerified,
    error: verifyError,
  } = useVerifyOtp();
  

  // Initialize main registration form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Initialize OTP form
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle main form submission
  const onSubmit = (data: FormValues) => {
    setFormData(data);

    const resendPromise = new Promise((resolve, reject) => {
      sendOtp(data, {
        onSuccess: () => {
          setShowOtpStep(true);
          resolve("OTP sent successfully");
        },
        onError: (error) => {
          console.log("Error verifying OTP:", error);
          console.log("Error with otp:", otpError);
          reject(error)},
      });
    });

    toast.promise(resendPromise, {
      loading: "Sending OTP...",
      success: () => {
        return "OTP sent successfully";
      },
      error: otpError?.message || "Failed to send OTP. Please try again.",
    });
  };



  // Handle OTP verification
  const handleVerifyOtp = (data: OtpFormValues) => {

    try {

      const resendPromise = new Promise((resolve, reject) => {
        verifyOtp({
          otp: data.otp,
          email: formData?.email
        }, {
          onSuccess: () => {
            router.push("/login");
            resolve("Verification successful");
            
          },
          onError: (error) => {
            reject(error);
          },
        });
      });
  
      toast.promise(resendPromise, {
        loading: "Verifying OTP...",
        success: () => {
          return "Verification successful";
        },
        error: verifyError || "Failed to verify OTP. Please try again.",
      });
  

    } catch (error) {
      console.log("Error verifying OTP:", error);
    }
    
  };

  // Handle resend OTP
  const handleResendOtp = () => {
    if (formData) {
      const resendPromise = new Promise((resolve, reject) => {
        sendOtp(formData, {
          onSuccess: () => resolve("OTP sent successfully"),
          onError: (error) => reject(error),
        });
      });

      toast.promise(resendPromise, {
        loading: "Sending OTP...",
        success: () => {
          return "OTP sent successfully";
        },
        error: "Failed to send OTP. Please try again.",
      });
    }
  };

  const handleOtpTimeout = useCallback(() => {
    setOtpExpired(true);
    toast("OTP Expired", {
      description:
        "Your verification code has expired. Click 'Resend Code' to get a new one.",
    });
  }, []);

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
          className="absolute inset-x-0 -z-1 -top-20 opacity-75"
          src="https://pipe.com/_next/image?url=%2Fassets%2Fimg%2Fhero-left.png&w=384&q=75"
          width={1000}
          height={1000}
          alt="back bg"
        />

        <div className="w-full max-w-md md:max-w-lg space-y-8 px-4 text-gray-600 sm:px-0 z-20">
        <div className="relative">
         <img
           src="https://farmui.com/logo.svg"
           width={100}
           className="lg:hidden rounded-full"
         />
         <div className="mt-5 space-y-2">
           <h3 className="text-gray-200 text-3xl  font-semibold tracking-tighter sm:text-4xl">
             Sign up - Start your journey
           </h3>
           <p className="text-gray-400">
             Already have an account?{" "}
             <Link
               href="/login"
               className="font-medium text-indigo-600 hover:text-indigo-500"
             >
              Sign-In
             </Link>
           </p>
         </div>
       </div>

          {!showOtpStep ? (
            <>
              <div className="">
                <form action={googleSignIn} className="w-full flex col-span-1">
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-100/50 font-geist">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full mt-2 px-3 py-6 text-lg font-medium text-gray-200 bg-transparent outline-none border focus:border-purple-600 shadow-sm rounded-lg"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

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

                  <Button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-4 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-2"
                  >
                    {isSendingOtp
                      ? "Sending verification code..."
                      : "Create account"}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <div className="space-y-5 z-20 ">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowOtpStep(false)}
                className="flex-1 bg-transparent h-10 border-gray-600 text-gray-200 hover:bg-gray-800 hover:text-gray-100"
              >
                <ArrowLeft />
              </Button>
              <div className="text-center pb-10">
                <h2 className="text-2xl font-bold text-gray-100 mb-2">
                  Verify Your Email
                </h2>
                <p className="text-gray-300">
                  We've sent a 6-digit verification code to{" "}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <SendIcon className="text-gray-400 w-5" />
                  <span className="font underline cursor-pointer text-gray-400">
                    {formData?.email}
                  </span>
                </div>
              </div>

              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                  className="space-y-5"
                >
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="space-y-4 flex items-center flex-col">
                        <FormLabel className="font-medium text-gray-100/70 font-geist">
                          Enter Verification Code
                        </FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} pattern="[0-9]*" {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot
                                index={0}
                                className="text-gray-200 border-gray-500  bg-transparent"
                              />
                              <InputOTPSlot
                                index={1}
                                className="text-gray-200 border-gray-500 bg-transparent"
                              />
                              <InputOTPSlot
                                index={2}
                                className="text-gray-200 border-gray-500 bg-transparent"
                              />
                              <InputOTPSlot
                                index={3}
                                className="text-gray-200  border-gray-500 bg-transparent"
                              />
                              <InputOTPSlot
                                index={4}
                                className="text-gray-200 border-gray-500 bg-transparent"
                              />
                              <InputOTPSlot
                                index={5}
                                className="text-gray-200 border-gray-500 bg-transparent"
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 items-center justify-center mt-2">
                    <p className="text-gray-500 text-sm ">OTP expires in</p>
                    <CountdownTimer
                      initialMinutes={5}
                      initialSeconds={0}
                      start={isSuccess}
                      onTimeout={handleOtpTimeout}
                    />
                  </div>
                  <div className="text-center text-sm">
                    <p className="text-gray-300">
                      Didn't receive the code?{" "}
                      <Button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                        variant="link"
                        disabled={isSendingOtp || !otpExpired}
                      >
                        Resend Code
                        {isSendingOtp && (
                          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        )}
                      </Button>
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={isVerifyingOtp}
                      className="w-full font-geist tracking-tighter text-center rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-4 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70 flex items-center justify-center gap-2"
                    >
                      Verify
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="pt-4">
                <p className="text-sm text-gray-400 text-center">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
