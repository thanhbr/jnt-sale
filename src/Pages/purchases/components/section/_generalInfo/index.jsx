import {StyledGeneralInfo} from './_styled'
import React, { useEffect, useRef } from 'react'
import { PurchaseVendor } from './vendor'
import { PurchaseWarehouse } from './purchaseWarehouse'
import { Text } from '../../../../../common/text'
import { CategoryDatePicker } from '../../../../../common/form/datePicker'
import { Tooltip } from '../../../../../common/tooltip'
import { ORDER_SINGLE_ICONS } from '../../../../orderSingle/interface/_icons'
import { Input } from '../../../../../common/form/input'
import usePurchaseGeneralInfo from '../../../hooks/usePurchaseGeneralInfo'

export const GeneralInfo = ({...props}) => {

  const {data,purchaseId, methods} = usePurchaseGeneralInfo()

  const generalRef = useRef()

  useEffect(() => {
    if (!!data.validate?.vendor || !!data.validate?.warehouse) {
      if (generalRef.current) {
        generalRef.current?.scrollIntoView()
      }
    }
  }, [data.validate])
  
  return (
    <StyledGeneralInfo {...props}>
      <div ref={generalRef} className={'order-single-customer-info__validate'}></div>
      <div className="order-single-customer-info__form-group">
        <div className="order-single-customer-info__form-input">
          <PurchaseVendor disabled={!!purchaseId} />
        </div>
        <div className="order-single-customer-info__form-input">
          <PurchaseWarehouse disabled={!!purchaseId} />
        </div>
        <div className="order-single-customer-info__form-input">
          <label><Text>Ngày mua hàng </Text><Text color={'red'}>*</Text></label>
          <CategoryDatePicker onChange={methods.onDateTimeChange}
                              onTab={false}
                              datePickerProps={{
                                placement: 'bottomEnd',
                                defaultValue: data?.dateTime?.value,
                                disabled: !!purchaseId
                              }}
                              trigger={!!data?.dateTime?.trigger}
                              inputProps={{
                                editable: 'false',
                              }}
                              disabled={!!purchaseId}
                              className={`content-request__item-input ${data?.validate?.timeSolving ? 'content-request__item-input-validate' : ''}`}
                              style={{ zIndex: 999999, width: '100%' }}
          />
        </div>
        <div className="order-single-customer-info__form-input">
          <label
            style={{display:'flex', alignItems: 'center'}}
          ><Text>Mã phiếu nhập hàng </Text>
            <Tooltip title={'Trường hợp bạn không nhập mã phiếu nhập, UPOS sẽ tự động sinh theo mã hệ thống'}
                     style={{display:'flex', alignItems: 'center', marginLeft: '4px', cursor: 'pointer'}}
            >
              {ORDER_SINGLE_ICONS.question}</Tooltip>
          </label>
          <Input value={data?.code} disabled={!!purchaseId}
                 onChange={e => methods?.onCodeChange(e)}
                 validateText={data?.validate?.code || ''}
                 validateType="danger"
          />
        </div>
      </div>
    </StyledGeneralInfo>
  )
}
