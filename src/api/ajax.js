// 封装ajax请求
import axios from 'axios';
import qs from 'qs'
import {message} from 'antd'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    //得到请求方式和请求体数据
    const {method,data}=config
    //处理post请求，将data对象转换成query参数格式字符串
    if(method.toLowerCase()==='post' && typeof data==='object'){
        config.data=qs.stringify(data)
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // 添加响应拦截器
  //在请求返回之后，且在我们指定的请求响应回调函数之前
axios.interceptors.response.use(function (response) {
    return response.data;//返回的结果就会交给我们指定的请求响应的回调
  }, function (error) {
      message.error("请求出错"+error.message)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return new Promise(()=>{});
  });

export default axios
