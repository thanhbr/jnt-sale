import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import useOrderSingleExtraInfo from 'Pages/orderSingle/hooks/useOrderSingleExtraInfo'
import {OrderSingleExtraInfoShippingPoint as ShippingPoint} from './_shippingPoint'
import {OrderSingleExtraInfoSource as Source} from './_source'
import {StyledOrderSingleExtraInfo} from './_styled'
import useEditOrderSingle from "../../../../hooks/useEditOrderSingle";
import StringUtils from "../../../../utils/string";
import React from "react";
import { CurrencyInput } from '../../../../../../common/form/input/_currencyInput'
import { Text } from '../../../../../../common/text'

export const OrderEditSingleExtraInfo = ({...props}) => {
  const {data, methods} = useOrderSingleExtraInfo()
  const {value} = useEditOrderSingle()
  const {uniqueOrderNumber, note, shipFeeCustom} = data

  return (
    <StyledOrderSingleExtraInfo {...props}>
      <div className="order-single-extra-info__input-group">
        <div className="order-single-extra-info__input" data-size="lg">
          <ShippingPoint />
        </div>
        <div className="order-single-extra-info__input" data-size="lg">
          <Input disabled={true} label="Người tạo" value={value.fullNameCreate} />
        </div>
        <div className="order-single-extra-info__input --screen-sm__style-lg">
          <Source />
        </div>
        <div className="order-single-extra-info__input --screen-sm__style-lg">
          <Input
            label="Mã đơn hàng riêng"
            placeholder="Nhập mã đơn"
            value={uniqueOrderNumber.value}
            onChange={e => {
              const formatValue = StringUtils.formatOrderCode(e.target.value)
              methods.onUniqueOrderNumberChange(formatValue)
            }}
          />
        </div>

        <div className="order-single-extra-info__input" data-size="lg">
          <CurrencyInput
            labelTooltip={'Ghi nhận phí vận chuyển thu từ các shop gửi đơn nhờ giao hộ (dành riêng cho các Điểm thu hàng hộ)'}
            defaultValue={shipFeeCustom.value}
            icon={
              <Text as="u" style={{color: '#7C88A6'}}>
                ₫
              </Text>
            }
            iconProps={{style: {textAlign: 'right'}}}
            label="Nhập phí giao hàng hộ"
            onChange={methods?.onShippingFeeCustomChange}
            triggerDefault={shipFeeCustom?.triggerCollectDefault || ''}
            style={{zIndex: 1,  borderColor: '#FF424E !important'}}
            placeholder="Nhập phí giao hàng hộ"
          />
        </div>
        <div className="order-single-extra-info__input" data-size="lg">
          <Textarea
            label="Ghi chú đơn hàng"
            placeholder="Nhập ghi chú đơn hàng"
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
