import axios from 'axios'
import store from '@/store'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const API = process.env.VUE_APP_API
const BASE_API = process.env.VUE_APP_BASE_API
const TIMEOUT = process.env.VUE_APP_API_TIMEOUT

axios.defaults.withCredentials = true

const axiosconfig = {
  baseURL: API,
  timeout: TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

console.log('create axios')
const http = axios.create(axiosconfig)
console.log('set interceptors for req')

http.interceptors.request.use(
  async config => {
    const f = await FingerprintJS.load()
    const fp = store.getters['auth/getFingerprint']
    if (!config.headers) return config
    if (fp && fp !== '') {
      config.headers.Fingerprint = fp
    } else {
      const res = await f.get()
      const id = res.visitorId
      config.headers.Fingerprint = id
    }
    config.headers['X-ABIERRE-REQID'] = btoa(
      unescape(
        encodeURIComponent(
          Date.parse((new Date()).toString()) + BASE_API
        )
      )
    )
    return config
  },
  err => {
    console.log(err)
    // store.dispatch('auth/logout')
  }
)

// console.log('set interceptors for res')
http.interceptors.response.use(
  res => res,
  err => {
    console.log(err)
    // store.dispatch('auth/logout')
    return Promise.reject(err)
  }
)

export default http
