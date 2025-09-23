import toast from 'react-hot-toast'
import { Image } from 'antd'
import { Loader2 } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'
import ImgIcon from '@/assets/demo/img.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ProcessStage } from '@/lib/const'
import { downloadBase64Image } from '@/lib/utils'
import { useImageStore } from '@/store/useImageStore'

// title imgPanel显示的标题 印章裁剪 印章预处理 印章矫正
export enum ImgPanelType {
  CUT = '印章裁剪',
  PREPROCESS = '印章预处理',
  GEO = '印章校正',
}

export default function ImgPanel({ type }: { type: ImgPanelType }) {
  const [croppedImgBase64, preprocessedImgBase64, geoImgBase64, stage] = useImageStore(
    useShallow((state) => [
      state.croppedImgBase64,
      state.preprocessedImgBase64,
      state.geoImgBase64,
      state.stage,
    ]),
  )
  const imgSrc = {
    [ImgPanelType.CUT]: croppedImgBase64,
    [ImgPanelType.PREPROCESS]: preprocessedImgBase64,
    [ImgPanelType.GEO]: geoImgBase64,
  }[type]
  // const imgSrc = 'public/exampleOriginalImg/exampleOriginalImg1.png'
  const handleClickDownload = () => {
    if (!imgSrc) {
      toast.error('请上传图片')
      return
    }
    downloadBase64Image(imgSrc, `${type}.png`)
  }
  const authenticLoading =
    stage === ProcessStage.AUTHENTIC &&
    (type === ImgPanelType.CUT || type === ImgPanelType.PREPROCESS)
  const compareLoading = stage === ProcessStage.COMPARE && type === ImgPanelType.GEO
  return (
    <Card className={'w-full h-full bg-white'}>
      <CardContent className={'h-full flex py-3 px-6 flex-col justify-center items-center gap-5'}>
        <div className={'text-[#6E56FF] text-xl font-semibold'}>{type}</div>
        <div className={'h-full w-full bg-gray-200 rounded-2xl flex justify-center items-center'}>
          {imgSrc ? (
            <Image src={imgSrc} className={'w-full h-full object-cover object-center'} />
          ) : authenticLoading || compareLoading ? (
            <Loader2 className={'h-12 w-12 animate-spin'} />
          ) : (
            <ImgIcon />
          )}
        </div>
        <Button className={'shrink-0'} onClick={handleClickDownload}>
          下载
        </Button>
      </CardContent>
    </Card>
  )
}
