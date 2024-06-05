import React, {useEffect, useState} from 'react'
import cls from 'clsx'
import css from './index.module.scss'
import useGlobalContext from '../../containerContext/storeContext'
import {CustomToolTip} from '../tooltip/CustomTooltip'
import {Popover} from '@mui/material'
import {AccountDropdown} from './_dropdown';
import {getData} from "../../api/api";
import {getShopInfo} from "../../api/url";
import {StoreAccountProvider} from './reducer/index'
import {useEditStoreConfig} from "./hook/useEditStoreConfig";
import {useAccountAction} from "./reducer/reducer";
const Index = () => {
  const [state] = useGlobalContext()
    const {provider} = useEditStoreConfig()
const [data,setData] = useState()
  const [anchorEl, setAnchorEl] = useState()
  const handleOpen = e => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
    const setCloseAnchor = () =>{
      setAnchorEl(null)

    }
    useEffect(()=>{
        fetchShopInfo()

    },[])
    const fetchShopInfo = async () => {
        try {
            provider.dispatch({
              type: useAccountAction.SET_WARNING_PHONE_CREATE_ORDER,
              payload: +state?.shopInfo?.ct_order_warning !== 1
            })
            const res = await getData(getShopInfo())
            if (res.data.success) {
                setData(res.data.data)
                provider.dispatch({type:useAccountAction.GET_DETAIL_STORE_CONFIG,payload:res.data.data})
            }
        } catch (e) {
            console.log(e)
        }
    }
  return (
      <StoreAccountProvider  value={{ pageState : provider.state, pageDispatch : provider.dispatch}}>
          <div className={cls(css.wrapper)}>
              <div className={cls(css.store)}>
                  <div
                      className={cls(css.name)}
                      aria-describedby={id}
                      style={{cursor: 'pointer'}}
                      onClick={handleOpen}
                  >
                      <CustomToolTip
                          title={
                              // <p className={cls(css.fullname)}>Name of the store</p>
                              <p className={cls(css.fullname)}>{data? data?.shopname : state?.shopInfo?.store_name}</p>
                          }
                          arrow
                      >
                          {/* <p className={cls(css.fullname)}>Name of the store</p> */}
                          <p className={cls(css.fullname)}>{data? data?.shopname : state?.shopInfo?.store_name}</p>
                      </CustomToolTip>
                      <svg
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path
                              d="M6.00003 6.59416L11.0084 1.58583L9.83086 0.406662L6.00003 4.24L2.17003 0.406662L0.991699 1.585L6.00003 6.59416Z"
                              fill="#B9BBD3"
                          />
                      </svg>
                  </div>
                  <span></span>
              </div>
              <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  sx={{top: 18}}
              >
                  <AccountDropdown fetchShopInfo={fetchShopInfo} data={data} setCloseAnchor={setCloseAnchor}/>
              </Popover>

          </div>
      </StoreAccountProvider>

  )
}

export default Index
