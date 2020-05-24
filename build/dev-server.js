const open = require('opn');
const webpack = require('webpack')
const { argv } = require('yargs')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const createDomain = require('webpack-dev-server/lib/util/createDomain')
const optionsSchema = require('webpack-dev-server/lib/optionsSchema.json')
const addDevServerEntrypoints = require('webpack-dev-server/lib/util/addDevServerEntrypoints')

const webpackConfig = require('./webpack.dev.conf')

const devServerOptionsKeys = Object.keys(optionsSchema.properties)

function colorInfo(useColor, msg) {
  if (useColor) {
    // Make text blue and bold, so it *pops*
    return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`;
  }
  return msg;
}

function reportReadiness(uri, options) {
  const useColor = argv.color;
  const contentBase = Array.isArray(options.contentBase) ? options.contentBase.join(', ') : options.contentBase;

  if (!options.quiet) {
    let startSentence = `Project is running at ${colorInfo(useColor, uri)}`;
    if (options.socket) {
      startSentence = `Listening to socket at ${colorInfo(useColor, options.socket)}`;
    }

    console.log((options.progress ? '\n' : '') + startSentence);

    console.log(`webpack output is served from ${colorInfo(useColor, options.publicPath)}`);

    if (contentBase) { console.log(`Content not from webpack is served from ${colorInfo(useColor, contentBase)}`); }

    if (options.historyApiFallback) { console.log(`404s will fallback to ${colorInfo(useColor, options.historyApiFallback.index || '/index.html')}`); }

    if (options.bonjour) { console.log('Broadcasting "http" with subtype of "webpack" via ZeroConf DNS (Bonjour)'); }
  }
  if (options.open) {
    let openOptions = {};
    let openMessage = 'Unable to open browser';

    if (typeof options.open === 'string' && options.open !== 'true') {
      openOptions = { app: options.open };
      openMessage += `: ${options.open}`;
    }

    open(uri + (options.openPage || ''), openOptions).catch(() => {
      console.log(`${openMessage}. If you are running in a headless environment, please do not use the open flag.`);
    });
  }
}

const filterArgv = Object.keys(argv).reduce((prev, item) => {
  if (item !== '_' && item.indexOf('$') === -1 && devServerOptionsKeys.indexOf(item) > -1) {
    prev[item] = argv[item] === 'true' ? true : argv[item]
  }
  return prev
}, {})

webpackConfig.then((config) => {
  const devServerOptions = Object.assign({}, config.devServer, filterArgv);
  addDevServerEntrypoints(config, devServerOptions);
  const compiler = webpack(config)

  if (devServerOptions.progress) {
    compiler.apply(new webpack.ProgressPlugin({
      profile: argv.profile
    }));
  }

  const server = new WebpackDevServer(compiler, devServerOptions)
  server.listen(devServerOptions.port, devServerOptions.host, (err) => {
    if (err) throw err
    const suffix = (devServerOptions.inline !== false || devServerOptions.lazy === true ? '/' : '/webpack-dev-server/');
    const uri = createDomain(devServerOptions, server.listeningApp) + suffix;
    reportReadiness(uri, devServerOptions);
  })
})
