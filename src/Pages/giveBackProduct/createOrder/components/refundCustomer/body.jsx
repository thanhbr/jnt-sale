import React from 'react';
import {Grid} from "@material-ui/core";
import {CategoryDatePicker} from "../../../../../common/form/datePicker";
import {AlternativeAutoComplete} from "../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {CurrencyInput} from "../../../../../common/form/input/_currencyInput";
import {Text} from "../../../../../common/text";
import useCreateGiveBackProduct from "../../../hooks/useCreateGiveBackProduct";
import {AutoCompleteSingleOption} from "../../../../orderSingle/components/autocompleteSingleOption";
import {paymentDefaultDateTime} from "../../../provider/~init";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import styled from "styled-components";
import {Tooltip} from "../../../../../common/tooltip";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../../const/display_name_menu";

const BodyRefundCustomer = ({props}) => {
  const {t} = useTranslation()
  const {formData, functions, totalValueOfGoods, paymentActive} = useCreateGiveBackProduct()
  const products = formData?.orderReturnDetail?.products

  return (
    <StyledBodyRefundCustomer>
      {formData?.orderReturnDetail?.is_refund === 1 && (
        <Grid container className="tranport-detail-wrapper" style={{marginBottom: 24}}>
          <Grid className="left-trans-detail" item xs={4} sm={4} md={4}>
            <div
              className="order-single-payment-method__group-input"
              style={{paddingTop: 28}}
            >
              <div className={'giveback-product-category-datepicker'}>
                <CategoryDatePicker
                  datePickerProps={{defaultValue: paymentDefaultDateTime}}
                  inputProps={{label: <span>{t(DISPLAY_NAME_MENU.GENERAL.DATE_REFUND)} <Text color={THEME_SEMANTICS.failed}>*</Text></span>}}
                  onChange={value => functions.handleUpdatePaymentTime(value)}
                />
              </div>
            </div>
          </Grid>

          <Grid className="left-trans-detail" item xs={4} sm={4} md={4}>
            <AlternativeAutoComplete
              {...props}
              // main input
              inputProps={{
                categoryList: [], // menu list in category dropdown
                categoryValue: {name: 'Phương thức thanh toán', value: ''}, // if not exist this value -> default category: categoryList[0]
                categoryWidth: 110,
                categoryHidden: true,
                label: (<span>{t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_METHOD)} <Text color={THEME_SEMANTICS.failed}>*</Text></span>),
                placeholder: 'Chọn phương thức thanh toán',
                readOnly: true,
                value: paymentActive?.name,
              }}
              // menu
              menuProps={{
                // canLoadMore,
                empty:
                  formData?.apiListPayment?.length < 1
                    ? t(DISPLAY_NAME_MENU.GENERAL.PAYMENT_METHOD_NOT_FOUND)
                    : '',
                // onLoadMore: handleLoadMore,
              }}
              // search input in dropdown menu
              searchInputProps={{
                placeholder: t(DISPLAY_NAME_MENU.GENERAL.SEARCH_PAYMENT_METHOD),
                // value: method.keyword,
                onChange: functions.handleMethodKeywordChange,
              }}
            >
              {/*{properties.isMethodLoading ? (*/}
              {/*  <StyledLoading>*/}
              {/*    <Spinner size={54} thickness={5} />*/}
              {/*    <Text style={{marginTop: 5}}>Loading...</Text>*/}
              {/*  </StyledLoading>*/}
              {/*) : (*/}
              <>
                {formData?.apiListPayment?.map(item => (
                  <AutoCompleteSingleOption
                    key={item?.id}
                    data-active={item.id === (!!formData?.orderReturnDetail?.payment_method?.id ?
                      formData?.orderReturnDetail?.payment_method?.id :
                      formData?.apiListPayment?.find(it => +it.is_active === 1)?.id)}
                    onClick={() => functions.handleMethodChange(item)}
                  >
                    {item?.name || '---'}
                  </AutoCompleteSingleOption>
                ))}
                {/*{!canLoadMore && (*/}
                {/*  <StyledLoadMore>*/}
                {/*    <Spinner size={48} thickness={4} />*/}
                {/*  </StyledLoadMore>*/}
                {/*)}*/}
                {/*{!(method.keyword.trim() && method.list.length <= 0) && (*/}
                {/*  <CreateBox onClick={() => setShouldOpenDrawer(true)} />*/}
                {/*)}*/}
              </>
              {/*)}*/}
            </AlternativeAutoComplete>
          </Grid>


          <Grid className="left-trans-detail" item xs={4} sm={4} md={4}>
            <div className="order-single-payment-method__group-input">

              <Tooltip
                className="--danger"
                placement="bottom"
                title={
                  products?.length !== 0
                    ? +formData?.orderReturnDetail?.payment_money > +totalValueOfGoods
                    ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.REFUND_AMOUNT_PAY_THAN_TOTAL_VALUE) : (+formData?.orderReturnDetail?.payment_money === 0 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.REFUND_AMOUNT_PAY_THAN_0) : (+formData?.orderReturnDetail?.payment_money > 999999999999 ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.REFUND_AMOUNT_PAY_MAX_99999) : ''))
                    : +formData?.orderReturnDetail?.payment_money > +formData?.orderReturnDetail?.value_paid ? t(DISPLAY_NAME_MENU.VALIDATE.INVALID.REFUND_AMOUNT_PAY_THAN_TOTAL_VALUE) : ''
                }
              >
                <CurrencyInput
                  defaultValue={totalValueOfGoods || 0}
                  triggerDefault={totalValueOfGoods}
                  icon={
                    <Text as="u" color="#7C88A6">
                      đ
                    </Text>
                  }
                  iconProps={{style: {textAlign: 'right'}}}
                  label={<span>{t(DISPLAY_NAME_MENU.GENERAL.AMOUNT_REFUND)} <Text color={THEME_SEMANTICS.failed}>*</Text></span>}
                  onChange={value => functions.handleChangeAmount(value)}
                  validateText={products?.length !== 0
                    ? +formData?.orderReturnDetail?.payment_money > +totalValueOfGoods ? ' ' : (+formData?.orderReturnDetail?.payment_money === 0 ? ' ' : (+formData?.orderReturnDetail?.payment_money > 999999999999 ? ' ' : ''))
                    : +formData?.orderReturnDetail?.payment_money > +formData?.orderReturnDetail?.value_paid ? ' ' : ''
                  }
                  validateType='danger'
                  maxLength={15}
                />
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      )}
    </StyledBodyRefundCustomer>
  )
}

export default BodyRefundCustomer


export const StyledBodyRefundCustomer = styled.div`
  .giveback-product-category-datepicker .rs-picker-toggle-clean.rs-btn-close{
    display: none;
  }
`
