import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Image } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import ImgIcon from '@/assets/demo/img.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Upload from '@/components/Upload'
import { compare, predict } from '@/lib/api/predict'
import { EXAMPLE_IMAGES, ExampleImgData } from '@/lib/const'
import { useImageStore } from '@/store/useImageStore'

// 这个组件用于上传原图和印章对比图
type UploadType = 'original' | 'compare'

export default function UploadPanel({ type }: { type: UploadType }) {
  const [file, setFile] = useState<File | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [sessionId, setOriginalImgFile, setFromDetect, setCompareImgFile, setFromCompare] =
    useImageStore(
      useShallow((state) => [
        state.sessionId,
        state.setOriginalImgFile,
        state.setFromDetect,
        state.setCompareImgFile,
        state.setFromCompare,
      ]),
    )
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
  }
  // 进行步骤1和2
  const startPredict = async (uploadFile: File) => {
    const data = await predict(uploadFile)
    if (data.status === 'success') {
      // 提取真伪输出结果和概率 输出样例  分类结果：true_sea（置信度：95.93%)
      const result = data.crossvit_output
      // 提取真假
      const isTrue: boolean = /true/i.test(result)
      // 提取置信度
      const authenticity: string = result.match(/置信度[:：]\s*([\d.]+)%/)?.[1] ?? '--'
      // 返回裁剪图片、预处理图片、真伪输出、sessionId再保存
      setFromDetect({
        authenticity: authenticity,
        isTrue: isTrue,
        preprocessedImgBase64: data.preprocessed_cropped_image,
        sessionId: data.session_id,
        croppedImgBase64: data.original_cropped_image,
      })
    } else {
      toast('处理失败')
      console.error(data.error)
    }
  }
  const startCompare = async (uploadFile: File) => {
    const formData = new FormData()
    formData.append('image', uploadFile)
    if (sessionId) formData.append('session_id', sessionId)
    const data = await compare(formData)
    if (data.status === 'success') {
      const result = data.mathmethod_output
      const isSame: boolean = !result.includes('不一致')
      // TODO: 提取一致性概率，setFromCompare
    } else {
      toast('印章匹配失败')
      console.error(data.error)
    }
  }
  // 点击 开始预测/开始匹配 按钮：统一example和file格式 发送请求
  const handleClickStart = async () => {
    // 如果file和预览url都空，说明没有选择图片，toast报错
    if (!previewURL) {
      toast.error('请选择图片')
      return
    }
    setLoading(true)
    let uploadFile: File | null = file
    // 如果只有flie空，说明选中的是示例图片，先转化成file格式
    if (!uploadFile) {
      const res = await fetch(previewURL) // public/example.jpg
      const blob = await res.blob()
      uploadFile = new File([blob], 'example.jpg', { type: blob.type })
    }
    const saveImgFile = type === 'original' ? setOriginalImgFile : setCompareImgFile
    const startFunc = type === 'original' ? startPredict : startCompare
    // 保存图片 然后调用接口并处理接口返回结果
    saveImgFile(uploadFile)
    try {
      await startFunc(uploadFile)
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      setLoading(false)
    }
  }
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
            <Upload handleFileChange={handleFileChange}>
              <Button disabled={loading}>点击上传</Button>
            </Upload>
            <Button onClick={handleClickStart} disabled={loading}>
              {type === 'original' ? '开始预测' : '开始匹配'}
            </Button>
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
                    src={type === 'original' ? image.originalImgPath : image.compareImgPath}
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
