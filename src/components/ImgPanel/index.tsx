import toast from 'react-hot-toast'
import { Image } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import ImgIcon from '@/assets/demo/img.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { downloadBase64Image } from '@/lib/utils'
import { useImageStore } from '@/store/useImageStore'

// title imgPanel显示的标题 印章裁剪 印章预处理 印章矫正
export enum ImgPanelType {
  CUT = '印章裁剪',
  PREPROCESS = '印章预处理',
  GEO = '印章矫正',
}

export default function ImgPanel({ type }: { type: ImgPanelType }) {
  const [croppedImgBase64, preprocessedImgBase64, geoImgBase64] = useImageStore(
    useShallow((state) => [
      state.croppedImgBase64,
      state.preprocessedImgBase64,
      state.geoImgBase64,
    ]),
  )
  const imgSrc = {
    [ImgPanelType.CUT]: croppedImgBase64,
    [ImgPanelType.PREPROCESS]: preprocessedImgBase64,
    [ImgPanelType.GEO]: geoImgBase64,
  }[type]
  const handleClickDownload = () => {
    if (!imgSrc) {
      toast.error('请上传图片')
      return
    }
    downloadBase64Image(imgSrc, `${type}.png`)
  }
  return (
    <Card className={'w-full h-full bg-white'}>
      <CardContent className={'h-full flex py-3 px-6 flex-col justify-center items-center gap-5'}>
        <div className={'text-[#6E56FF] text-xl font-semibold'}>{type}</div>
        <div className={'h-full w-full bg-gray-200 rounded-2xl flex justify-center items-center'}>
          {imgSrc ? (
            <Image src={imgSrc} className={'w-full h-full object-cover object-center'} />
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
