import ImgIcon from '@/assets/demo/img.svg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export default function ImgPanel() {
  return (
    <Card className={'w-full h-full'}>
      <CardContent className={'flex flex-col justify-center items-center gap-5'}>
        <div className={'text-[#6E56FF] text-xl font-semibold'}>印章矫正</div>
        <div
          className={
            'h-[260px] aspect-square bg-gray-200 rounded-2xl flex justify-center items-center'
          }
        >
          <ImgIcon />
        </div>
      </CardContent>
      <CardFooter>
        <Button>下载</Button>
      </CardFooter>
    </Card>
  )
}
