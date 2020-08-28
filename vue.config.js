const domain = 'http://test.material.muyuhuajiaoyu.com';
// const domain = 'http://material.muyuhuajiaoyu.com'
// const domain = 'http://192.168.8.10';   // dev
// const domain = 'http://192.168.8.60';  // 廖顺
// const domain = 'http://192.168.8.66   // 袁长城
module.exports = {
  devServer: {
    proxy: {
      '/material': {
        // 将www.exaple.com印射为/apis
        target: domain + (/\.com$/.test(domain) ? '/material' : ':8181/'),
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/material': '' // 需要rewrite的,
        }
      },
      '/lshy': {
        target: domain + (/\.com$/.test(domain) ? '/lshy' : ':8080/'),
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/lshy': '' // 需要rewrite的,
        }
      }
    }
  }
};
