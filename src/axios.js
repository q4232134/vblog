import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = '/api'
axios.defaults.headers

axios.interceptors.request.use(function (config) {
    let token = localStorage.getItem("token")
    if (token==null) token = '--'
    if (token) {
        config.headers.token = token;
        return config;
    }
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
        let res = response;
        console.log(res)
        if (res.data.code === 401) {
            store.commit("REMOVE_INFO")
            router.push("/Login")
        }
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
        return Promise.reject(error)
    }
)