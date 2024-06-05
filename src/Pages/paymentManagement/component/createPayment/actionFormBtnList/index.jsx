import {Button} from 'common/button'
import useOrderSingle from 'Pages/orderSingle/hooks/useOrderSingle'
import {StyledActionFormBtnList} from './_styled'
// import {SuccessfulOrder} from '../successfulOrderModal'
import {useState} from 'react'
// import {Loading} from '../../../../common/loading'
import { useLocation } from 'react-router-dom'
import {useCreatePaymentActionBtn} from "../hooks/useCreatePaymentActionBtn";

export const ActionFormBtnList = ({...props}) => {
const {functions, canSubmitForm} = useCreatePaymentActionBtn()
  const location = useLocation();
  const fromPage = location.state?.from || '/accountant/payment'

  return (
    <>
      <StyledActionFormBtnList {...props}>
        <Button appearance="ghost" href={fromPage} >
          Hủy
        </Button>
        <Button
          style={{ marginLeft: 12}}
          disabled={canSubmitForm}
          onClick={() =>
              functions.accept()
          }
        >
          Lưu
        </Button>
      </StyledActionFormBtnList>
    </>
  )
}
