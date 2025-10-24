import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getImgSrc } from '@/lib/utils'

export default function Hero() {
  return (
    <div
      id={'hero'}
      className={
        'w-full h-screen flex items-center bg-cover bg-center max-sm:bg-right bg-[url("/bg.png")] max-sm:bg-[url("/bg-mobile.png")]'
      }
    >
      {/*<Image*/}
      {/*  src={getImgSrc('/bg.png')}*/}
      {/*  height={100}*/}
      {/*  width={100}*/}
      {/*  alt={''}*/}
      {/*  className={*/}
      {/*    'absolute inset-0 w-full h-full object-cover xl:object-center object-right -z-10'*/}
      {/*  }*/}
      {/*/>*/}
      <div className={'flex flex-col items-start justify-between pl-[280px] max-sm:pl-3'}>
        <Image src={getImgSrc('/logo.png')} alt={'印鉴通'} width={380} height={350} />
        <p className={'text-3xl max-sm:text-2xl font-semibold mt-[30px]'}>对印章进行裁剪等处理，</p>
        <p className={'text-3xl max-sm:text-2xl font-semibold mt-[20px] mb-[60px]'}>
          判断其真伪及与给定印章的一致性
        </p>
        <Link href="/demo">
          <Button
            className={
              'h-[60px] text-4xl max-sm:text-3xl px-[80px] py-[40px] rounded-3xl bg-white/30 border-solid border-4 border-white/90 hover:bg-white/50 active:bg-[#e7ecee]/60'
            }
          >
            立即使用
          </Button>
        </Link>
      </div>
    </div>
  )
}
