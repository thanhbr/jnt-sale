import React, {useState} from 'react';
import {Box, Modal} from "@mui/material";
import styled from "styled-components";
import {Text} from "../../../../../common/text";
import usePosPayment from "../../../hooks/usePosPayment";
import {Tooltip} from "../../../../../common/tooltip";
import {POS_ICON} from "../../../constants/icons";
import {Button} from "../../../../../common/button";
import {CurrencyInput} from "../content/_currentInput";
import {formatMoney} from "../../../../../util/functionUtil";
import {transformMoneyToSendRequest} from "../../../../orderSingle/utils/transform";

const ModalPaymentMethod = () => {
  const {paymentMethodOrigin, modals, methods, calc} = usePosPayment()
  const paymentMethodList = paymentMethodOrigin?.active

  const calMoney = list => {
    const result = list?.reduce((p, n, i) => {
      const itemPrice = !!list[i]?.price_0 ? Number( list[i]?.price_0 || 0) : Number( list[i]?.price || 0)
      return p + itemPrice
    }, 0)
    return result === 0 ? calc.guestMustPay : result
  }

  const [paymentActive, setPaymentActive] = useState(paymentMethodList)
  const [moneyCustomer, setMoneyCustomer] =  useState(calMoney(paymentMethodList))
  const [validateTitlePayment, setValidateTitlePayment] = useState(false)

  const handleSelectPayment = payment => {
    payment.price_0 = 0
    const result = !!paymentActive?.find(item => +item?.value === +payment?.data?.id)
      ? paymentActive?.length > 1
        ? paymentActive.filter(item => {
            if(+item?.value === +payment?.data?.id) {
              item.price_0 = 0
            }
            return +item?.value !== +payment?.data?.id
          })
        : paymentActive
      : paymentActive?.length < 4
        ? [...paymentActive, payment]
        : paymentActive

    if(!!!result?.find(item => +item.price > 0)) result[0].price = calc.guestMustPay
    setPaymentActive(result)
    setMoneyCustomer(calMoney(result))
    setValidateTitlePayment(paymentActive?.length === 4 && result?.length === 4)
  }

  const handleRemovePayment = payment => {
    const result = paymentActive?.map(item => {
      if(+item?.value === +payment?.value) {
        item.price_0 = 0
      }
      return item
    })?.filter(item => +item?.value !== +payment?.value)

    if(!!!result?.find(item => +item.price > 0)) {
      result[0].price = calc.guestMustPay
      result[0].price_0 = calc.guestMustPay
    }
    setPaymentActive(result)
    setMoneyCustomer(calMoney(result))
  }

  const handleChangePrice = (row, value) => {
    paymentActive.map(pay  => {
      if(!!!pay.price_0) {
        pay.price_0 = pay.price || 0
      }
      if(+pay?.value === +row?.value) {
        pay.price_0 = transformMoneyToSendRequest(value) || 0
      }
      return pay
    })
    setMoneyCustomer(calMoney(paymentActive))
  }

  const handleFocusClick = (event) => {
    const {value} = event.target
    const position = value?.length || 0
    if(position === 1) event.target.setSelectionRange(position, position)
  }

  const priceDefault = (item, index) => {
    return index === 0 && !!item.price_0
          ? item.price_0
          : item?.price === 0 || !!!item?.price
            ? index === 0
              ? (moneyCustomer || 0)
              : 0
            : item?.price
  }

  return (
    <Modal open={modals?.paymentMethod?.open}
           onClose={() => {
             // paymentMethodList[0].price = !!!paymentMethodList[0].price_0 ? calc.guestMustPay : paymentMethodList[0].price_0
             // setPaymentActive(paymentMethodList)
             methods.handleToggleModalPayment()
           }}
    >
      <Box>
        <StyledModalPaymentMethod>
          <Text as={'p'} fontWeight={600} fontSize={16}>Chọn phương thức thanh toán</Text>
          <Text as={'p'} color={`${validateTitlePayment ? 'red' : '#7C88A6'}`}>Tối đa 4 phương thức thanh toán</Text>

          <div className={'content-pos-payment-body scroll-custom'}>
            <div style={{width: 536}}>
              <div className={'content-pos-payment-inter'}>
                {paymentMethodOrigin?.list?.slice(0, 12)?.map(item =>
                  <button key={item?.value}
                       className={`content-pos-payment-option 
                      ${!!paymentActive?.find(it => +it?.value === +item?.value) && 'content-pos-payment-option--active'}`}
                       onClick={_ => handleSelectPayment(item)}
                  >
                    {item?.name?.length > 20 ? (
                      <Tooltip className="content-pos__tooltipV2" title={item?.name} baseOn="width">
                        <Text>{item?.name || ''}</Text>
                      </Tooltip>
                    ) : <Text lineHeight={`${!!paymentMethodOrigin?.list?.slice(0, 12)?.find(item => item?.name?.length > 20) ? '300%' : '150%'}`}>{item?.name || ''}</Text>}
                    {!!paymentActive?.find(it => +it?.value === +item?.value) && <Text className={'content-pos-payment-option--tick'}>{POS_ICON.ct_tick}</Text>}
                  </button>
                )}
              </div>

              {paymentActive?.map((item, index) => (
                <div key={index} className={'content-pos-payment-item'}>
                  <div className={'content-pos-payment-item--title'}>
                    <Tooltip className="content-pos__tooltipV2" title={'Chuyển khoản'} baseOn="width">
                      <Text
                        color={'#7C88A6'}
                      >{item?.name}</Text>
                    </Tooltip>
                  </div>
                  <CurrencyInput
                    defaultValue={priceDefault(item, index)}
                    triggerDefault={priceDefault(item, index)}
                    icon={
                      <>
                        <Text
                          as="u"
                          color="#00081D"
                          className={`${paymentActive?.length > 1 && 'content-pos-payment-item--has-remove'}`}
                        >
                          đ
                        </Text>
                        {paymentActive?.length > 1 && <Text onClick={() => handleRemovePayment(item)}>{POS_ICON.ct_removePayment}</Text>}
                      </>
                    }
                    iconProps={{style: {
                        textAlign: 'right',
                        right: paymentActive?.length > 1 ? 12 : 8,
                        display: 'flex',
                        pointerEvents: 'all'
                      }}}
                    onChange={value => handleChangePrice(item, value)}
                    // validateText={''}
                    // validateType='danger'
                    maxLength={15}
                    className={`${paymentActive?.length > 1 && 'content-pos-payment-input--has-remove'}`}
                    onClick={e => handleFocusClick(e)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={'content-pos-payment-footer'}>
            <div className={'content-pos-payment-footer-price'}>
              <Text fontWeight={600}
                    lineHeight={'140%'}
                    style={{marginBottom: 8}}
              >Khách phải trả</Text>
              <Text fontWeight={600}
                    lineHeight={'140%'}
                    fontSize={18}
                    style={{marginBottom: 8}}
              >{formatMoney(calc.guestMustPay || 0)}</Text>
            </div>
            <div className={'content-pos-payment-footer-price'}>
              <Text fontWeight={600}
                    lineHeight={'140%'}
                    style={{marginBottom: 8}}
              >Tiền khách đưa</Text>
              <Text fontWeight={600}
                    lineHeight={'140%'}
                    style={{marginBottom: 8}}
                    color={'#00AB56'}
              >{formatMoney(moneyCustomer || 0)}</Text>
            </div>

            <div style={{textAlign: 'end', marginTop: 24}}>
              <Button appearance={'ghost'}
                      style={{width: 74}}
                      onClick={() => {
                        // paymentMethodList[0].price = !!!paymentMethodList[0].price_0 ? calc.guestMustPay : paymentMethodList[0].price_0
                        // setPaymentActive(paymentMethodList)
                        methods.handleToggleModalPayment()
                      }}
              >Hủy</Button>
              <Button style={{width: 110}}
                      onClick={() => methods.handleApprovePayment(paymentActive)}
              >Lưu</Button>
            </div>
          </div>
        </StyledModalPaymentMethod>
      </Box>
    </Modal>
  )
}

export default ModalPaymentMethod


export const StyledModalPaymentMethod = styled.div`
  width: 600px;
  height: 619px;
  background: #fff;
  border-radius: 8px;
  
  margin: auto;
  margin-top: 110px;
  padding: 20px 29px;
  position: relative;
  
  .content-pos-payment {
    &-body {
      max-height: 400px;
      width: 549px;
      overflow: scroll;
    }
    &-inter {
      margin-top: 32px;
      display: flex;
      //justify-content: space-between;
      flex-flow: row wrap;
      //align-content: space-between;
    }
    &-option {
        width: calc(25% - 9px);
      margin-right: 12px;
      min-height: 36px; 
      background: #F3F6FC;
      border-radius: 4px;
      
      padding: 6px 12px;
      text-align: center;
      cursor: pointer;
      position: relative;
      margin-bottom: 12px;
      border: 1px solid transparent;  
      &:focus {
        border: 1px solid #1A94FF;
      }
      
      &--active {
        border: 1px solid #1A94FF;
        background: #fff;
        width: calc(25% - 9px);
        min-height: 36px; 
        border-radius: 4px;
        padding: 6px 12px;
        text-align: center;
        cursor: pointer;
      }
      &--tick {
        position: absolute;
        top: -11px;
        right: -7px;
      }
    }
    &-option:nth-child(4),
    &-option:nth-child(8),
    &-option:nth-child(12) {
      margin-right: 0;
    }
    &-item {
      position: relative;
      margin-top: 16px; 
      &--title {
        position: absolute;
        margin: 7px 12px;
        width: 25rem;
      }
      &--has-remove {
        position: absolute;
        left: -18px;
      }
    }
    &-input {
      &--has-remove {
        .input__input[data-icon='true'] {
          padding-right: 52px;
        }
        svg {
          margin-top: 4px;
          width: 13px;
          height: 13px;
        }
      }
    }
       
    &-footer {
      position: absolute;
      bottom: 24px;
      width: 100%;
      padding-right: 64px;
      &-price {
        display: flex;
        justify-content: space-between;
      }
      button:first-child {
        margin-right: 12px;
      }
    }
  }
  .content-pos__tooltipV2 {
    display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }
  
  button:focus {
    border: 1px solid #1A94FF;
  }
  
  @media screen and ( max-width: 1366px) {
    margin-top: 16px;
  }
`
