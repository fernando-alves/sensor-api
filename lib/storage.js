const store = []
const memoryStore = {
  store: reading => new Promise((resolve) => {
    store.push(reading)
    resolve()
  }),
  loadAll: () => new Promise((resolve) => resolve(store)),
  init: () => new Promise(resolve => resolve())
}

module.exports = memoryStore