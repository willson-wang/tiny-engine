const path = require('path')
const fs = require('fs')

const cwd = process.cwd()
// existsSync 目录or文件是否存在
// writeFileSync 同步写文件
// readdirSync 读取某个目录下的文件
// statSync 判断是目录还是文件

const { resolve } = path

let appendStr = ''

const srcDir = resolve(cwd, 'src')

const modulesDir = resolve(srcDir, 'modules')
const packagesDir = resolve(srcDir, 'packages')

function existsSync(dir) {
  return fs.existsSync(dir)
}

function readdirSync(dir) {
  return fs.readdirSync(dir)
}

function statSync(dir) {
  return fs.statSync(dir)
}

function requireModule(id, path, isProd) {
  return isProd ? `try {
    registerModule('${id}', require('${path}').default)
  } catch(e) {
    console.log(e)
  }
  ` : `registerModule('${id}', require('${path}').default)`
}

function requireComponent(id, path, isProd) {
  return isProd ? `try {
    registerComponent('${id}', require('${path}').default)
  } catch(e) {
    console.log(e)
  }
  ` : `registerComponent('${id}', require('${path}').default)`
}

function hasIndexJs(rootDir) {
  readdirSync(rootDir).forEach((dir) => {
    console.log('dir', dir)
    if (statSync(resolve(rootDir, dir)).isDirectory()) {
      const indexPath = resolve(rootDir, dir, 'index.js')
      if (existsSync(indexPath)) {
        console.log('module xxx 存在 index.js')
        appendStr += `${requireModule(dir, indexPath)} \n `
      } else if (statSync(resolve(rootDir, dir, 'src')).isDirectory()) {
        const indexPathPackage = resolve(rootDir, dir, 'src/index.js')
        if (existsSync(indexPathPackage)) {
          console.log('packages xxx 存在 index.js')
          appendStr += `${requireComponent(dir, indexPathPackage)} \n `
        }
      }
    }
  })
}

function findBusinessComponents() {
  const existsSyncModules = existsSync(modulesDir)
  const existsSyncPackages = existsSync(packagesDir)
  console.log('---existsSyncModules', existsSyncPackages, packagesDir)
  if (existsSyncModules) {
    hasIndexJs(modulesDir)
  }

  if (existsSyncPackages) {
    hasIndexJs(packagesDir)
  }
}

module.exports = function (context) {
  appendStr = ''
  findBusinessComponents()
  const temp = `${context} \n ${appendStr}`
  return temp
}
