import axios from 'axios'

axios.defaults.baseURL = 'https://fdf2-73-101-31-51.ngrok.io/api' // process.env.API_URL;
// axios.defaults.headers.common['Authorization'] = "Bearer" + null;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.withCredentials = true
window.axios = axios
