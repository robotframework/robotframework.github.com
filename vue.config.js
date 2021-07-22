const path = require('path')

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        Components: path.resolve(__dirname, './src/components/'),
        Img: path.resolve(__dirname, './src/assets/img/'),
        Css: path.resolve(__dirname, './src/assets/css/'),
        Fonts: path.resolve(__dirname, './src/assets/fonts/')
      }
    }
  },
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
  }
}
