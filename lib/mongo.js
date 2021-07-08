const MongoClient = require('mongodb').MongoClient

class Client {
  constructor(user, password, host, dbName) {
    this.uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`
    this.dbName = dbName
  }

  async init() {
    return this.withClient(() => {})
  }

  async store(reading) {
    this.withClient(readingsCollection => readingsCollection.insertOne(reading))
  }

  async loadAll() {
    return this.withClient(readingsCollection => readingsCollection.find({}).toArray())
  }

  async withClient(callback) {
    const client = new MongoClient(this.uri,  { useUnifiedTopology: true, useNewUrlParser: true })
    try {
      await client.connect()
      return await callback(client.db(this.dbName).collection('readings'))
    } catch (err) {
      console.error('Failed to connect to mongodb', err)
      throw err
    } finally {
      await client.close()
    }
  }
}

module.exports = Client