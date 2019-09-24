import Vue from 'vue'
import qs from 'querystring'
import axios from 'axios'
const service = axios.create({
  // baseURL: process.env.BASE_API,
  baseURL: 'http://localhost:3000', // api 的 base_url，test--自己本地开启的服务地址 ，没有配proxy代理
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    response.data.code !== 'success' && Vue.prototype.$message.error(response.data.message)
    if (response.status === 200) {
        return Promise.resolve(response.data);
    } else {
        return Promise.reject(response.data);
    }
  },

  error => {
    return Promise.reject(error);
    // if (error.response.status) {
    //   switch (error.response.status) {
    //       case 404:
    //           alert('404')
    //           break;
    //   }
    //   return Promise.reject(error);
    // }
  }
)

//封装
function formatReq(type, url, data) {
  return new Promise((reslove, reject) => {
    service({
      method: type,
      url: url,
      headers: {
        //这里的请求头与后台商量设置
        'content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(data)
    })
      .then(r => {
        reslove(r);
      })
      .catch(e => {
        reject(e);
      });
  });
}

const HCXHR = {
  get: (url, data) => formatReq('get', url, data),
  post: (url, data) => formatReq('post', url, data),
  put: (url, data) => formatReq('put', url, data),
  patch: (url, data) => formatReq('patch', url, data),
  delete: (url, data) => formatReq('delete', url, data)
};

export default HCXHR;