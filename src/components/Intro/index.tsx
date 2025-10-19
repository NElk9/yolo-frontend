import Image from "next/image";
import {getImgSrc} from "@/lib/utils";

type CardData = {
  imgPath: string
  title: string
  description: string
}

const cards: CardData[] = [
  { imgPath: getImgSrc('/intro/card1.png'), title: '印章裁剪', description: '对图片中的印章进行定位裁剪' },
  {
    imgPath: getImgSrc('/intro/card2.png'),
    title: '真伪鉴别',
    description: '进行预处理后，判断印章的真伪及其概率值',
  },
  {
    imgPath: getImgSrc('/intro/card3.png'),
    title: '印章匹配',
    description: '对印章进行几何校正，判断其与另一印章是否为同一印章',
  },
]

export default function Intro() {
  return (
    <div
      id={'intro'}
      className={'w-full h-screen flex flex-col justify-center items-center bg-[#f5f8ff] gap-8'}
    >
      <Image alt={''} src={getImgSrc('/intro.png')} width={450} height={450} />
      <p className={'text-2xl text-[#818283] pb-10'}>
        我们设计了一个网页，可以帮助您进行印章裁剪、真伪鉴别及印章匹配一系列操作。
      </p>
      <div className={'flex justify-center items-center w-full gap-[80px]'}>
        {cards.map((card: CardData, index) => (
          <IntroCard key={index} cardData={card} />
        ))}
      </div>
    </div>
  )
}

function IntroCard({ cardData }: { cardData: CardData }) {
  return (
    <div
      className={
        'w-[360px] h-[460px] bg-gradient-to-br from-[#DDDEFF] to-[#9ACEFF]/40 p-8 rounded-3xl flex flex-col justify-center items-center gap-5'
      }
    >
      <div className={'bg-white overflow-hidden rounded-3xl'}>
        <Image alt={''} src={cardData.imgPath} width={200} height={200} />
      </div>
      <p className={'text-center text-[#333333] font-semibold text-3xl pt-4'}>{cardData.title}</p>
      <p className={'text-center text-[#333333] text-xl'}>{cardData.description}</p>
    </div>
  )
}
