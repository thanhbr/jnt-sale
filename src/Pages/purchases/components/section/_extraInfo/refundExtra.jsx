import {Input} from "../../../../../common/form/input";
import {Textarea} from "../../../../../common/form/textarea";
import styled from "styled-components";
import React from "react";
import { Text } from '../../../../../common/text'
import useRefundPurchaseExtraInfo from '../../../hooks/useRefundPurchaseExtraInfo'
import { RefundPurchaseWarehouse } from './refundPurchaseWarehouse'
import { formatMoney } from '../../../../../util/functionUtil'

export const RefundExtraInfo = () => {
const {data,methods,detail} = useRefundPurchaseExtraInfo()
  return (
    <Styled>
     <div className="extra-form__item">
       <label htmlFor="" style={{marginBottom: '4px'}}>Nhà cung cấp</label>
       <Text as={'a'} target={'_blank'}
             color={'#1A94FF'}
             href={`/partner/suppliers?search=${data?.vendor?.value?.data?.supplier_code}`}
       >{data?.vendor?.value?.data?.supplier_name || '---'}</Text>
     </div>
     <div className="extra-form__item">
       <label htmlFor="" style={{marginBottom: '4px'}}>Mã phiếu nhập hàng:</label>
       <Text >{detail?.code || '---'}{` (VAT: ${formatMoney(!!detail?.price_vat ? detail.price_vat : 0)})`}</Text>
     </div>
     <div className="extra-form__item">
       <Input
         label={'Người hoàn trả'}
         value={data?.user?.fullname}
         disabled={true}
       />
     </div>
     <div className="extra-form__item">
       <RefundPurchaseWarehouse disabled={true} />
     </div>
     <div className="extra-form__item">
       <Textarea
         label={'Lý do hoàn trả'}
         value={data.refundReason}
         onChange={methods.handleNoteChange}
         placeholder={'Nhập lý do hoàn trả'}
       />
     </div>
    </Styled>
  )
}


const Styled = styled.div`
  .extra-form__item{
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
  }
`
