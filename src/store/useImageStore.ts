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
  reset: () => void
}

const initialState: Omit<ImageState, 'reset'> = {
  originalImage: null,
  originalImageURL: null,
  croppedImage: null,
  croppedImageURL: null,
  preprocessedImageURL: null,
  isTrue: null,
  authenticityProbability: null,
  geoCorrectedImageURL: null,
  compareImage: null,
  compareImageURL: null,
  consistencyProbability: null,
}

export const useImageStore = create<ImageState>((set) => ({
  ...initialState,
  reset: () => set({ ...initialState }),
}))

export const reset = () => {
  useImageStore.setState(() => ({ ...initialState }))
}
