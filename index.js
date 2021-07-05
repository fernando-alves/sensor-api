const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const storage = require('./lib/storage')

app.use(express.json());

app.get('/', (req, res) => {
  res.send('up')
})

app.get('/readings', (req, res) => {
  storage.loadAll().then(readings => res.send(readings))
})

app.post('/readings', (req, res) => {
  storage.store(req.body).then(() => res.status(201).end())
})

app.listen(port, () => {
  console.log('Starting...')
})