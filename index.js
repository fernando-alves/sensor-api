const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const storage = require('./lib/storage')
const auth = require('./lib/auth')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('up')
})

app.get('/readings', auth, (req, res) => {
  storage.loadAll().then(readings => res.send(readings))
})

app.post('/readings', auth, (req, res) => {
  storage.store(req.body).then(() => res.status(201).end())
})

app.listen(port, () => {
  console.log('Starting...')
})