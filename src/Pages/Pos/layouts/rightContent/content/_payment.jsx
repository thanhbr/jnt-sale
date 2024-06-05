import React, {useEffect, useRef} from 'react';
import {Grid} from "@mui/material";
import {Text} from "../../../../../common/text";
import {POS_ICON} from "../../../constants/icons";
import usePosPayment from "../../../hooks/usePosPayment";
import {CurrencyInput} from "./_currentInput";
import {Tooltip} from "../../../../../common/tooltip";
import {Button} from "../../../../../common/button";

const Payment = () => {
  const {paymentMethodOrigin, methods, calc} = usePosPayment()
  const paymentRef = useRef(null)
  const paymentRef1 = useRef(null)

  const handleActivePayment = e => {
    if (e.keyCode === 118) {
      e.preventDefault()
      paymentRef.current.focus()
      paymentRef.current.click()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleActivePayment)
    return () => {
      window.removeEventListener('keydown', handleActivePayment)
    }
  }, [paymentRef])
  // useEffect(() => {
  //   methods?.handleFetchPayment()
  // }, [calc.guestMustPay])

  const handleFocusClick = (event) => {
    const {value} = event.target
    const position = value?.length || 0
    if(position === 1) event.target.setSelectionRange(position, position)
  }

  return (
    <>
      <Grid xs={12} sm={12} md={12} lg={12} item>
        <div className={'content-pos--body-payment-list'}>
          <Text fontWeight={600}>Chọn phương thức thanh toán</Text>
          <Text>{paymentMethodOrigin?.select?.length > 0 && ` (Đã chọn: ${paymentMethodOrigin?.select?.length})`}</Text>
        </div>
      </Grid>
      <Grid xs={12} sm={12} md={12} lg={12} item>
        <div className={`content-pos--body-payment-inter ${paymentMethodOrigin?.list?.length === 2 && 'content-pos--body-payment-inter--col-2'}`} >
          {paymentMethodOrigin?.list?.slice(0, 3)?.map((item, index) =>
            <button key={item?.value}
                    ref={index === 0 ? paymentRef : paymentRef1}
                     className={`content-pos--body-payment-option
                          ${!!paymentMethodOrigin?.select?.find(it => +it?.value === +item?.value) && 'content-pos--body-payment-option--active'}`}
                     onClick={_ => methods?.handleSelectPayment(item)}
            >
              {item?.name?.length > 20 ? (
                <Tooltip
                        className="content-pos--body__tooltipV2"
                         title={item?.name} baseOn="width">
                  <Text>{item?.name || ''}</Text>
                </Tooltip>
              ) : <Text lineHeight={`${!!paymentMethodOrigin?.list?.slice(0, 3)?.find(item => item?.name?.length > 20) ? '300%' : '150%'}`}>{item?.name || ''}</Text>}
              {!!paymentMethodOrigin?.select?.find(it => +it?.value === +item?.value) && <Text className={'content-pos--body-payment-option--tick'}>{POS_ICON.ct_tick}</Text>}
            </button>
          )}
        </div>
      </Grid>
      {paymentMethodOrigin?.list?.length > 3 && (
        <Grid xs={12} sm={12} md={12} lg={12} item>
          <Button className={'content-pos--body-payment-all'}
               onClick={() => methods.handleToggleModalPayment()}
          >
            <Text>Tất cả phương thức thanh toán</Text>
            <Text>{POS_ICON.ct_chevron}</Text>
          </Button>
        </Grid>
      )}
      {paymentMethodOrigin?.select?.map((item, index) => (
        <Grid xs={12} sm={12} md={12} lg={12} item key={index}>
          <div className={'content-pos--body-payment-item'}>
            <div className={'content-pos--body-payment-item--title'}>
              <Tooltip className="content-pos--body__tooltipV2" title={item?.name} baseOn="width">
                <Text
                  color={'#7C88A6'}
                >{item?.name}</Text>
              </Tooltip>
            </div>
            <CurrencyInput
              defaultValue={item?.price || 0}
              triggerDefault={item?.price}
              icon={
                <>
                  <Text
                    as="u"
                    color="#00081D"
                    className={`${paymentMethodOrigin?.select?.length > 1 && 'content-pos--body-payment-item--has-remove'}`}
                    lineHeight={15}
                  >
                    đ
                  </Text>
                  {paymentMethodOrigin?.select?.length > 1 && <Text onClick={() => methods.handleRemovePayment(item)}>{POS_ICON.ct_removePayment}</Text>}
                </>
              }
              iconProps={{style: {
                textAlign: 'right',
                right: paymentMethodOrigin?.select?.length > 1 ? 12 : 8,
                display: 'flex',
                pointerEvents: 'all',
              }}}
              onChange={value => methods.handleChangePrice(item, value)}
              // validateText={''}
              // validateType='danger'
              maxLength={15}
              className={`${paymentMethodOrigin?.select?.length > 1 && 'content-pos--body-payment-input--has-remove'}`}
              refType={`${index === 0 ? 'price' : ''}`}
              onClick={e => handleFocusClick(e)}
            />
          </div>
        </Grid>
      ))}
    </>
  )
}

export default Payment