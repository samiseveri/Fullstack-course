import { useBlogStore } from '../store'

const Notification = () => {
  const notification = useBlogStore((state) => state.notification)

  if (!notification) {
    return null
  }

  return <div className="notification">{notification}</div>
}

export default Notification
