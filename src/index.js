import React from 'react'
import ReactDOM from "react-dom/client"
import App from './App'
import './i18n'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import store from './Store/index'
import {Provider} from 'react-redux'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    // </React.StrictMode>,
)
