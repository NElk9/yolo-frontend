import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 下载base64图片
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

// 寻找小数，转化成百分比形式的字符串 小数点后两位
export function extractPercentage(result: string): string {
  const match = result.match(/([0-9]*\.[0-9]+)/)
  if (!match) return '--'

  const num = parseFloat(match[1])
  if (isNaN(num)) return '--'

  // 转百分比，保留两位小数，返回字符串（不带 %）
  return (num * 100).toFixed(2)
}

export function getImgSrc(src: string): string {
  const isProd = process.env.NODE_ENV === 'production'
  // return isProd ? '/yolo-frontend' + src : src
  return src
}
