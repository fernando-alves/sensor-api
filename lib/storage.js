const MongoClient = require('./mongo')

const store = []
const memoryStore = {
  store: reading => new Promise((resolve) => {
    store.push(reading)
    resolve()
  }),
  loadAll: () => new Promise((resolve) => resolve(store)),
  init: () => Promise.resolve()
}

const isMongoDBAvailable = () => process.env.MONGODB_USER && process.env.MONGODB_PASSWORD && process.env.MONGODB_HOST && process.env.MONGODB_DB_NAME

const dbName = () => {
  const env = process.env.NODE_ENV || 'local'
  return `${process.env.MONGODB_DB_NAME}-${env}`
}

module.exports = isMongoDBAvailable() ? new MongoClient(process.env.MONGODB_USER, process.env.MONGODB_PASSWORD, process.env.MONGODB_HOST, dbName()) : memoryStore