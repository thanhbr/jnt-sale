import React, {useState} from 'react';
import {Text} from "../../../../common/text";
import {formatMoney, replaceAllCustom} from "../../../../util/functionUtil";
import {Select} from "../../../../common/form/select";
import {CurrencyInput} from "../../../../common/form/input/_currencyInput";
import {Button} from "../../../../common/button";
import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {GIVEBACK_PRODUCT_TABLE_ROW_EXTRA_TAB_PAYMENT_SUBMIT_MODAL_FIGURES} from "../../interfaces/contants";
import {Option} from "../../../../common/form/select/_option";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ModalConfirmPayment = ({data, payment, onClose, handleSubmit, handleChangeAmount, handleChangePayment, ...props}) => {
  const {t} = useTranslation()
  const paid = Number(data?.payment_money  || 0)
  const total = Number(data?.total_price || 0)
  const cod = Number(data?.payment_money || 0)
  const haveToPay = total - cod
  const [blurPayment, setBlurPayment] = useState(false)

  const valueList = [total, cod, paid, haveToPay]
  const figureList = GIVEBACK_PRODUCT_TABLE_ROW_EXTRA_TAB_PAYMENT_SUBMIT_MODAL_FIGURES.map(
    (item, i) => ({...item, value: valueList[i] || 0}),
  )
  const paymentAmount = replaceAllCustom(payment?.amount, ',', '')
  const canSubmit = +paymentAmount > 0 && +paymentAmount <= haveToPay

  return (
    <StyledSubmitPaymentModal {...props}
      // onClick={onClose}
    >
      <div
        className="giveback-product__submit-payment-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="giveback-product__submit-payment-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28}>
            {t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.MODAL_REFUND_TITLE)} <span style={{color: '#1E9A98'}}>#{data?.order_code}</span>
          </Text>
        </div>
        <div className="giveback-product__submit-payment-modal__body">
          <div className="giveback-product__submit-payment-modal__figures">
            {figureList.map(item => (
              <div
                key={item.id}
                className="giveback-product__submit-payment-modal__figure-item"
              >
                <Text color="#7C88A6" style={{display: 'block'}}>
                  {t(item.name)}
                </Text>
                <Text as="b" color={item.color} fontSize={16} lineHeight={22}>
                  {formatMoney(item?.value)}
                </Text>
              </div>
            ))}
          </div>
          <div className="giveback-product__submit-payment-modal__form">
            <div className="giveback-product__submit-payment-modal__input">
              <Select
                className="giveback-product__submit-payment-modal__select"
                value={payment?.activeValue?.name || ''}
                inputProps={{
                  label: (<Text fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_METHOD)}</Text>),
                  placeholder: 'Chọn phương thức thanh toán',
                }}
              >
                {payment?.list?.length > 0 &&
                payment?.list?.map(item => (
                  <Option
                    key={item.id}
                    className="giveback-product__submit-payment-modal__option"
                    data-active={+payment?.activeValue?.id === +item?.id}
                    onClick={_ => handleChangePayment(item)}
                  >
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="giveback-product__submit-payment-modal__input">
              <CurrencyInput
                label={<Text fontWeight={600}>{t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_AMOUNT)}</Text>}
                icon={
                  <Text as="u" color="#7C88A6">
                    đ
                  </Text>
                }
                iconProps={{style: {textAlign: 'right'}}}
                placeholder="0 đ"
                validateText={
                  blurPayment && Number(payment?.amount || 0) > haveToPay
                    ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.AMOUNT_PAY_THAN_AMOUNT_PAID)
                    : blurPayment && +payment?.amount === 0
                      ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.AMOUNT_PAY_THAN_0) : ''
                }
                validateType="danger"
                defaultValue={payment?.amount}
                onChange={val => {
                  setBlurPayment(false)
                  handleChangeAmount(val)
                }}
                onBlur={() => setBlurPayment(true)}
                maxLength={15}
              />
            </div>
          </div>
        </div>
        <div className="giveback-product__submit-payment-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            onClick={onClose}
          >
            {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
          </Button>
          <Button
            disabled={!canSubmit}
            size="sm"
            style={{marginLeft: 8}}
            onClick={() => canSubmit && handleSubmit()}
          >
            {t(DISPLAY_NAME_MENU.GENERAL.CONFIRM)}
          </Button>
        </div>
      </div>
    </StyledSubmitPaymentModal>
  )
}

export default ModalConfirmPayment

const StyledSubmitPaymentModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  .giveback-product__submit-payment-modal {
    &__container {
      width: 620px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
      width: 110%;
    }

    &__figures {
      width: calc(100% + 24px);
      margin: 0 -12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__figure-item {
      width: calc(50% - 24px);
      margin: 0 12px 20px 12px;
    }

    &__form {
      width: calc(100% + 24px);
      margin: 0 -12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__input {
      width: calc(50% - 24px);
      margin: 0 12px;
    }

    &__select {
      .select__menu {
        max-height: 150px;
      }
    }

    &__option {
      min-height: 36px;

      display: flex;
      align-items: center;

      color: ${THEME_COLORS.gray_900};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;

      transition: color 0.25s;

      &[data-active='true'],
      &:hover {
        color: ${THEME_COLORS.primary_300};
      }
    }

    &__footer {
      margin-top: 40px;

      display: flex;
      justify-content: flex-end;
    }
  }
`