import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import useGlobalContext from 'containerContext/storeContext'
import {StyledOrderSingleExtraInfo} from './_styled'
import React, {useContext, useEffect, useState} from "react";
import {CategoryDatePicker} from "../../../../../common/form/datePicker";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Text} from "../../../../../common/text";
import {paymentDefaultDateTime} from "../../../provider/inittialState";
import {useCreatePaymentExtra} from "../hooks/useCreatePaymentExtra";
import {PaymentManagementContext} from "../../../provider/context";
import {formatDatetime} from "../../../../../common/form/datePicker/_functions";

export const PaymentManagementExtraInfo = ({...props}) => {
  const [state] = useGlobalContext()
  const {pageState} = useContext(PaymentManagementContext)
  const {formCreate} = pageState;
  const {validate} = formCreate
  const fullNameAccount = state?.user?.fullname || '---'
  const {shopInfo} = state
  const { methods} = useCreatePaymentExtra()
  // const {uniqueOrderNumber, note} = data
  const date = new Date()

  return (
    <StyledOrderSingleExtraInfo {...props}>
      <div className="payment-management-extra-info__input-group">

        <div className="payment-management-extra-info__input" data-size="lg">
          <Input disabled={true} label="Người tạo" value={fullNameAccount} />
        </div>

        <div
             className="payment-management-extra-info__group-input"
             style={{paddingTop: 24}}>
          <CategoryDatePicker
              datePickerProps={{defaultValue: date}}
              inputProps={{label:<> Ngày ghi sổ <Text color={THEME_SEMANTICS.failed}>*</Text></>}}
              dateFormat="dd/MM/yyyy hh:mm"
              onChange={methods.onDateTimeChange}
              onTab={false}
          />
        </div>
        <div className="payment-management-extra-info__input" data-size="lg">
        <Input
            label="Chứng từ tham chiếu"
            placeholder={'Nhập chứng từ tham chiếu'}
            value={formCreate.form.referenceCode || ''}
            validateText={validate?.referenceCode?.status ? validate?.referenceCode?.message : null}
            validateType={!validate?.referenceCode?.status ? 'success' : 'danger'}
            onChange={e=>methods.onChangeReference(e)}
            maxLength={31}
        />
      </div>
        <div className="payment-management-extra-info__input" data-size="lg">
          <Input disabled={true} label="Cửa hàng" value={shopInfo?.store_name || "___"} />
        </div>
        <div className="payment-management-extra-info__input" data-size="lg">
          <Textarea
            label="Mô tả"
            placeholder="Nhập mô tả"
            value={formCreate.form.description || ''}
            onChange={e => methods.onChangeDescription(e)}
            onBlur={e => methods.onBlurDescription(e)}
            validateText={validate?.description?.status ? validate?.description?.message : null}
            validateType={!validate?.description?.status ? 'success' : 'danger'}
            style={{resize: 'none'}}
            maxLength={256}
          />
        </div>
      </div>
    </StyledOrderSingleExtraInfo>
  )
}
