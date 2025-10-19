import { useShallow } from 'zustand/react/shallow'
import LoadingIcon from '@/assets/demo/loading.svg'
import { Card, CardContent } from '@/components/ui/card'
import { useImageStore } from '@/store/useImageStore'
import Image from "next/image";
import {getImgSrc} from "@/lib/utils";

export enum ResultPanelType {
  AUTHENTICITY = '印章真伪判定结果',
  COMPARE = '印章匹配判定结果',
}

export default function ResultPanel({ type }: { type: ResultPanelType }) {
  const [isTrue, authenticity, isSame, possibility] = useImageStore(
    useShallow((state) => [state.isTrue, state.authenticity, state.isSame, state.possibility]),
  )
  const config =
    type === ResultPanelType.AUTHENTICITY
      ? {
          valid: isTrue !== null && authenticity !== null,
          img: isTrue ? getImgSrc('/use/true.png') : getImgSrc('/use/false.png'),
          text: isTrue ? '系统认为其是真章的概率值：' : '系统认为其是假章的概率值：',
          prob: authenticity,
        }
      : {
          valid: isSame !== null && possibility !== null,
          img: isSame ? getImgSrc('/use/same.png') : getImgSrc('/use/notsame.png'),
          text: isSame ? '两枚印章一致的概率值：' : '两枚印章不一致的概率值：',
          prob: possibility,
        }
  return (
    <Card className={'w-full h-full bg-gradient-to-b from-[#EEF0FF] to-[#EEF0F0]/50'}>
      <CardContent className={'h-full flex py-3 px-6 flex-col justify-between items-center gap-4'}>
        <div className={'text-[#6E56FF] text-xl font-semibold'}>{type}</div>
        {config.valid ? (
          <>
            <div className="flex justify-center items-center">
              <Image src={config.img} width={260} height={260} alt={''} />
            </div>
            <p className="text-xl font-semibold">
              {config.text}
              <span className="text-[#583CFF] text-3xl font-semibold">{config.prob}%</span>
            </p>
          </>
        ) : (
          <>
            <LoadingIcon />
            <p className="text-xl font-semibold">等待用户输入...</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
