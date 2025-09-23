export enum ProcessStage {
  INITIAL,
  AUTHENTIC,
  COMPARE,
  DONE,
}

// 示例图片（原图）
export type ExampleImgData = {
  name: string
  originalImgPath: string
  compareImgPath: string
}

export const EXAMPLE_IMAGES: ExampleImgData[] = [
  {
    name: '示例图1',
    originalImgPath: '/exampleOriginalImg/exampleOriginalImg1.png',
    compareImgPath: '/exampleOriginalImg/exampleOriginalImg1.png',
  },
  // {
  //   name: '示例图4',
  //   originalImgPath: '/exampleOriginalImg/exampleOriginalImg1.png',
  //   compareImgPath: '',
  // },
  {
    name: '示例图2',
    originalImgPath: '/exampleOriginalImg/xmu.jpg',
    compareImgPath: '/exampleOriginalImg/exampleOriginalImg1.png',
  },
  {
    name: '示例图3',
    originalImgPath: '/exampleOriginalImg/exampleOriginalImg1.png',
    compareImgPath: '/exampleOriginalImg/exampleOriginalImg1.png',
  },
]
