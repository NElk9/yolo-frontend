import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getImgSrc } from '@/lib/utils'

export default function Hero() {
  return (
    <div id={'hero'} className={'w-full h-screen relative flex items-center'}>
      <Image
        src={getImgSrc('/bg.png')}
        height={100}
        width={100}
        alt={''}
        className={'absolute inset-0 w-full h-full object-cover object-center -z-10'}
      />
      <div className={'flex flex-col items-start justify-between pl-[280px]'}>
        <Image src={getImgSrc('/logo.png')} alt={'印鉴通'} width={400} height={400} />
        <p className={'text-3xl font-semibold mt-[30px]'}>对印章进行裁剪等处理，</p>
        <p className={'text-3xl font-semibold mt-[20px] mb-[60px]'}>
          判断其真伪及与给定印章的一致性
        </p>
        <Link href="/demo">
          <Button
            className={
              'h-[60px] text-4xl px-[80px] py-[40px] rounded-3xl bg-white/10 border-solid border-4 border-white/90 hover:bg-white/40 active:bg-[#e7ecee]/60'
            }
          >
            立即使用
          </Button>
        </Link>
      </div>
    </div>
  )
}
