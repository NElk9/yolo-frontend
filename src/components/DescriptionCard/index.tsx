import CompareIcon from '@/assets/demo/desc-compare.svg'
import CutIcon from '@/assets/demo/desc-cut.svg'
import StampIcon from '@/assets/demo/desc-stamp.svg'

type DescriptionKey = 'authenticity' | 'cut' | 'compare'

type DescriptionData = {
  icon: React.ReactNode
  title: string
  content: string
  id: DescriptionKey
}

export const DESCRIPTION: DescriptionData[] = [
  {
    id: 'authenticity',
    icon: <StampIcon />,
    title: '印章真伪鉴别功能说明',
    content:
      '对裁剪后的印章图片进行对比度增强、色彩增强及清晰度增强处理，根据其印章特征进行真伪判断，输出该印章为真章或假章的判定结果，并附带其对应的判断概率（如“真章 判断概率：92%”）',
  },
  {
    id: 'cut',
    icon: <CutIcon />,
    title: '印章裁剪功能说明',
    content:
      '针对图片中的印章部分进行精准定位，确定完整印章体的边界范围并进行裁剪，切除周边与印章无关的图片部分，仅保留印章主体部分。',
  },
  {
    id: 'compare',
    icon: <CompareIcon />,
    title: '印章匹配功能说明',
    content:
      '对裁剪后的印章图片进行几何矫正，输入一张印章样例图，判断其与矫正后的印章是否为同一印章，输出一致或不一致的判定结果，并附带其对应的判断概率（如“一致 判断概率：86%”）',
  },
]

export default function DescriptionCard({ itemId }: { itemId: DescriptionKey }) {
  const item = DESCRIPTION.find((item) => item.id === itemId)
  console.log(item)
  return (
    <div
      className={
        'h-full flex flex-col justify-center gap-3 p-7 bg-gradient-to-br from-[#DDDEFF] to-[#9ACEFF]/30 rounded-3xl'
      }
    >
      <div className={'flex items-center gap-2'}>
        {item?.icon}
        <p className={'text-2xl text-[#7760FF] font-semibold'}>{item?.title}</p>
      </div>
      <p className={'text-[#101010] text-xl'}>{item?.content}</p>
    </div>
  )
}
