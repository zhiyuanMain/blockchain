const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VUE_APP_NODE_ENV, NODE_ENV } = process.env
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isProd = VUE_APP_NODE_ENV === 'prod'

console.warn('NODE_ENV', NODE_ENV)
// 自定义不区分环境的  变量
process.env.VUE_APP_HASH = new Date().getTime()
module.exports = {
  lintOnSave: false,
  productionSourceMap: false, // 禁用生产环境 source-map
  //   publicPath: BUILD_LINK,
  devServer: {
    port: 9000,
    proxy: {
      '/chain-blocks': {
        target: 'http://block.metachain1.com/',
        // target: 'http://172.16.100.194:8280',
        secure: false,
        changeOrigin: true, // 是否开启跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/recent-transactions': {
        target: 'http://block.metachain1.com/',
        // target: 'http://172.16.100.194:8280',
        secure: false,
        changeOrigin: true, // 是否开启跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/overview': {
        target: 'http://block.metachain1.com/',
        // target: 'http://172.16.100.194:8280',
        secure: false,
        changeOrigin: true, // 是否开启跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      // userSendFrombsc
      '/userSendFrombsc': {
        target: 'http://8.218.73.59:3010/',
        // target: 'http://172.16.100.194:8280',
        secure: false,
        changeOrigin: true, // 是否开启跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
      '/w3j': {
        target: 'https://www.metaswap.im/',
        // target: 'http://172.16.100.194:8280',
        secure: false,
        changeOrigin: true, // 是否开启跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      },
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: (config) => {
    const conf = {
      resolve: {
        modules: [process.cwd(), 'node_modules'],
        alias: {
          '@': path.resolve(__dirname, './src'),
          vue$: 'vue/dist/vue.esm.js',
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          $utils: path.resolve(__dirname, './src/utils'),
          // $api: path.resolve(__dirname, './src/api'),
          $store: path.resolve(__dirname, './src/store'),
          $const: path.resolve(__dirname, './src/utils/const.js'),
          $filters: path.resolve(__dirname, './src/utils/filters.js'),
          $bridge: path.resolve(__dirname, './src/utils/bridge'),
          $app: path.resolve(__dirname, './src/utils/app'),
        }),
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        }),
      ],
      optimization: {
        splitChunks: {
          chunks: 'all',
          maxSize: 1500000,
          minSize: 1450000,
          cacheGroups: {
            common: {
              // test: /[\\/]node_modules[\\/]/,
              name: 'common',
              chunks: 'initial',
              priority: 2,
              minChunks: 2,
            },
          },
        },
        minimizer: [],
      },
    }

    if (isProd) {
      conf.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
        })
      )
    }
    return conf
  },
}
