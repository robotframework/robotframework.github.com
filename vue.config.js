const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, './src/components/'),
        Img: path.resolve(__dirname, './src/assets/img/'),
        Css: path.resolve(__dirname, './src/assets/css/'),
        Fonts: path.resolve(__dirname, './src/assets/fonts/'),
        Content: path.resolve(__dirname, './src/content/'),
        Code: path.resolve(__dirname, './src/js/code'),
        Js: path.resolve(__dirname, './src/js/')
      }
    },
    plugins: [
      new MonacoWebpackPlugin({
        languages: ['python', 'html', 'javascript', 'typescript', 'yaml', 'xml', 'json', 'markdown']
      })
    ]
  },
  transpileDependencies: [
    'monaco-editor'
  ],
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        args[0] = {
          ...args[0],
          __INTLIFY_PROD_DEVTOOLS__: false
        }
        return args
      })
  }
}
