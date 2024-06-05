import React, { createContext, useReducer, useContext, useEffect } from 'react'

// import Navigation from './Component/SideMenu/SideMenu';
import Navigation from 'Component/NavBar/navBar'
import { initialSettingState } from './Pages/Setting/stores/initState'
import SettingReducer from './Pages/Setting/stores/reducer'
import { getData, sendRequest } from './api/api'
import { getUrlStoreSetting } from './api/url'
import useGlobalContext from '../src/containerContext/storeContext'

export const SettingContext = createContext(initialSettingState)
const SettingStore = ({ children }) => {
  const [state, dispatch] = useReducer(SettingReducer, initialSettingState)
  return (
    <SettingContext.Provider value={[state, dispatch]}>
      {children}
    </SettingContext.Provider>
  )
}

const LayoutWrapper = (params) => {
  const [state, dispatch] = useGlobalContext()
  const getDataStoreSetting = () => {
    const url = getUrlStoreSetting()
    sendRequest('get', url)
      .then(res => {
        if (res && res.data && res.data.success) {
          const data = res.data.data || []
          dispatch({ type: 'GET_STORE_INFO', payload: data })
        } else {
        }
      })
      .catch(error => {
        console.log(`error${error}`)
      })
  }

  useEffect(() => {
    getDataStoreSetting()
  }, [])

  return (
    <div className="App">
      <SettingStore>
        <Navigation/>
      </SettingStore>
    </div>
  )
}
export default LayoutWrapper