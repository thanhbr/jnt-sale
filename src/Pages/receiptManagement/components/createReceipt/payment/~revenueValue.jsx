import React from 'react';
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {CurrencyInput} from "./~currencyInput";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const RevenueValue = () => {
  const {form, methods, validateState} = useCreateReceiptBody()

  return (
    <>
      <CurrencyInput
        defaultValue={form?.total_amount || ''}
        // triggerDefault={totalValueOfGoods}
        icon={
          <Text as="u" color="#7C88A6">
            đ
          </Text>
        }
        iconProps={{style: {textAlign: 'right'}}}
        label={<span>Giá trị thu <Text color={THEME_SEMANTICS.failed}>*</Text></span>}
        onChange={value => methods?.handleChangeTotalAmount(value)}
        onBlur={() => methods?.handleBlurFormCreate('revenue')}
        validateText={validateState?.revenueValue?.message}
        validateType={validateState?.revenueValue?.status ? 'danger' : 'success'}
        placeholder={'Nhập giá trị thu'}
        maxLength={15}
      />
    </>
  )
}

export default RevenueValue;