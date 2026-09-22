import { create } from 'zustand'

const useUnicafeStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    increaseGood: () => set((state) => ({ good: state.good + 1 })),
    increaseNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    increaseBad: () => set((state) => ({ bad: state.bad + 1 })),
  },
}))

export const useGood = () => useUnicafeStore((state) => state.good)
export const useNeutral = () => useUnicafeStore((state) => state.neutral)
export const useBad = () => useUnicafeStore((state) => state.bad)
export const useUnicafeActions = () => useUnicafeStore((state) => state.actions)
