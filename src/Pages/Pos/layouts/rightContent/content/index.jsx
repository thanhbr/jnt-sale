import React, { useEffect, useRef } from 'react'
import { Button } from '../../../../../common/button'
import { Grid } from '@mui/material'
import Provisional from './_provisional'
import Payment from './_payment'
import Verification from './_verification'
import usePosPayment from '../../../hooks/usePosPayment'
import Customer from './_customer'
import { usePosCustomer } from '../../../hooks/usePosCustomer'
import { POS_ICON } from '../../../constants/icons'
import { Text } from '../../../../../common/text'

const ContentRight = () => {
  const { activeOrderCustomer, methods, formCreate } = usePosPayment()

  const { customer } = usePosCustomer()
  const customerTabRef = useRef()
  const customerRef = useRef()

  const handleWindowBtnClick = e => {
    if (e.keyCode === 115) {
      methods?.handleTabChange('select')
    }
    if (e.keyCode === 120) {
      methods?.submit(formCreate)
    }
  }
  useEffect(() => {
    window.addEventListener('keyup', handleWindowBtnClick)
    return () => {
      window.removeEventListener('keyup', handleWindowBtnClick)
    }
  }, [formCreate])

  return (
    <>
      {
        !!customer?.active?.data?.id ?
          <div className={'content-pos__customer'}>
            <div className={'content-pos__customer-general'} >
              <img src="/img/pos/avatar-customer.png" alt="avatar customer"/>
              <div className={'content-pos__customer-info'}>
                <Text as={'p'} fontSize={15} fontWeight={600} color={'#00081D'}>{customer?.active?.data?.name || '---'}</Text>
                <Text as={'p'} color={'#7C88A6'}>{customer?.active?.data?.mobile || '---'}</Text>
              </div>
            </div>
            <div className={'content-pos__customer-remove'}  onClick={customer.onRemove}>
              {POS_ICON.remove}
            </div>

          </div>
          :
          <div className={'content-pos--header'} ref={customerTabRef}>
            <button
              data-type={`${activeOrderCustomer.tab === 'guest' ? 'primary' : 'ghost'}`}
              className={'content-pos--header-customer'}
              onClick={_ => methods?.handleTabChange('guest')}
            >Khách lẻ</button>
            <button
              data-type={`${activeOrderCustomer.tab !== 'guest' ? 'primary' : 'ghost'}`}
              className={'content-pos--header-select'}
              onClick={_ => methods?.handleTabChange('select')}
            >Chọn khách hàng (F4)</button>
          </div>
      }
      <div className={'content-pos--body scroll-custom'}>
        <div className={'content-pos--body-wrapper'} ref={customerRef}>
          <Grid container>
            <Customer active={activeOrderCustomer.tab !== 'guest' && !!!customer?.active?.data?.id}/>
            <Provisional/>
            <Payment/>
          </Grid>
        </div>
      </div>
      <div className={'content-pos--footer'}>
        <Verification/>
      </div>
    </>
  )
}
export default ContentRight