const MongoClient = require('mongodb').MongoClient

class Client {
  constructor(user, password, host, dbName) {
    const uri = `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`
    this.client = new MongoClient(uri)
    this.dbName = dbName
  }

  async init() {
    try {
      await this.client.connect()
      await this.client.db(this.dbName).command({ ping: 1 })
    } catch (err) {
      console.error('Failed to connect to mongodb', err)
      throw err
    } finally {
      this.client.close()
    }
  }
}

module.exports = Client