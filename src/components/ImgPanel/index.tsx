import ImgIcon from '@/assets/demo/img.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ImgPanel() {
  return (
    <Card className={'w-full h-full bg-white'}>
      <CardContent className={'h-full flex py-3 px-6 flex-col justify-center items-center gap-5'}>
        <div className={'text-[#6E56FF] text-xl font-semibold'}>印章矫正</div>
        <div
          className={
            'h-full w-full bg-gray-200 rounded-2xl flex justify-center items-center'
          }
        >
          <ImgIcon />
        </div>
        <Button className={'shrink-0'}>下载</Button>
      </CardContent>
    </Card>
  )
}
