import Image from 'next/image'
import DescriptionCard from '@/components/DescriptionCard'
import ImgPanel, { ImgPanelType } from '@/components/ImgPanel'
import TabsPanel from '@/components/TabsPanel'
import UploadPanel from '@/components/UploadPanel'
import { getImgSrc } from '@/lib/utils'

export default function index() {
  return (
    <div
      id={'use'}
      className={
        'w-full xl:h-screen overflow-auto pt-15 pb-8 px-20 bg-[#f5f8ff] flex flex-col xl:flex-row gap-8'
      }
    >
      <div
        className={'xl:w-5/12 h-full flex flex-col justify-start items-center gap-5 overflow-auto'}
      >
        <div className={'w-full h-1/2'}>
          <UploadPanel type={'original'} />
        </div>
        <div className={'flex items-center gap-1 w-full'}>
          <Image alt={''} src={getImgSrc('/use/text-cut.png')} width={100} height={100} />
          <div className={'bg-[#e5e5e5] h-[2px] w-full'} />
        </div>
        <div className={'flex flex-col xl:flex-row gap-3 w-full h-full'}>
          <div className={'xl:w-1/2'}>
            <DescriptionCard itemId={'cut'} />
          </div>
          <div className={'xl:w-1/2'}>
            <ImgPanel type={ImgPanelType.CUT} />
          </div>
        </div>
      </div>
      <div className={'xl:w-7/12 h-full'}>
        <TabsPanel />
      </div>
    </div>
  )
}
