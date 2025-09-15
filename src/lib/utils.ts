import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// clsx类名拼接，twMerge合并冲突类
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
