import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Image } from 'antd'
import NextImage from 'next/image'
import { useShallow } from 'zustand/react/shallow'
import ImgIcon from '@/assets/demo/img.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import Upload from '@/components/Upload'
import { compare, predict } from '@/lib/api/predict'
import {
  EXAMPLE_COMPARE_IMAGES,
  EXAMPLE_IMAGES,
  ExampleImgData,
  ImageData,
  ProcessStage,
} from '@/lib/const'
import { extractPercentage } from '@/lib/utils'
import { useExampleStore } from '@/store/useExampleStore'
import { useImageStore } from '@/store/useImageStore'

// 这个组件用于上传原图和印章对比图
type UploadType = 'original' | 'compare'

export default function UploadPanel({ type }: { type: UploadType }) {
  const [file, setFile] = useState<File | null>(null)
  const [example, setExample] = useState<ImageData | ExampleImgData | null>(null)
  const [previewURL, setPreviewURL] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [exampleId, setExampleId] = useExampleStore(
    useShallow((state) => [state.exampleId, state.setExampleId]),
  )
  const [
    sessionId,
    setOriginalImgFile,
    setFromDetect,
    setCompareImgFile,
    setFromCompare,
    clear,
    clearCompare,
    setStage,
  ] = useImageStore(
    useShallow((state) => [
      state.sessionId,
      state.setOriginalImgFile,
      state.setFromDetect,
      state.setCompareImgFile,
      state.setFromCompare,
      state.clear,
      state.clearCompare,
      state.setStage,
    ]),
  )
  const exampleImgs: ImageData[] | ExampleImgData[] =
    type === 'original' ? EXAMPLE_IMAGES : EXAMPLE_COMPARE_IMAGES
  // 用户上传本地图片
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    setFile(selectedFile)
    setPreviewURL(selectedFile ? URL.createObjectURL(selectedFile) : null)
  }
  // 用户上传图片后同步得到预览url
  useEffect(() => {
    // 每次file变化，说明图片变化，此时清空store
    if (type === 'original') {
      clear()
    } else if (type === 'compare') {
      clearCompare()
    }
    if (!file) return
    // file不空 说明没有选中示例图 示例图置空
    setExample(null)
    setExampleId(null)
    const url = URL.createObjectURL(file)
    setPreviewURL(url)
    return () => {
      URL.revokeObjectURL(url)
    }
  }, [file, example])
  // 点击示例图片，清除file并切换预览url
  const handleClickExample = (exampleImg: ExampleImgData | ImageData) => {
    setFile(null)
    setExample(exampleImg)
    if (type === 'original') {
      setExampleId(exampleImg.id)
    }
    const tmpURL = (exampleImg as { src: string }).src
    setPreviewURL(tmpURL)
  }
  // 进行步骤1和2
  const startPredict = async (uploadFile: File) => {
    const data = await predict(uploadFile)
    if (data.status === 'success') {
      // 提取真伪输出结果和概率 输出样例  分类结果：true_sea（置信度：95.93%)
      const result = data.crossvit_output
      // 提取真假
      const isTrue: boolean = /true/i.test(result)
      // 提取置信度:不包含% 只包括前面数字部分的字符串
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
      toast('未检测到印章')
      // console.error(data.error)
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
      const possibility = extractPercentage(result)
      setFromCompare({
        possibility: possibility,
        isSame: isSame,
        geoImgBase64: data.processed_image,
      })
    } else {
      toast('印章匹配失败')
      // console.error(data.error)
    }
  }
  // 点击 开始预测/开始匹配 按钮：统一example和file格式 发送请求
  const handleClickStart = async () => {
    // 如果file和预览url都空，说明没有选择图片，toast报错
    if (!previewURL) {
      toast.error('请选择原图')
      return
    }
    setLoading(true)
    setStage(type === 'original' ? ProcessStage.AUTHENTIC : ProcessStage.COMPARE)
    // 模拟耗时 2~3 秒
    const delay = 2000 + Math.random() * 1000
    await new Promise((resolve) => setTimeout(resolve, delay))
    try {
      if (file) {
        // ✅ 情况1：用户上传图片（真实调用接口）
        const uploadFile = file
        const saveImgFile = type === 'original' ? setOriginalImgFile : setCompareImgFile
        const startFunc = type === 'original' ? startPredict : startCompare
        saveImgFile(uploadFile)
        await startFunc(uploadFile)
      } else if (example && exampleId !== null) {
        // ✅ 情况2：示例图片（假装处理，2-3秒后展示固定结果）
        // 从示例配置中取演示结果（或写死）
        if (type === 'original') {
          const e = example as ExampleImgData
          setFromDetect({
            authenticity: e.authenticity,
            isTrue: e.isTrue,
            preprocessedImgBase64: e.preprocessedImgPath,
            croppedImgBase64: e.cutImgPath,
            sessionId: 'example-session-id',
          })
        } else if (type === 'compare') {
          const id = example.id
          setFromCompare({
            possibility: EXAMPLE_IMAGES[exampleId].compareRes[id].possibility,
            isSame: EXAMPLE_IMAGES[exampleId].compareRes[id].isSame,
            geoImgBase64: EXAMPLE_IMAGES[exampleId].correctImgPath,
          })
        }
      } else {
        toast.error('请选择图片')
      }
    } catch (e) {
      toast.error('未检测到印章')
      console.error(e)
    } finally {
      setLoading(false)
      setStage(ProcessStage.DONE)
    }
  }
  return (
    <Card className={'w-full h-full bg-white'}>
      <CardContent
        className={'h-full flex max-sm:flex-col-reverse justify-between items-center gap-6'}
      >
        <div className={'sm:w-4/5 self-stretch flex flex-col justify-between gap-5'}>
          <div
            className={
              'w-full h-9/10 min-h-[280px] overflow-hidden rounded-2xl bg-gray-200 flex justify-center items-center'
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
              {type === 'original' ? '开始检测' : '开始匹配'}
            </Button>
          </div>
        </div>
        <div
          className={
            'sm:w-1/5 self-stretch flex max-sm:flex-row flex-col gap-4 justify-between items-center'
          }
        >
          <div className={'font-semibold text-nowrap'}>示例图</div>
          <ScrollArea className={'w-full h-full'}>
            <div className={'flex flex-col max-sm:flex-row gap-4'}>
              {exampleImgs.map((image, index) => (
                <div
                  key={index}
                  className={'w-full aspect-square rounded-2xl overflow-hidden cursor-pointer'}
                  onClick={() => handleClickExample(image)}
                >
                  <NextImage
                    src={image.src}
                    className={'w-full h-full object-cover object-center'}
                    alt={''}
                    height={200}
                    width={200}
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
