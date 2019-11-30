import Axios from 'axios'
import qs from  'qs'
import Vue from 'vue';
import { Loading,Message } from 'element-ui';


// axios.defaults.baseURL = 'http://zhaofang.ok.wang/index/index/httprequest';
// axios.defaults.baseURL = "https://newhr.t.ok.wang/api"
let axios = Axios.create({
    baseURL : 'http://localhost:8080/api'
})
let loadIndex;
function startLoading() {
    loadIndex = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0,0,0,0.6)'
    })
}
function endLoading() {
    loadIndex.close();
}



let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
 if (needLoadingRequestCount === 0) {
    startLoading()
 }
 needLoadingRequestCount++
}
export function tryHideFullScreenLoading(res) {
    if(res.errcode != 0 ){Message({message : res.msg,type : res.errcode == 0 ? 'success' : 'error'})};
    if (needLoadingRequestCount <= 0) return
        needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading();
        
    }
}



//发送请求的时候的一个拦截器
axios.interceptors.request.use(function (config) {
    config.headers = {
        'Content-Type':'application/x-www-form-urlencoded', //设置跨域头部'
    };
  //url 路径传参
  showFullScreenLoading();
  return config
},function (err) {
  return Promise.reject(err);
});




//接受响应的一个拦截器
axios.interceptors.response.use(function (res) {
    // if(res.data.errcode == 4002){window.location.href = res.data.data.url;return false;};
    tryHideFullScreenLoading(res.data);
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
    axios.post(url, qs.stringify(data))
      .then(res => {
        resolve(res);
      }, err => {
        reject(err);
    })
  })
}
/**
 * get 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url,data = {}){
    return new Promise((resolve, reject) => {
        axios.get(url, { params : data}).then(function (res) {
            resolve(res);
        }).catch(function (err) {
            reject(err);
        });
    })
};