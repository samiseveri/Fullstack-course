import { createContext, useContext, useRef, useState } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)
  const timer = useRef(null)

  const notify = (message) => {
    clearTimeout(timer.current)
    setNotification(message)
    timer.current = setTimeout(() => setNotification(null), 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, notify]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotify = () => {
  const [, notify] = useContext(NotificationContext)
  return notify
}
