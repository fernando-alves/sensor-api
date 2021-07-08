const MongoClient = require('mongodb').MongoClient

class Client {
  constructor(user, password, host, dbName) {
    this.url = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`
  }

  init() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, db) => {
        if (err) {
          console.error(`Failed to connect to mongo at ${this.url}`, err)
          return reject(err)
        }
        db.close()
        resolve()
      })
    })
  }

}

module.exports = Client