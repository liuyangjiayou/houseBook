import axios from 'axios'
import qs from  'qs'
import Vue from 'vue';
axios.defaults.baseURL = 'http://localhost:8080/api';
// axios.defaults.baseURL = 'http://zhaofang.ok.wang/index/index/httprequest';
// axios.defaults.baseURL = "https://newhr.t.ok.wang/api"

//发送请求的时候的一个拦截器
axios.interceptors.request.use(function (config) {
  config.headers = {
    'Content-Type':'application/x-www-form-urlencoded', //设置跨域头部'
  };
  //url 路径传参

  return config
},function (err) {
  return Promise.reject(err);
});



//接受响应的一个拦截器
axios.interceptors.response.use(function (res) {
    
    // if(res.data.errcode == 4002){console.log(res.data.data.url);window.location.href = res.data.data.url;return false;};

    return res.data
},function (err) {
    return Promise.reject(err);
});


/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
    })
  })
}