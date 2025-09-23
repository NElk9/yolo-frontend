import { create } from 'zustand/react'
import { ProcessStage } from '@/lib/const'

type ImageEntry = {
  stage: ProcessStage
  // 标识是同一张图片
  sessionId: string | null
  // 第一次上传的原图文件，用户点击开始预测 才保存到这里
  originalImgFile: File | null
  // 第二次用户上传的比较图文件，用户点击开始匹配 才保存到这里
  compareImgFile: File | null
  // 裁剪后图片 step1结果
  croppedImgBase64: string | null // data:image/...;base64,...
  // step2 预处理后图片
  preprocessedImgBase64: string | null // data:image/...;base64,...
  // step2 真伪判断结果输出
  authenticity: string | null
  isTrue: boolean | null
  // step3 几何校正后图片
  geoImgBase64: string | null
  // step3 几何校正后输出
  possibility: string | null
  isSame: boolean | null
}

const initialState: ImageEntry = {
  stage: ProcessStage.INITIAL,
  // 标识是同一张图片
  sessionId: null,
  // 第一次上传的原图文件，用户点击开始预测 才保存到这里
  originalImgFile: null,
  // 裁剪后图片 step1结果
  croppedImgBase64: null, // data:image/...;base64,...
  // step2 预处理后图片
  preprocessedImgBase64: null, // data:image/...;base64,...
  // step2 真伪判断结果输出
  authenticity: null,
  isTrue: null,
  // 第二次用户上传的比较图文件，用户点击开始匹配 才保存到这里
  compareImgFile: null,
  // step3 几何校正后图片
  geoImgBase64: null,
  // step3 几何校正后输出
  possibility: null,
  isSame: null,
}

export type PredictRes = Pick<
  ImageEntry,
  'sessionId' | 'croppedImgBase64' | 'preprocessedImgBase64' | 'authenticity' | 'isTrue'
>

export type CompareRes = Pick<ImageEntry, 'possibility' | 'isSame' | 'geoImgBase64'>

type ImageStore = ImageEntry & {
  setStage: (stage: ProcessStage) => void
  setFromDetect: (payload: PredictRes) => void
  setOriginalImgFile: (image: File) => void
  setCompareImgFile: (image: File) => void
  setFromCompare: (payload: CompareRes) => void
  clear: () => void
  clearCompare: () => void
}

export const useImageStore = create<ImageStore>((set) => ({
  ...initialState,

  setStage: (stage: ProcessStage) => set({ stage }),
  // 点击 开始预测 后，立即保存原始图片file
  setOriginalImgFile: (image: File) => set({ originalImgFile: image }),
  // 点击 开始预测 后，返回裁剪图片、预处理图片、真伪输出、sessionId再保存
  setFromDetect: (payload) => set((state) => ({ ...state, ...payload })),
  // 点击 开始匹配 后。立即保存用户上传的比较图
  setCompareImgFile: (image: File) => set({ compareImgFile: image }),
  // 点击 开始匹配 后，返回几何校正图片、一致性输出再保存
  setFromCompare: (payload) => set((state) => ({ ...state, ...payload })),
  clear: () => set({ ...initialState }),
  clearCompare: () =>
    set({ compareImgFile: null, geoImgBase64: null, possibility: null, isSame: null }),
}))
