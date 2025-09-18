// 上传组件封装
import { useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Button } from '@/components/ui/button'
import { useImageStore } from '@/store/useImageStore'

interface UploadProps {
  children?: React.ReactNode
  multiple?: boolean // 是否支持多选
  directory?: boolean // 是否支持文件夹上传
  accept?: string // 文件类型限制
  maxSize?: number // 文件大小限制(字节)
  minWidth?: number // 最小宽度
  minHeight?: number // 最小高度
  maxWidth?: number // 最大宽度
  maxHeight?: number // 最大高度
  onStart?: (files: File[]) => boolean | File[] // 开始上传回调
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const acceptType = [
  'image/*', // 添加通配符确保显示所有图片文件
].join(',')

const Upload: React.FC<UploadProps> = ({
  children,
  multiple = false,
  directory = false,
  accept = acceptType,
  minWidth = 1024,
  minHeight = 1024,
  onStart,
  handleFileChange,
  // ...其他props
}) => {
  // 点击上传按钮时触发
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleClicks = () => {
    // 触发文件选择框的点击事件
    fileInputRef.current?.click()
  }

  return (
    <div className="contents" onClick={handleClicks}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
        style={{ display: 'none' }}
        {...(directory
          ? {
              webkitdirectory: 'true',
              // directory: 'true',
            }
          : {})}
      />
      {children || <Button>点击上传</Button>}
    </div>
  )
}

export default Upload
