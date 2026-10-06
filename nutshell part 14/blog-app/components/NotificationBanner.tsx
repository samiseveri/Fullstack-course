type NotificationBannerProps = {
  show: boolean
}

export function NotificationBanner({ show }: NotificationBannerProps) {
  if (!show) {
    return null
  }

  return (
    <div
      data-testid="notification"
      className="mx-auto mt-4 max-w-3xl rounded border border-green-300 bg-green-50 px-4 py-2 text-green-800"
    >
      Success
    </div>
  )
}
