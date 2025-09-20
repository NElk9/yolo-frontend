import ImgIcon from '@/assets/demo/img.svg'
import { Card, CardContent } from '@/components/ui/card'

export default function ResultPanel() {
  return (
    <Card className={'w-full h-full bg-gradient-to-b from-[#EEF0FF] to-[#EEF0F0]/50'}>
      <CardContent className={'h-full flex py-3 px-6 flex-col justify-between items-center gap-4'}>
        <div className={'text-[#6E56FF] text-xl font-semibold'}>印章真伪判定结果</div>
        <div className={'flex justify-center items-center'}>
          <img src={'/use/true.png'} width={260} />
        </div>
          <p className={'text-xl font-semibold'}>系统认为其是真章的概率值：<span className={'text-[#583CFF] text-3xl font-semibold'}>99%</span></p>
      </CardContent>
    </Card>
  )
}
