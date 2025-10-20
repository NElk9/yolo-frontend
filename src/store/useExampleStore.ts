import { create } from 'zustand/react'

type ExampleStore = {
  exampleId: number | null
  setExampleId: (exampleId: number | null) => void
}

export const useExampleStore = create<ExampleStore>((set) => ({
  exampleId: null,
  setExampleId: (exampleId: number | null) => set({ exampleId: exampleId }),
}))
