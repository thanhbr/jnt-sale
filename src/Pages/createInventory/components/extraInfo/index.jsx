import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import useGlobalContext from 'containerContext/storeContext'
import {StyledOrderSingleExtraInfo} from './_styled'
import React from "react";
import useOrderSingleExtraInfo from "../../hooks/useOrderSingleExtraInfo";

export const OrderSingleExtraInfo = ({...props}) => {
  const [state] = useGlobalContext()
  const fullNameAccount = state?.user?.fullname || '---'

  const {data, methods} = useOrderSingleExtraInfo()
  const {uniqueOrderNumber, note} = data

  return (
    <StyledOrderSingleExtraInfo {...props}>
      <div className="order-single-extra-info__input-group">

        <div className="order-single-extra-info__input" data-size="lg">
          <Input disabled={true} label="Nhân viên tạo" value={fullNameAccount} />
        </div>
        <div className="order-single-extra-info__input" data-size="lg">
          <Textarea
            label="Ghi chú"
            placeholder="Nhập ghi chú phiếu kiểm (VD: Kiểm kho hàng lẻ...)"
            value={note.value}
            onChange={e => methods.onNoteChange(e.target.value)}
            validateText={methods.errorNote ? 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!': ''}
            validateType={!methods.errorNote ? 'success' : 'danger'}
            style={{resize: 'none'}}
            maxLength={256}
          />
        </div>
      </div>
    </StyledOrderSingleExtraInfo>
  )
}
