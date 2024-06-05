import { useEffect, useReducer, useState, memo } from 'react'
import './index.scss'
import FormGroup from './formGroup'
import { InitialState } from 'Pages/Consignment/store/initState'
import Reducer from 'Pages/Consignment/store/reducer'
import InfoShipping from './InfoShipping'
export default function ShippingPointInfomation({ className = '', style, data, handleClosePopup, handleFlag, handleOpenConfirm, handleCheckConfirm ,handleDefault}) {
  const [state, dispatch] = useReducer(Reducer, InitialState)
  const dataInfo = data.getInfoConsigment
  return (
    <div className={`p-consingment ${className}`}>
      <div className="p-consingment__shipping-point-infomation">
        <div className="p-consingment__title">
          <p>Thông tin điểm gửi hàng</p>
          <span>
            Là địa điểm shipper/đơn vị vận chuyển đến lấy hàng hoá từ chủ shop.
          </span>
        </div>
        {
          dataInfo.length > 0 ? <InfoShipping handleDefault={handleDefault} handleOpenConfirm={handleOpenConfirm} dataInfo={dataInfo} handleCheckConfirm={handleCheckConfirm} handleClosePopup={handleClosePopup} handleFlag={handleFlag} /> :
            <FormGroup handleOpenConfirm={handleOpenConfirm} dataInfo={dataInfo} handleCheckConfirm={handleCheckConfirm} handleClosePopup={handleClosePopup} handleFlag={handleFlag} />
        }


      </div>

    </div>
  )
}
