import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <div id={'hero'} className={'w-screen h-screen relative flex items-center'}>
      <img
        src={'/bg.png'}
        className={'absolute inset-0 w-full h-full object-cover object-center -z-10'}
      />
      <div className={'flex flex-col items-start justify-between pl-[280px]'}>
        <img src={'/logo.png'} alt={'印鉴通'} width={500} />
        <p className={'text-5xl font-semibold mt-[40px]'}>对印章进行裁剪等处理，</p>
        <p className={'text-5xl font-semibold mt-[20px] mb-[100px]'}>
          判断其真伪及与给定印章的一致性
        </p>
        <Link href="/demo">
          <Button
            className={
              'h-[90px] text-5xl px-[100px] py-[60px] rounded-3xl bg-white/10 border-solid border-4 border-white/90 hover:bg-white/40 active:bg-[#e7ecee]/60'
            }
          >
            立即使用
          </Button>
        </Link>
      </div>
    </div>
  )
}
