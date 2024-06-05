import {Button} from 'common/button'
import {Text} from 'common/text'
import {StyledPurchasesPayment} from './_styled'
import {Input} from 'common/form/input'
import {useState} from 'react'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import {THEME_COLORS} from 'common/theme/_colors'
import {formatMoney} from 'util/functionUtil'
import { fNumber } from 'util/formatNumber'
import useAlert from 'hook/useAlert'
import { PaymentMethodType } from '../purchasesTable/_paymentMethodType'
import { Tooltip } from 'common/tooltip'
import { PURCHASES_ICONS } from 'Pages/purchases/interfaces/_icons'
import { CustomToolTip } from 'Component/tooltip/CustomTooltip'

export const PopupPayment = ({data, refreshData, mustPay, onClose, ...props}) => {
  const totalPayment = !!data?.total_payment ? +data?.total_payment : 0
  const totalReturn = !!data?.totalReturn ? +data?.totalReturn : 0 
  const totalPrice = +data.total_amount + totalReturn - totalPayment
  const [value, setValue] = useState(fNumber(totalPrice))
  const [paymentMethod, setPaymentMentod] = useState('')
  const [error, setError] = useState('')
  const [type, setType] = useState('danger')
  const {showAlert} = useAlert()
  const handleUpdate = async () => {

    const res = await sendRequestAuth(
      'post',
      `${config.API}/purchase/payment/${data?.id}`,
      {
        "payment_method_id": paymentMethod,
        "total_payment": value.replaceAll(',','')
      }
    )
    if (res?.data.success) {
      showAlert({content: 'Thanh toán thành công', type: 'success'})
      refreshData()
      onClose()
    } else {
      setError(res?.data.message)
    }
  }

  const onPaymentTypeChange = (paymentType) => {
    setPaymentMentod(paymentType.value)
  }

  return (
    <StyledPurchasesPayment {...props}>
      <div className="purchases-payment__container" style={{overflow: 'visible'}}>
        <div className="purchases-payment__header">
          <Text
            as="h5"
            fontSize={20}
            fontWeight={600}
            lineHeight={22}
            style={{marginRight: 6}}
          >
            THANH TOÁN PHIẾU NHẬP HÀNG
          </Text>
          <Text color="#1E9A98" fontSize={20} fontWeight={600}>
            #{data.code}
          </Text>
        </div>
        <div className="purchases-payment__body">
          <div className="purchases-payment__list common-scrollbar">
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{display: 'block', marginBottom: 12}}
            >
              Giá trị đơn hàng
            </Text>
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12}}
              fontWeight={600}
            >
              {formatMoney(data.total_amount)}
            </Text>
          </div>
          <div className="purchases-payment__list common-scrollbar"
            style={{width: '264px', marginTop: '4px'}}
          >
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{display: 'block', marginBottom: 12}}
            >
              Giá trị nhận hoàn trả từ NCC
            </Text>
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12}}
              fontWeight={600}
            >
              {formatMoney(data.totalReturn)}
            </Text>
          </div>
        </div>
        <div className="purchases-payment__body">
          <div className="purchases-payment__list common-scrollbar"  style={{width: '264px', marginTop: '4px'}}>
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{display: 'block', marginBottom: 12}}
            >
              Đã thanh toán
            </Text>
            <Text
              color={THEME_COLORS.green}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12}}
              fontWeight={600}
            >
              {formatMoney(data.total_payment)}
            </Text>
          </div>
          <div className="purchases-payment__list common-scrollbar"
            style={{width: '264px', marginTop: '4px'}}
          >
            <Text
              color="#7C88A6"
              fontSize={14}
              lineHeight={22}
              style={{display: 'flex', alignItems: 'center',  marginBottom: 12}}
            >
              Còn phải trả <CustomToolTip title={'Giá trị Còn phải trả = Giá trị Đơn hàng - Giá trị Đã thanh toán + Giá trị nhận hoàn trả từ NCC'} style={{marginLeft: '4px'}}>{PURCHASES_ICONS.question}</CustomToolTip>
            </Text>
            <Text
              color={THEME_COLORS.red}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12}}
              fontWeight={600}
            >
              {formatMoney(totalPrice)}
            </Text>
          </div>
        </div>
        <div className="purchases-payment__body">
          <div className="purchases-payment__list common-scrollbar" style={{overflow: 'visible', fontWeight: 600}}>
            <PaymentMethodType onChange={onPaymentTypeChange} setPaymentMentod={setPaymentMentod} />
          </div>
          <div className="purchases-payment__list common-scrollbar" style={{width: '264px'}}>
            <Text
              fontSize={14}
              lineHeight={22}
              style={{marginBottom: 12}}
              fontWeight={600}
            >
              Số tiền thanh toán
            </Text>
            <div className="purchases-payment__style-input">
              <Tooltip title={error || '' } className={`--${type}`} placement={'bottom'}>
                <Input
                  style={{width: '264px', marginTop: '4px'}}
                  className={error ? `border-${type}` : 'input__input'}
                  placeholder={'Nhập số tiền thanh toán'}
                  autoComplete={'false'}
                  value={value}
                  onChange={e => {
                    const value = Number(e.target.value.replaceAll(',',''))
                    if (value <= 0) {
                      setValue(fNumber(value))
                      setType('danger')
                      setError('Số tiền thanh toán cần > 0')
                    } else if (value > mustPay) {
                      setValue(fNumber(mustPay))
                      setType('warning')
                      setError('Số tiền thanh toán <= Số tiền còn phải trả')
                    } else {
                      setValue(fNumber(value))
                      setError('')
                    }
                  }}
                />
              </Tooltip>
              <span className="purchases-payment__icon-price">&#8363;</span>
            </div>
            {/* <Text color={warning ? "#FF9F41" : "#FF424E"} lineHeight={18} fontSize={12}>
              {error}
            </Text> */}
          </div>
        </div>
        <div className="purchases-payment__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110, marginRight: 8}}
            onClick={onClose}
          >
            Đóng
          </Button>
          <Button
            disabled={!value}
            onClick={handleUpdate}
            className="purchases-payment__btn-update-cod"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </StyledPurchasesPayment>
  )
}
