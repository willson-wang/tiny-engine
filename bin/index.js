#!/usr/bin/env node
const { argv } = require('yargs')
// const shell = require('shelljs')
// const path = require('path')

console.log('argv', argv, argv._[0], process.argv)

// function joinParams () {
//   const str = Object.keys(argv).reduce((prev, item) => {
//     console.log('item', item)
//     if (item !== '_' && item.indexOf('$') === -1) {
//       return prev += ` --${item} ${argv[item]}`
//     }
//     return prev
//   }, '')

//   console.log('str', str.trim())
//   return str.trim()
// }

// function _exec (command, type) {
//   if (shell.exec(command + ' ' + joinParams()).code !== 0) {
//     shell.echo(`tiny-engine ${type} faile`)
//     shell.exit(1)
//   }
// }

const command = argv._[0]

if (command === 'start') {
  // _exec(`node ${webpackPath}`, 'start')
  require('../build/dev-server.js')
} else if (command === 'build') {
  // _exec('yarn build', 'build')
  require('../build/build.js')
}
