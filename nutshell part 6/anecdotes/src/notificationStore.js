import { create } from 'zustand'

let notificationTimer

export const useNotificationStore = create((set) => ({
  notification: '',
  setNotification: (message) => {
    clearTimeout(notificationTimer)
    set({ notification: message })
    notificationTimer = setTimeout(() => set({ notification: '' }), 5000)
  },
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
