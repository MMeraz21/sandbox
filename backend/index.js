const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

const PORT = 3003
app.listen(PORT, () => {
  //console.log(`Server running on port ${PORT}`)
  logger.info(`Server running on port ${PORT}`)
})