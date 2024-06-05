import './i18n'

import React from 'react'
import {BrowserView, MobileView} from 'react-device-detect'
import LayoutWrapper from './LayoutWrapper'
import LayoutMobile from './Pages/LayoutMobile'
import {Store} from './containerContext/storeContext'
import {ToastContainer} from 'react-toastify'
import {createTheme, ThemeProvider} from '@material-ui/core'
import './styles/_tooltip.scss'

const App = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1580,
      },
    },
  })

  return (
      <Store>
        <BrowserView>
          <ThemeProvider theme={theme}>
            <LayoutWrapper />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
          </ThemeProvider>
        </BrowserView>
        <MobileView>
          <LayoutMobile />
        </MobileView>
      </Store>
  )
}

export default App
