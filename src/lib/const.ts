import { getImgSrc } from '@/lib/utils'

export enum ProcessStage {
  INITIAL,
  AUTHENTIC,
  COMPARE,
  DONE,
}

export type CompareRes = {
  possibility: string
  isSame: boolean
}

export type ImageData = {
  id: number
  src: string
}
// 示例图片（原图）
export type ExampleImgData = ImageData & {
  cutImgPath: string
  preprocessedImgPath: string
  correctImgPath: string

  authenticity: string
  isTrue: boolean

  compareRes: CompareRes[]
}

export const EXAMPLE_COMPARE_IMAGES: ImageData[] = [
  { id: 0, src: getImgSrc('/example/11.jpg') },
  { id: 1, src: getImgSrc('/example/22.jpg') },
  { id: 2, src: getImgSrc('/example/33.jpg') },
]

export const EXAMPLE_IMAGES: ExampleImgData[] = [
  {
    id: 0,
    src: getImgSrc('/example/1.jpg'),
    cutImgPath: getImgSrc('/example/cut1.png'),
    preprocessedImgPath: getImgSrc('/example/pre1.png'),
    correctImgPath: getImgSrc('/example/correct1.png'),
    authenticity: '95.36',
    isTrue: false,
    compareRes: [
      { possibility: '82.27', isSame: true },
      { possibility: '100', isSame: false },
      { possibility: '99.99', isSame: false },
    ],
  },
  {
    id: 1,
    src: getImgSrc('/example/2.jpg'),
    cutImgPath: getImgSrc('/example/cut2.png'),
    preprocessedImgPath: getImgSrc('/example/pre2.png'),
    correctImgPath: getImgSrc('/example/correct2.png'),
    authenticity: '94.22',
    isTrue: true,
    compareRes: [
      { possibility: '100', isSame: false },
      { possibility: '73.05', isSame: true },
      { possibility: '93.76', isSame: false },
    ],
  },
  {
    id: 2,
    src: getImgSrc('/example/3.jpg'),
    cutImgPath: getImgSrc('/example/cut3.png'),
    preprocessedImgPath: getImgSrc('/example/pre3.png'),
    correctImgPath: getImgSrc('/example/correct3.png'),
    authenticity: '90.14',
    isTrue: true,
    compareRes: [
      { possibility: '99.99', isSame: false },
      { possibility: '88.22', isSame: false },
      { possibility: '91.84', isSame: true },
    ],
  },
]
