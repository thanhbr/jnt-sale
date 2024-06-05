import {Input} from 'common/form/input'
import {Textarea} from 'common/form/textarea'
import {Text} from 'common/text'
import styled from 'styled-components'
import {Grid} from '@mui/material'
import React, {useContext, useState} from 'react'
import {THEME_SEMANTICS} from '../../../../../common/theme/_semantics'
import {OrderSingleContactList} from '../../contactList'
import {OrderSingleContext} from '../../../provider/_context'
import useOrderSingleShippingInfo from '../../../hooks/useOrderSingleShippingInfo'
import {OrderSingleDeliveryNoteList} from '../../deliveryNoteList'
import {ORDER_SINGLE_ICONS} from '../../../interface/_icons'
import {CategoryInput} from '../../../../../common/form/input/_categoryInput'
import {CurrencyInput} from '../../../../../common/form/input/_currencyInput'
import {orderSingleAction} from "../../../provider/_actions";
import {ModalCreateDeliveryNote} from "../../../editOrder/components/modal/modalDeliveryNote";
import useEditModal from "../../../hooks/useEditModal";
import {Tooltip} from "../../../../../common/tooltip";
import {transformMoneyToSendRequest} from "../../../utils/transform";

export const shippingInfoContainer = ({...props}) => {
  const {state, dispatch} = useContext(OrderSingleContext)
  const {methods} = useOrderSingleShippingInfo()
  const {validate} = useEditModal()
  const handleChange = content => {
    methods.onDeliveryNoteChange(content)
  }
  const partner = state?.form?.shippingInfo?.shippingPartner?.list
  const partnerID = state?.form?.shippingInfo?.shippingPartner?.id
  const validateCOD = (+partnerID === 4 && transformMoneyToSendRequest(state.form.shippingInfo.collectMoney) < 5000)
  return (
    <StyledInventoryContainer {...props}>
      {(partner?.length > 0 && !!partner?.find(item => item?.connected)) &&
        <div className="order-single-shipping-info-container">
        <Grid
          className="order-single-shipping-info-container__form-list"
          container
        >
          <Grid
            className="order-single-shipping-info-container__form-left"
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <Grid container>
              <Grid
                className={'order-single-shipping-info-container__form-item'}
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Tooltip
                  className="--danger"
                  placement="bottom"
                  title={validateCOD ? 'Viettel Post không chấp nhận COD dưới 5.000đ' : ''}
                >
                  <CurrencyInput
                    labelTooltip={'Giá trị mà bạn cần đơn vị vận chuyển thu của khách hàng khi giao hàng.'}
                    defaultValue={state.form.shippingInfo.collectMoney}
                    icon={
                      <Text as="u" style={{color: '#7C88A6'}}>
                        ₫
                      </Text>
                    }
                    iconProps={{style: {textAlign: 'right'}}}
                    label="Tiền thu hộ"
                    onChange={methods.onChangeCollectMoney}
                    triggerDefault={state.triggerCollectDefault || ''}
                    validateProps={{style: {left: 'unset', right: 0}}}
                    validateType={validateCOD ? 'danger' : 'default'}
                    validateText={validateCOD && ' '}
                    style={{zIndex: 1,  borderColor: '#FF424E !important'}}
                  />
                </Tooltip>
              </Grid>
              <Grid
                className={'order-single-shipping-info-container__form-item order-single-shipping-info-container__form-item--weight'}
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
              >
                <Input
                  label={
                    <>
                      Trọng lượng (kg){' '}
                      <Text color={THEME_SEMANTICS.failed}>*</Text>
                    </>
                  }
                  value={state.form.shippingInfo.weight}
                  onChange={e => methods.onChangeWeight(e.target?.value)}
                  validateText={(+state.form.shippingInfo.weight > 70 || +state.form.shippingInfo.weight < 0.01) ? 'Trọng lượng cần ≥ 0.01kg (10g) và ≤ 70kg (7000g)' : ''}
                  validateType="danger"
                  type={'number'}
                  onWheel={() => document.activeElement.blur()}
                />
              </Grid>
            </Grid>
            <Grid
              className={''}
              container
            >
              <Grid
                item
                className={'order-single-shipping-info-container__form-item'}
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <CategoryInput
                  categoryList={[]}
                  categoryValue={{name: 'Dài', value: ''}}
                  categoryWidth={45}
                  label="Kích thước (cm)"
                  value={state.form.shippingInfo.size.longs}
                  onChange={methods.onChangeSizeLongs}
                  validateText={state.validate?.size?.longs}
                  validateType="danger"
                />
              </Grid>
              <Grid
                item
                className={'order-single-shipping-info-container__form-item'}
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <CategoryInput
                  categoryList={[]}
                  categoryValue={{name: 'Rộng', value: ''}}
                  categoryWidth={60}
                  label={<>&nbsp;</>}
                  value={state.form.shippingInfo.size.width}
                  onChange={methods.onChangeSizeWidth}
                  validateText={state.validate?.size?.width}
                  validateType="danger"
                />
              </Grid>
              <Grid
                item
                className={'order-single-shipping-info-container__form-item'}
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                <CategoryInput
                  categoryList={[]}
                  categoryValue={{name: 'Cao', value: ''}}
                  categoryWidth={50}
                  label={<>&nbsp;</>}
                  value={state.form.shippingInfo.size.height}
                  onChange={methods.onChangeSizeHeight}
                  validateText={state.validate?.size?.height}
                  validateType="danger"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            className="order-single-shipping-info-container__form-right"
            item
            xs={6}
            sm={6}
            md={6}
            lg={6}
            xl={6}
          >
            <Textarea
              className={'textarea-delivery__note'}
              label={'Ghi chú giao hàng'}
              labelTooltip={
                'Bạn có thể nhập theo cú pháp "/Nội dung ghi chú" để hệ thống đề xuất nhanh mẫu ghi chú giao hàng.'
              }
              placeholder='Nhập ghi chú hoặc sử dụng cú pháp: "/Nội dung ghi chú" để chọn nhanh mẫu ghi chú'
              {...props}
              dropdown={
                state.deliveryNote.length > 0
                  ? ({onClose}) => (
                    <>
                      <OrderSingleDeliveryNoteList
                        data={state.deliveryNote}
                        value={state.form.shippingInfo.deliveryNote.selected}
                        onClose={onClose}
                        onSelect={handleChange}
                      />
                      <CreateBox onClick={() => dispatch({ type: orderSingleAction.EDIT_TOGGLE_MODAL_DELIVERY_NOTE, payload: true })} />
                    </>
                  )
                  : undefined
              }
              value={state.form.shippingInfo.deliveryNote.content}
              // onBlur={handleBlur}
              onChange={(e) => handleChange(e.target.value)}
              icon={ORDER_SINGLE_ICONS.note}
              onIconClick={_ => handleChange(state.form.shippingInfo.deliveryNote.content)}
              validateText={(methods.errorDeliveryNote && validate?.deliveryNoteLength?.status) ? 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!': ''}
              validateType={(!methods.errorDeliveryNote && !validate?.deliveryNoteLength?.status) ? 'success' : 'danger'}
              maxLength={256}
            ></Textarea>
          </Grid>
        </Grid>
      </div>
      }
      {state.editModalDeliveryNote.open && <ModalCreateDeliveryNote />}
    </StyledInventoryContainer>
  )
}

const StyledInventoryContainer = styled.div`
  .order-single-shipping-info-container {
    &__form-list {
    }
    &__form-left {
      padding-right: -4px;
    }
    &__form-right {
      padding-left: 12px;
    }
    &__form-item {
      margin-bottom: 24px;
      padding-right: 16px;
      &--weight {
        & .input__validate {
          font-size: 11px !important;
          width: 112% !important;
        }
      }
    }
    &__manual,
    &__auto {
      margin-bottom: 24px;
    }
  }
  .textarea-delivery__note {
    textarea {
      height: 120px;
      resize: none;
    }
  }
  .order-single-delivery-list__item .order-single-delivery-list__info div{
      display: -webkit-box;
      max-width: 100%;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    :hover{
      cursor: pointer;
      color: #1E9A98!important
    }
  }
`


const CreateBox = ({...props}) => {
  return (
    <StyledCreateBox {...props}>
      <div className="create-box__container">
        <i style={{margin: '4px 4px 0 0'}}>{ORDER_SINGLE_ICONS.plus}</i>
        <Text color={THEME_SEMANTICS.delivering}>Thêm mẫu ghi chú giao hàng</Text>
      </div>
    </StyledCreateBox>
  )
}
const StyledCreateBox = styled(Text)`
  position: sticky;
  bottom: -12px;
  z-index: 1;

  height: 48px;
  width: 100% !important;

  display: block;

  background: #fff;

  cursor: pointer;

  .create-box {
    &__container {
      height: 100%;

      display: flex;
      align-items: center;
    }
  }
`
