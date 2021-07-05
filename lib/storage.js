const store = [];

module.exports = {
  store: reading => new Promise((resolve) => {
    store.push(reading)
    resolve()
  }),
  loadAll: () => new Promise((resolve) => resolve(store))
}