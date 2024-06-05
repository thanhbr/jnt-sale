import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Input} from 'common/form/input'
import {CurrencyInput} from 'common/form/input/_currencyInput'
import {Select} from 'common/form/select'
import {Option} from 'common/form/select/_option'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ORDER_TABLE_ROW_EXTRA_TAB_PAYMENT_SUBMIT_MODAL_FIGURES} from 'Pages/refactorOrder/interfaces/_constants'
import {facebookConversationActions} from '../../provider/_actions'
import {useContext, useState} from 'react'
import styled from 'styled-components'
import {formatMoney, replaceAllCustom} from 'util/functionUtil'
import {FacebookOrdersContext} from "../../provider/_context";
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";

export const SubmitPaymentModal = ({data, onClose, ...props}) => {
  const {showAlert} = useAlert()
  const {functions} = useFacebookFilterForm()

  const {pageState, pageDispatch} = useContext(FacebookOrdersContext)
  const paymentMethodList = pageState.paymentMethod.list
  const paymentMethodDefault =
    paymentMethodList.find(item => item?.is_default === '1') ||
    paymentMethodList[0] ||
    null

  const [paymentMethodValue, setPaymentMethodValue] =
    useState(paymentMethodDefault)
  const [paymentMoneyValue, setPaymentMoneyValue] = useState('')

  const cod = Number(data?.cod || 0)
  const paid = Number(data?.total_payment || 0)
  const total = Number(data?.total_amount || 0)

  const haveToPay = total - paid

  const canSubmit =
    !!paymentMethodValue?.name &&
    !!paymentMoneyValue &&
    Number(replaceAllCustom(paymentMoneyValue,',','')) <= haveToPay &&
    Number(replaceAllCustom(paymentMoneyValue,',','')) > 0

  const valueList = [total, cod, paid, haveToPay]

  const figureList = ORDER_TABLE_ROW_EXTRA_TAB_PAYMENT_SUBMIT_MODAL_FIGURES.map(
    (item, i) => ({...item, value: valueList[i] || 0}),
  )

  const fetchRowDetail = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/detail/${data?.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data

      let newDetailList = [...pageState.table.detail.list]
      const findIndex = newDetailList.findIndex(item => item?.id === data?.id)
      if (findIndex !== -1) newDetailList[findIndex] = newItem

      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {
          active: newItem,
          list: [...newDetailList],
        },
      })
    }
  }

  const handleSubmit = async () => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/payment/${data.id}`,
      JSON.stringify({
        payment_method_id: Number(paymentMethodValue?.id),
        total_money: Number(paymentMoneyValue),
      }),
    )

    if (response?.data?.success) {
      showAlert({content: 'Thanh toán thành công', type: 'success'})
      fetchRowDetail()
      functions.fetchUpdateData()
      if (onClose) onClose()
    } else showAlert({content: 'Thanh toán thất bại', type: 'danger'})
  }

  return (
    <StyledSubmitPaymentModal {...props} onClick={onClose}>
      <div
        className="order-table-facebook__submit-payment-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="order-table-facebook__submit-payment-modal__header">
          <Text as="h2" fontSize={19} lineHeight={28}>
            XÁC NHẬN THANH TOÁN CHO HÓA ĐƠN {data.id}
          </Text>
        </div>
        <div className="order-table-facebook__submit-payment-modal__body">
          <div className="order-table-facebook__submit-payment-modal__figures">
            {figureList.map(item => (
              <div
                key={item.id}
                className="order-table-facebook__submit-payment-modal__figure-item"
              >
                <Text color="#7C88A6" style={{display: 'block'}}>
                  {item.name}
                </Text>
                <Text as="b" color={item.color} fontSize={15} lineHeight={22}>
                  {formatMoney(item?.value)}
                </Text>
              </div>
            ))}
          </div>
          <div className="order-table-facebook__submit-payment-modal__form">
            <div className="order-table-facebook__submit-payment-modal__input">
              <Select
                className="order-table-facebook__submit-payment-modal__select"
                value={paymentMethodValue?.name || ''}
                inputProps={{
                  label: 'Phương thức thanh toán',
                  placeholder: 'Chọn phương thức thanh toán',
                }}
              >
                {paymentMethodList.length > 0 &&
                  paymentMethodList.map(item => (
                    <Option
                      key={item.id}
                      className="order-table-facebook__submit-payment-modal__option"
                      data-active={item?.id === paymentMethodValue?.id}
                      onClick={() => setPaymentMethodValue(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="order-table-facebook__submit-payment-modal__input">
              <CurrencyInput
                label="Số tiền thanh toán"
                placeholder="0 đ"
                validateText={
                  Number(paymentMoneyValue || 0) > haveToPay
                    ? 'Số tiền khai báo không được lớn hơn số tiền phải thanh toán'
                    : ''
                }
                validateType="danger"
                defaultValue={paymentMoneyValue}
                onChange={val => setPaymentMoneyValue(val)}
              />
            </div>
          </div>
        </div>
        <div className="order-table-facebook__submit-payment-modal__footer">
          <Button
            size="sm"
            appearance="ghost"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            Đóng
          </Button>
          <Button
            disabled={!canSubmit}
            size="sm"
            style={{minWidth: 110, marginLeft: 8}}
            onClick={() => canSubmit && handleSubmit()}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </StyledSubmitPaymentModal>
  )
}

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

  .order-table-facebook__submit-payment-modal {
    &__container {
      width: 600px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
    }

    &__figures {
      width: calc(100% + 24px);
      margin: 0 -12px 8px -12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__figure-item {
      width: calc(50% - 24px);
      margin: 0 12px 24px 12px;
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
      font-size: 13px;
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
