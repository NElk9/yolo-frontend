import CompareIcon from '@/assets/demo/compare.svg'
import StampIcon from '@/assets/demo/stamp.svg'
import DescriptionCard from '@/components/DescriptionCard'
import ImgPanel from '@/components/ImgPanel'
import ResultPanel from '@/components/ResultPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
        'w-full h-full overflow-auto bg-white shadow-[#E9EAFF] shadow-lg rounded-xl py-3 px-4'
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
      <TabsContent value={'authenticity'} className={'flex flex-col gap-6'}>
        <DescriptionCard itemId="authenticity" />
        <div className={'flex items-center gap-1 mt-3'}>
          <img src={'/use/text-res.png'} width={100} />
          <div className={'bg-[#e5e5e5] h-[2px] w-full'} />
        </div>
        <div className={'flex items-center justify-between gap-4 w-full h-full'}>
          <ImgPanel />
          <ResultPanel />
        </div>
      </TabsContent>
      <TabsContent value={'compare'}>222</TabsContent>
    </Tabs>
  )
}
