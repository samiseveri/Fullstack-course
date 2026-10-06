import { NotificationBanner } from "@/components/NotificationBanner"

type HomePageProps = {
  searchParams: Promise<{ notification?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const showNotification = params.notification === "logged-in"

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold">Bloglist</h1>
      <p>Welcome to the blog application.</p>
      <NotificationBanner show={showNotification} />
    </div>
  )
}
