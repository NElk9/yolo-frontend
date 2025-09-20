import { useEffect, useState } from 'react'
import { Image } from 'antd'
import ImgIcon from '@/assets/demo/img.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Upload from '@/components/Upload'
import { EXAMPLE_IMAGES, ExampleImgData } from '@/lib/const'

export default function UploadPanel() {
  const [file, setFile] = useState<File | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  // 用户上传本地图片
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setPreviewURL(selectedFile ? URL.createObjectURL(selectedFile) : null)
  }
  // 用户上传图片后同步得到预览url
  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreviewURL(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file])
  // 点击示例图片，清除file并切换预览url
  const handleClickExample = (exampleImg: ExampleImgData) => {
    setFile(null)
    setPreviewURL(exampleImg.originalImgPath)
    console.log('exampleImg is clicked')
  }
  // 点击 开始预测 按钮：统一example和file格式 发送请求
  const handleClickPredict = () => {}
  return (
    <Card className={'w-full h-full bg-white'}>
      <CardContent className={'h-full flex justify-between items-center gap-6'}>
        <div className={'w-5/6 self-stretch flex flex-col justify-between gap-5'}>
          <div
            className={
              'w-full h-9/10 overflow-hidden rounded-2xl bg-gray-200 flex justify-center items-center'
            }
          >
            {previewURL ? (
              <Image src={previewURL} className={'w-full h-full object-cover object-center'} />
            ) : (
              <ImgIcon />
            )}
          </div>
          <div className={'flex justify-center items-center gap-5'}>
            <Upload handleFileChange={handleFileChange} />
            <Button>开始预测</Button>
          </div>
        </div>
        <div className={'w-1/6 self-stretch flex flex-col gap-4 justify-between items-center'}>
          <div className={'font-semibold'}>示例图片</div>
          <ScrollArea className={'w-full h-full'}>
            <div className={'flex flex-col gap-4'}>
              {EXAMPLE_IMAGES.map((image, index) => (
                <div
                  key={index}
                  className={'w-full aspect-square rounded-2xl overflow-hidden cursor-pointer'}
                  onClick={() => handleClickExample(image)}
                >
                  <img
                    src={image.originalImgPath}
                    className={'w-full h-full object-cover object-center'}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
