const path = require('path')
const join = name => path.join(__dirname, name)

const __DEV__ = process.env.NODE_ENV === 'development'
module.exports = {
  __DEV__,
  join
}
