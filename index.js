const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const storage = require('./lib/storage')
const auth = require('./lib/auth')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('up!')
})

app.get('/readings', auth, (req, res) => {
  storage.loadAll().then(readings => res.send(readings))
})

app.post('/readings', auth, (req, res) => {
  const timestampInSeconds = Math.round(new Date().getTime() / 1000)
  const reading = { timestamp: timestampInSeconds, ...req.body }
  storage.store(reading).then(() => res.status(201).end())
})

const startServer = () => app.listen(port, () => console.log('Starting...'))
const logAndFail = err => {
  console.error('Failed to start server due to:', err)
  process.exit(1)
}

storage.init().then(startServer).catch(logAndFail)