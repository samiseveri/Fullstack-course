const net = require('net')

const host = process.env.MONGO_HOST || 'mongo'
const port = Number(process.env.MONGO_PORT || 27017)
const maxAttempts = Number(process.env.MONGO_WAIT_ATTEMPTS || 60)

const tryOnce = () =>
  new Promise((resolve) => {
    const socket = net.connect({ host, port }, () => {
      socket.end()
      resolve(true)
    })
    socket.on('error', () => {
      socket.destroy()
      resolve(false)
    })
  })

;(async () => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const ok = await tryOnce()
    if (ok) {
      console.log(`MongoDB is reachable at ${host}:${port}`)
      process.exit(0)
    }
    console.log(`Waiting for MongoDB at ${host}:${port} (${attempt}/${maxAttempts})`)
    await new Promise((r) => setTimeout(r, 2000))
  }
  console.error(`MongoDB at ${host}:${port} did not become ready`)
  process.exit(1)
})()
