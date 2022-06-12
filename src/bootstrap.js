import axios from 'axios'

axios.defaults.baseURL = 'http://api.lds.test/api' // process.env.API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.withCredentials = true
window.axios = axios
