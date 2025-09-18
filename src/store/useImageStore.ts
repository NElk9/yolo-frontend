import { create } from 'zustand'

type ImageData = {
  // 原图：url+上传的file
  originalImage: File | null
  originalImageURL: string | null
  // 裁剪后图片：第2、3步输入 存file
  croppedImage: File | null
  croppedImageURL: string | null
  // 预处理后图片：url
  preprocessedImageURL: string | null
  // 图片是否为真
  isTrue: boolean | null
  // 真伪概率
  authenticityProbability: number | null
  // 几何校正后图片：url
  geoCorrectedImageURL: string | null
  // 用户上传的比对图片：file
  compareImage: File | null
  compareImageURL: string | null
  // 一致性概率
  consistencyProbability: number | null
}

interface ImageState {
  // 原图：url+上传的file
  originalImage: File | null
  originalImageURL: string
  // 裁剪后图片：第2、3步输入 存file
  croppedImage: File | null
  croppedImageURL: string
  // 预处理后图片：url
  preprocessedImageURL: string
  // 图片是否为真
  isTrue: boolean | null
  // 真伪概率
  authenticityProbability: number | null
  // 几何校正后图片：url
  geoCorrectedImageURL: string
  // 用户上传的比对图片：file
  compareImage: File | null
  compareImageURL: string
  // 一致性概率
  consistencyProbability: number | null
  reset: () => void
  setOriginalImage: (image: File | null) => void
  setOriginalImageURL: (url: string) => void
}

const initialState: Omit<ImageState, 'reset' | 'setOriginalImage' | 'setOriginalImageURL'> = {
  originalImage: null,
  originalImageURL: '',
  croppedImage: null,
  croppedImageURL: '',
  preprocessedImageURL: '',
  isTrue: null,
  authenticityProbability: 0,
  geoCorrectedImageURL: '',
  compareImage: null,
  compareImageURL: '',
  consistencyProbability: 0,
}

export const useImageStore = create<ImageState>((set) => ({
  ...initialState,
  reset: () => set({ ...initialState }),
  setOriginalImage: (image: File | null) => set({ originalImage: image }),
  setOriginalImageURL: (url: string) => set({ originalImageURL: url }),
}))
