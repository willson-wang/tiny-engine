const path = require('path')
const fs = require('fs')

const cwd = process.cwd()

// existsSync 目录or文件是否存在
// writeFileSync 同步写文件
// readdirSync 读取某个目录下的文件
// statSync 判断是目录还是文件

const { resolve } = path

let appendStr = ''
let businessComponent = []

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

function requireModule(index, isProd) {
  return isProd ? `try {
    require('${index}')
  } catch(e) {
    console.log(e)
  }
  ` : `require('${index}')`
}

function hasIndexJs(rootDir) {
  readdirSync(rootDir).forEach((dir) => {
    console.log('dir', dir)
    if (statSync(resolve(rootDir, dir)).isDirectory()) {
      const indexPath = resolve(rootDir, dir, 'index.js')
      businessComponent.push(resolve(rootDir, dir))
      if (existsSync(indexPath)) {
        console.log('module xxx 存在 index.js')
        appendStr += `${requireModule(indexPath)} \n `
      } else if (statSync(resolve(rootDir, dir, 'src')).isDirectory()) {
        const indexPathPackage = resolve(rootDir, dir, 'src/index.js')
        if (existsSync(indexPathPackage)) {
          console.log('packages xxx 存在 index.js')
          appendStr += `${requireModule(indexPathPackage)} \n `
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
  // console.log('context', context)
  appendStr = ''
  findBusinessComponents()
  // console.log('businessComponent', businessComponent)
  const temp = `${context} \n ${appendStr}`
  // console.log('temp', temp)
  return temp
}
