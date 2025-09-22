import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadBase64Image(base64Data: string, fileName = 'image.png') {
  if (!base64Data) return

  // 创建 a 标签
  const link = document.createElement('a')
  link.href = base64Data
  link.download = fileName
  link.target = '_self'

  // 触发下载
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
