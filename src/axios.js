import axios from 'axios'


/* TODO REMOVE */ 
console.log(process.env);
console.log(process.env.REACT_APP_DEVICE_MODE);
console.log(process.env.REACT_APP_API_URL)

/* TODO SWAP */
axios.defaults.baseURL = "https://c8cc-73-101-31-51.ngrok.io/api/"; //process.env.REACT_APP_API_URL;
// axios.defaults.headers.common['Authorization'] = "Bearer" + null;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.withCredentials = true
window.axios = axios
