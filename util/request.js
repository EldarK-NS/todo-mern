import axios from 'axios'

export const request = axios.create({
    baseURL: 'http://localhost:3243',
    headers: {
        "Content-Type": "application/json"
    }
})
request.interceptors.request.use(function (config) {
    const userData = JSON.parse(localStorage.getItem('user_info'))
    const token = userData ? userData.token : ''
    config.headers.Authorization = token

    return config

})