import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'http://127.0.0.1:5001/clone-2e637/us-central1/fedho'
    baseURL: 'https://amazon-clone-deployment.onrender.com'
})

export {axiosInstance}