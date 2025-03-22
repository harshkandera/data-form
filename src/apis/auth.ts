import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiConnector } from "@/lib/apiConnector";
import axios from "axios";

//Sign up

const SendOtp = async (data: any) => {
  try {
    return await apiConnector("POST", "/api/auth/send-otp", data);
  } catch (error: unknown) {
    
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred.");
  }
};



export const useSendOtp = () => {
  return useMutation({
    mutationFn: SendOtp,
  });
};

//verify otp
const VerifyOtp = async (data: any) => {
  const response = await apiConnector("POST", "/api/auth/verify-otp", data);
  return response;
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: VerifyOtp,
  });
};
