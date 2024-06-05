import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import CONFIG from '../config'
import dataStorage from '../dataStorage'
import { PATH } from '../const/path'
import { getUrlUserInfo } from './url'
import toast from '../Component/Toast'

let URL
const ENV = CONFIG.env
const TIMEOUT_DEFAULT = 15000
switch (ENV) {
  case 'DEV':
    URL = ''
    break
  default:
    break
}
export const useAxiosPost = (url, bodyData, cb, timeout) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let unmounted = false
    const source = axios.CancelToken.source()
    const config = {
      method: 'post',
      url,
      withCredentials: true,
      cancelToken: source.token,
      data: bodyData,
    }
    axios(config)
      .then(response => {
        if (!unmounted && response && response.data && response.data.success) {
          const { data } = response.data
          setLoading(false)
          setData(data)
          cb && cb(data)
        }
        if (
          response &&
          response.data &&
          response.data.message === 'Unauthorized!'
        ) {
          // token expire case :
          console.log('token expire case ')
        }
      })
      .catch(error => {
        if (!unmounted) {
          setError(true)
          setErrorMessage(error.message)
          setLoading(false)
          if (axios.isCancel(error)) {
            console.log(`request cancelled:${error.message}`)
          } else {
            console.log(`another error happened:${error.message}`)
          }
        }
      })
    return function () {
      unmounted = true
      source.cancel('Cancelling in cleanup')
    }
  }, [url, timeout])
  return { data, loading, error, errorMessage }
}
export const useAxiosFetch = (url, cb, timeout) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let unmounted = false
    const source = axios.CancelToken.source()
    const config = {
      method: 'get',
      url,
      withCredentials: true,
      cancelToken: source.token,
    }
    axios(config)
      .then(response => {
        if (!unmounted && response && response.data && response.data.success) {
          const { data } = response.data
          setLoading(false)
          setData(data)
          cb && cb(data)
        }
        if (
          response &&
          response.data &&
          response.data.message === 'Unauthorized!'
        ) {
          // token expire case :
          console.log('token expire case ')
        }
      })
      .catch(error => {
        if (!unmounted) {
          setError(true)
          setErrorMessage(error.message)
          setLoading(false)
          if (axios.isCancel(error)) {
            console.log(`request cancelled:${error.message}`)
          } else {
            console.log(`another error happened:${error.message}`)
          }
        }
      })
    return function () {
      unmounted = true
      source.cancel('Cancelling in cleanup')
    }
  }, [url, timeout])
  return { data, loading, error, errorMessage }
}

export async function getUserAsync () {
  try {
    const url = getUrlUserInfo()
    const response = await axios.get(url)
    console.log('get user async')
  } catch (error) {
    console.error(error)
  }
}

export async function getDataAsync (url, CancelToken, byPassForceLogout, cb) {
  try {
    const config = {
      method: 'get',
      url,
      withCredentials: true,
      cancelToken: CancelToken,
    }

    if (CancelToken) config.cancelToken = CancelToken
    const res = await axios(config)
    return res
  } catch (error) {
    return error
  }
}

//export function getData(url, CancelToken, byPassForceLogout, cb) {
//return sendRequest('get', url, null, CancelToken, byPassForceLogout, cb)
//}
export function getData (url, CancelToken, byPassForceLogout, cb) {
  return sendRequestAuth('get', url)
}

export function getDataAuth (
  url,
  access_token,
  CancelToken,
  byPassForceLogout,
  cb,
) {
  return sendRequestAuth(
    'get',
    url,
    null,
    CancelToken,
    byPassForceLogout,
    cb,
    access_token,
  )
}

export function deleteData (url, data, CancelToken, byPassForceLogout, cb) {
  return sendRequest('delete', url, data, CancelToken, byPassForceLogout, cb)
}

export function postData (url, data, CancelToken, byPassForceLogout, cb) {
  return sendRequest('post', url, data, CancelToken, byPassForceLogout, cb)
}

export function postDataAuth (
  url,
  data,
  access_token,
  CancelToken,
  byPassForceLogout,
  cb,
) {
  return sendRequestAuth(
    'post',
    url,
    data,
    access_token,
    CancelToken,
    byPassForceLogout,
    cb,
    access_token,
  )
}

export function ForceLogout (cb) {
  try {
    cb && cb()
    return (
      <Route>
        <Navigate
          exact
          to={{
            pathname: PATH.LOGIN,
          }}
        />
      </Route>
    )
  } catch (error) {
    console.log(`err${error}`)
  }
}

export function sendRequest (
  method,
  url,
  data,
  CancelToken,
  byPassForceLogout,
  cb,
) {
  try {
    const handleRequest = (resolve, reject) => {
      const token = window.localStorage.getItem('token')
      const lang = window.localStorage.getItem('i18n') || 'vi'
      const config = {
        method,
        url,
        withCredentials: true,
        cancelToken: CancelToken,
        headers: {
          'Accept-Language': lang == 'vi' ? 'vi,vi-VN,en,en-US' : 'en,en-US,vi,vi-VN'
        },
      }
      if (data) config.data = data
      if (CancelToken) config.cancelToken = CancelToken
      axios(config)
        .then(response => {
          resolve(response)
          if (
            response &&
            response.data &&
            response.data.message === 'Unauthorized!'
          ) {
            // token expire case :
            console.log('token expire case ')
            // !byPassForceLogout && dataStorage.forceLogout && dataStorage.forceLogout()
            // window.location.reload();
          }
        })
        .catch(error => {
          reject(error)
        })
    }
    return new Promise((resolve, reject) => {
      handleRequest(resolve, reject)
    })
  } catch (error) {
    console.log(error)
  }
}

export function sendRequestAuth (
  method,
  url,
  data,
  CancelToken,
  byPassForceLogout,
  cb = () => {console.log('lỗi server')},
  access_token,
) {
  try {
    const handleRequest = (resolve, reject) => {
      // if (!navigator.onLine) reject('offline')
      const token = window.localStorage.getItem('token')
      const config = {
        method,
        url,
        withCredentials: true,
        cancelToken: CancelToken,
        // headers: {Authorization: `Bearer ${token}`},
      }
      if (data) config.data = data
      if (CancelToken) config.cancelToken = CancelToken
      axios(config)
        .then(response => {
          if (response.data.auth_status == 403) {
            location.replace(`${CONFIG.HREF}/login`)
          }
          resolve(response)
          if (
            response &&
            response.data &&
            response.data.message === 'Unauthorized!'
          ) {
            // token expire case :
            console.log('token expire case ')
            // !byPassForceLogout && dataStorage.forceLogout && dataStorage.forceLogout()
            // window.location.reload();
          }
        })
        .catch(error => {
          // reject(error)
          if (method == 'post')
            toast.error('Hệ thống đang bận, vui lòng chờ trong giây lát!')
          cb()
          console.log(error)
        })
    }
    return new Promise((resolve, reject) => {
      handleRequest(resolve, reject)
    })
  } catch (error) {
    console.log(error)
  }
}
