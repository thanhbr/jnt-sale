import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import useGlobalContext from 'containerContext/storeContext'
import {StyledWarehouseTSExtraInfo} from './_styled'
import React from "react";
import useWarehouseTSExtraInfo from 'Pages/CreateWarehouseTransfer/hooks/useWarehouseExtraInfo'
import { WarehouseTransferDate } from './_transferDate';
import { Text } from 'common/text';

export const WarehouseTSExtraInfo = ({...props}) => {
  const [state] = useGlobalContext()
  const fullNameAccount = state?.user?.fullname || '---'

  const {data, methods} = useWarehouseTSExtraInfo()
  const {note} = data

  return (
    <StyledWarehouseTSExtraInfo {...props}>
      <div className="order-single-extra-info__input-group">
        <div className="order-single-extra-info__input" data-size="lg">
          <Text>Ngày chuyển kho</Text>
          <WarehouseTransferDate />
        </div>
        <div className="order-single-extra-info__input" data-size="lg">
          <Input disabled={true} label="Nhân viên thực hiện" value={fullNameAccount} />
        </div>
        <div className="order-single-extra-info__input" data-size="lg">
          <Textarea
            label="Ghi chú"
            placeholder="Nhập ghi chú chuyển kho"
            value={note}
            onChange={e => methods.onNoteChange(e.target.value)}
            validateText={methods.errorNote ? 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!': ''}
            validateType={'danger'}
            style={{resize: 'none'}}
            maxLength={256}
          />
        </div>
      </div>
    </StyledWarehouseTSExtraInfo>
  )
}
