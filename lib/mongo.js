const MongoClient = require('mongodb').MongoClient

class Client {
  constructor(user, password, host, dbName) {
    this.uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`
    this.dbName = dbName
  }

  async init() {
    const client = new MongoClient(this.uri,  { useUnifiedTopology: true, useNewUrlParser: true })
    try {
      await client.connect()
      await client.db(this.dbName).command({ ping: 1 })
    } catch (err) {
      console.error('Failed to connect to mongodb', err)
      throw err
    } finally {
      await client.close()
    }
  }

  async loadAll() {
    const client = new MongoClient(this.uri,  { useUnifiedTopology: true, useNewUrlParser: true })
    try {
      await client.connect()
      return await client.db(this.dbName).collection('readings').find({}).toArray()
    } catch (err) {
      console.error(`Failed to connect to mongodb`, err)
      throw err
    } finally {
      await client.close()
    }
  }
}

module.exports = Client