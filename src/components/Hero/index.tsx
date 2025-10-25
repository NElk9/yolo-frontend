import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getImgSrc } from '@/lib/utils'

export default function Hero() {
  return (
    <div
      id={'hero'}
      className={
        'w-full h-screen max-sm:pt-18 px-4 flex items-center max-sm:items-start bg-cover bg-center max-sm:bg-right bg-[url("/bg.png")] max-sm:bg-[url("/bg-mobile.png")]'
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
        <Image src={getImgSrc('/logo.png')} alt={'印鉴通'} width={300} height={200} />
        <p className={'text-3xl max-sm:text-xl font-semibold mt-6'}>对印章进行裁剪等处理，</p>
        <p className={'text-3xl max-sm:text-xl font-semibold mt-4 mb-10'}>
          判断其真伪及与给定印章的一致性
        </p>
        <Link href="/demo">
          <Button
            className={
              'h-24 px-10 max-sm:h-14 text-4xl max-sm:text-2xl rounded-3xl sm:bg-white/30 sm:border-solid sm:border-4 sm:border-white/90 sm:hover:bg-white/50 sm:active:bg-[#e7ecee]/60'
            }
          >
            立即使用
          </Button>
        </Link>
      </div>
    </div>
  )
}
