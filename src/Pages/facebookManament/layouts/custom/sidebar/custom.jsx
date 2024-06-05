import {createContext, useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {StyledCustomSidebar} from './_styledCustom'
import * as React from "react";
import useGlobalContext from '../../../../../containerContext/storeContext'


export const SidebarContext = createContext(null)

export const CustomSidebar = ({...props}) => {

   const [globalState, globalDispatch] = useGlobalContext()
   const {shouldMinimizeSidebar} = globalState

   const [activeId, setActiveId] = useState(true)

   const nav = useNavigate()
   useEffect(() => {
      // close submenu when minimize sidebar
      if (shouldMinimizeSidebar) setActiveId(null)
   }, [shouldMinimizeSidebar])

   return (
      <SidebarContext.Provider value={{activeId, setActiveId}}>
         <StyledCustomSidebar
            data-minimize={globalState?.shouldMinimizeSidebar}
            {...props}
         >
            <div className="customer-nar-logo" onClick={() => nav('/')}>
               <img src="/img/logo-thumb.png" alt="logo" />
            </div>
            {props.children}
         </StyledCustomSidebar>
      </SidebarContext.Provider>
   )
}
