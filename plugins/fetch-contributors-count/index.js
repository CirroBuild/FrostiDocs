const nodeFetch = require("node-fetch")

module.exports = () => ({
  name: "fetch-contributors-count",
  async loadContent() {
    const response = await nodeFetch(
      `https://raw.githubusercontent.com/questdb/questdb/master/.all-contributorsrc`,
    )

    const data = await response.json()

    return data.contributors.length
  },
  async contentLoaded({ content, actions }) {
    const { setGlobalData } = actions
    setGlobalData({ contributorsCount: content })
  },
})
