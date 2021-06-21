import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = '/api'
axios.defaults.headers

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    //window.localStorage.getItem("accessToken") 获取token的value
    let token = localStorage.getItem("token")
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.token = token;
        //也可以这种写法
        // config.headers['accessToken'] = Token;
        return config;
    }
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
        let res = response;

        console.log("=================")
        console.log(res)
        console.log("=================")

        if (res.status === 200 && res.data.code === 0) {
            return response
        } else {
            Element.Message.error(response.data.msg, {duration: 3 * 1000})
            return Promise.reject(response.data.msg)
        }
    },
    error => {
        console.log(error)
        Element.Message.error(error.message, {duration: 3 * 1000})
        if(error.response.data) {
            error.message = error.response.data.msg
        }

        if(error.response.status === 401) {
            store.commit("REMOVE_INFO")
            router.push("/login")
        }
        return Promise.reject(error)
    }

)