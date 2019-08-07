module.exports = {
    devServer: {
      proxy: {
        '^/https://weatherfennell.herokuapp.com': {
          target: 'http://localhost:8000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '/https://weatherfennell.herokuapp.com': ''
          }
        }
      }
    }
  }

// module.exports = {
//     devServer: {
//         proxy: 'http://localhost:8000'
//     }
// };