const path = require('path')

module.exports = {
  babelrcRoots: [
    process.cwd(),
    path.resolve(process.cwd(), 'node_modules', 'tiny-engine')
  ]
}
