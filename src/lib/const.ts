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
// 示例图片（原图）
export type ExampleImgData = {
  id: number
  originalImgPath: string
  compareImgPath: string
  cutImgPath: string
  preprocessedImgPath: string
  correctImgPath: string

  authenticity: string
  isTrue: boolean

  compareRes: CompareRes[]
}

export const EXAMPLE_IMAGES: ExampleImgData[] = [
  {
    id: 0,
    originalImgPath: getImgSrc('/example/1.jpg'),
    compareImgPath: getImgSrc('/example/11.jpg'),
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
    originalImgPath: getImgSrc('/example/2.jpg'),
    compareImgPath: getImgSrc('/example/22.jpg'),
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
    originalImgPath: getImgSrc('/example/3.jpg'),
    compareImgPath: getImgSrc('/example/33.jpg'),
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
