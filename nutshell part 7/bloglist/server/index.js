import app from './app.js'
import { connect } from './db.js'

const PORT = process.env.PORT || 3001

await connect()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
