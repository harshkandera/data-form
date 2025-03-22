import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Redis } from '@upstash/redis'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

