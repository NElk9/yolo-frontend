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
    originalImgPath: '/example/1.jpg',
    compareImgPath: '/example/11.jpg',
  },
  {
    name: '示例图2',
    originalImgPath: '/example/2.jpg',
    compareImgPath: '/example/22.jpg',
  },
  {
    name: '示例图3',
    originalImgPath: '/example/3.jpg',
    compareImgPath: '/example/33.jpg',
  },
]
