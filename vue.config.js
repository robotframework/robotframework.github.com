const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, './src/components/'),
        Img: path.resolve(__dirname, './src/assets/img/'),
        Css: path.resolve(__dirname, './src/assets/css/'),
        Fonts: path.resolve(__dirname, './src/assets/fonts/'),
        Content: path.resolve(__dirname, './src/content/'),
        Code: path.resolve(__dirname, './src/content/code')
      }
    },
    plugins: [new MonacoWebpackPlugin({
      languages: ['python', 'html', 'javascript', 'typescript']
    })],
    module: {
      rules: [
        {
          include: [path.resolve(__dirname, 'src/content/code/projects')],
          use: 'raw-loader'
        }
      ]
    }
  },
  transpileDependencies: [
    'monaco-editor'
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Robot Framework'
        args[0].meta = 'Generic open source automation framework for acceptance testing, acceptance test driven development (ATDD), and robotic process automation (RPA).'
        return args
      })
    config
      .plugin('define')
      .tap(args => {
        args[0] = {
          ...args[0],
          __INTLIFY_PROD_DEVTOOLS__: false
        }
        return args
      })
    config
      .plugin('preload')
      .tap(args => {
        args[0].include = 'allAssets'
        args[0].as = (entry) => {
          if (/\.css$/.test(entry)) return 'style'
          if (/\.woff$/.test(entry)) return 'font'
          return 'script'
        }
        return args
      })
  }
}
