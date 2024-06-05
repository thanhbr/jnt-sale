import {Input} from "../../../../../common/form/input";
import {Textarea} from "../../../../../common/form/textarea";
import styled from "styled-components";
import usePurchaseExtraInfo from "../../../hooks/usePurchaseExtraInfo";
import React from "react";

export const ExtraInfo = () => {
const {data,generalInfo,statusInfo,detail,methods} = usePurchaseExtraInfo()
  return (
    <Styled>
     <div className="extra-form__item">
       <Input
         label={'Người tạo'}
         value={detail?.fullname ? detail?.fullname :data?.user?.fullname}
         disabled={true}
       />
     </div>
     <div className="extra-form__item">
       <Textarea
         label={'Ghi chú nhập hàng'}
         value={data.note}
         onChange={methods.handleNoteChange}
         placeholder={'Nhập ghi chú nhập hàng'}
         disabled={!statusInfo?.canEdit}
         validateText={generalInfo?.validate?.note || ''}
         validateType="danger"
       />
     </div>
    </Styled>
  )
}


const Styled = styled.div`
  .extra-form__item{
    margin-bottom: 24px;
  }
`
