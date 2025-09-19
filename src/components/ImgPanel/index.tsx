import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export default function ImgPanel() {
  return (
    <div className={'w-full h-full'}>
      <div>title</div>
      <Card>
        <CardContent>img</CardContent>
        <CardFooter>
          <Button>下载</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
