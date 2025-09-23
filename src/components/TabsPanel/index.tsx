import CompareIcon from '@/assets/demo/compare.svg'
import StampIcon from '@/assets/demo/stamp.svg'
import DescriptionCard from '@/components/DescriptionCard'
import ImgPanel, { ImgPanelType } from '@/components/ImgPanel'
import ResultPanel, { ResultPanelType } from '@/components/ResultPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UploadPanel from '@/components/UploadPanel'

type TabData = {
  icon: React.ReactNode
  name: string
  value: string
}

const tabs: TabData[] = [
  {
    icon: <StampIcon />,
    name: '真伪鉴别',
    value: 'authenticity',
  },
  {
    icon: <CompareIcon />,
    name: '印章匹配',
    value: 'compare',
  },
]

export default function TabsPanel() {
  return (
    <Tabs
      className={
        'w-full h-full overflow-auto bg-white shadow-[#E9EAFF] shadow-lg rounded-xl py-3 px-4 flex flex-col items-center justify-center'
      }
      defaultValue={'authenticity'}
    >
      <TabsList className={'grid w-full grid-cols-2 bg-[#f4f4f5]'}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={'flex items-center gap-2 cursor-pointer'}
          >
            {tab.icon}
            <p>{tab.name}</p>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={'authenticity'} className={'flex-1 flex flex-col gap-6 w-full'}>
        <div className={'h-1/3'}>
          <DescriptionCard itemId="authenticity" />
        </div>
        <div className={'flex items-center gap-1 w-full'}>
          <img src={'/use/text-res.png'} width={100} />
          <div className={'bg-[#e5e5e5] h-[2px] w-full'} />
        </div>
        <div className={'flex items-center justify-between gap-4 w-full flex-1'}>
          <ImgPanel type={ImgPanelType.PREPROCESS} />
          <ResultPanel type={ResultPanelType.AUTHENTICITY} />
        </div>
      </TabsContent>
      <TabsContent value={'compare'} className={'flex-1 flex flex-col gap-4 w-full'}>
        <div className={'flex gap-3 w-full h-[340px]'}>
          <div className={'w-4/10'}>
            <DescriptionCard itemId="compare" />
          </div>
          <div className={'w-6/10'}>
            <UploadPanel type={'compare'} />
          </div>
        </div>
        <div className={'flex items-center gap-1'}>
          <img src={'/use/text-res-compare.png'} width={100} />
          <div className={'bg-[#e5e5e5] h-[2px] w-full'} />
        </div>
        <div className={'flex items-center justify-between gap-4 w-full flex-1'}>
          <ImgPanel type={ImgPanelType.GEO} />
          <ResultPanel type={ResultPanelType.COMPARE} />
        </div>
      </TabsContent>
    </Tabs>
  )
}
