import {Button} from 'common/button'
import useOrderSingle from 'Pages/orderSingle/hooks/useOrderSingle'
import {StyledActionFormBtnList} from './_styled'
import {SuccessfulOrder} from '../successfulOrderModal'
import React, {useContext, useState} from 'react'
import {Loading} from '../../../../common/loading'
import useGlobalContext from "../../../../containerContext/storeContext";
import {sendRequestAuth} from "../../../../api/api";
import config from "../../../../config";
import {orderSingleAction} from "../../provider/_actions";
import {OrderSingleContext} from "../../provider/_context";
import {Box, Modal} from "@mui/material";
import {Text} from "../../../../common/text";
import styled from "styled-components";

export const ActionFormBtnList = ({...props}) => {
  const {methods, loading, shippingInfo, productInfo, form, properties, modalWarningPhone, submitQueries} =
    useOrderSingle()
  const { state, dispatch } = useContext(OrderSingleContext)
  const [dataOrder, setDataOrder] = useState()
  const [GlobalState,] = useGlobalContext()
  const warningPhone = +GlobalState?.shopInfo?.ct_order_warning === 1

  const handleToggleWarning = _ => {
    dispatch({
      type: orderSingleAction.SET_WARNING_PHONE,
      payload: !state?.warningPhone
    })
  }

  const handleChangeWarningPhone = async _ => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/customer/order-check?phone=${submitQueries?.customers?.customer_mobile || ''}`
    )
    if(response?.data?.success) {
      handleToggleWarning()
    } else {
      const response = methods.onSubmit({is_delivery: 1})
      response.then(res => {
        if (!!res?.data)
          setDataOrder({
            ...res.data,
            ...{is_delivery: 1},
            isStorePickUp: shippingInfo.isStorePickUp,
          })
        if(res?.data?.success) {
          methods.onUpdateQuantity(productInfo?.withInventoryConfig?.search?.selected)
        }
      })
    }
  }

  const handleSubmit = opt => {
    const response = methods.onSubmit(opt)
    response.then(res => {
      if (!!res?.data)
        setDataOrder({
          ...res.data,
          ...opt,
          isStorePickUp: shippingInfo.isStorePickUp,
        })
      if(res?.data?.success && +opt?.is_delivery === 1) {
        methods.onUpdateQuantity(productInfo?.withInventoryConfig?.search?.selected)
      }
    })
  }

  const createOrder = opt => {
    if(+opt?.is_delivery === 1 && warningPhone) {
      handleChangeWarningPhone()
    } else {
      handleSubmit(opt)
    }
  }


  return (
    <>
      {dataOrder && <SuccessfulOrder data={dataOrder} />}
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href="/orders">
          Hủy
        </Button>
        {!(productInfo.inventory && shippingInfo.isStorePickUp) && (
          <Button
            appearance="ghost"
            style={{minwidth: 107, marginLeft: 12}}
            onClick={() => createOrder({is_draft: 1})}
          >
            Lưu nháp
          </Button>
        )}
        <Button
          style={{minWidth: 168, marginLeft: 12}}
          disabled={!properties.canSaveOrder}
          onClick={() =>
            properties.canSaveOrder && createOrder({is_delivery: 1})
          }
        >
          {form?.productInfo.inventory && form?.shippingInfo.isStorePickUp
            ? 'Hoàn tất đơn hàng'
            : 'Lưu và gửi giao hàng'}
        </Button>
      </StyledActionFormBtnList>
      {loading && <Loading />}
      {modalWarningPhone &&
      <WarningPhoneModal
        modalWarningPhone={modalWarningPhone}
        onSubmit={() => handleSubmit({is_delivery: 1})}
        onClose={handleToggleWarning}
      /> }
    </>
  )
}

export const WarningPhoneModal = ({modalWarningPhone, onSubmit, onClose, ...props}) => {
  return (
    <Modal open={modalWarningPhone} onClose={onClose}>
      <Box>
        <StyledWarningPhoneModal>
          <Text as={'p'} fontWeight={600} fontSize={20}>Khách hàng đã được tạo đơn trong ngày</Text>
          <Text as={'p'}>Số điện khách hàng này đã được tạo đơn trong ngày. Hãy chắc chắn bạn không tạo trùng đơn hàng trước khi xác nhận.
            <br/>Bạn vẫn muốn tiếp tục tạo đơn?</Text>
          <div className={'warning-phone-modal--group-btn'}>
            <Button appearance={'ghost'}
                    size={'sm'}
                    onClick={onClose}
            >Hủy</Button>
            <Button size={'sm'}
                    onClick={() => {
                      onClose()
                      onSubmit()
                    }}
            >Xác nhận</Button>
          </div>
        </StyledWarningPhoneModal>
      </Box>
    </Modal>
  )
}

export const StyledWarningPhoneModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 32px;
  
  width: 480px;
  height: 224px;
  margin: auto;
  margin-top: 40vh;
  
  background: #FFFFFF;
  /* Style 1 */
  
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  .warning-phone-modal {
    &--group-btn {
      width: 100%;
      text-align: end;
      button:first-child {
        width: 110px;
        margin-right: 8px;
      }
      button:nth-child(2) {
        width: 110px;
      }
    }
  }
`

