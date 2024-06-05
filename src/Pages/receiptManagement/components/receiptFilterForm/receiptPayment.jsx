import React from 'react';
import {Option} from "../../../../common/form/autoComplete/_option";
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import useReceiptFilter from "../../hooks/useReceiptFilter";

const ReceiptPayment = () => {
  const {paymentMethod} = useReceiptFilter()
  return (
    <AlternativeAutoComplete
      className="receipts-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Phương thức thanh toán', value: ''}], // menu list in category dropdown
        categoryWidth: 175,
        placeholder: 'Chọn phương thức thanh toán',
        readOnly: true,
        value: paymentMethod?.value?.length > 0 ? `Đã chọn ${paymentMethod?.value?.length}` : '',
        onIconClick: paymentMethod.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          paymentMethod?.list?.length <= 0
            ? paymentMethod?.tab === 'all'
            ? 'Không tìm thấy phương thức thanh toán'
            : 'Bạn chưa chọn phương thức thanh toán nào'
            : '',
        multipleChoices: true,
        onReset: paymentMethod.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm phương thức thanh toán',
        value: paymentMethod?.keyword,
        onChange: paymentMethod?.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: paymentMethod?.tab,
        checkedNumber: paymentMethod?.value?.length,
        onChange: paymentMethod.onTabChange,
      }}
    >
      {paymentMethod?.list?.length > 0 &&
      paymentMethod?.list?.map(item => (
        <Option
          key={item.id}
          className="receipt-filter-form__option-text"
          checked={!!paymentMethod?.value?.find(find => find.id === item.id)}
          multipleChoices={true}
          onClick={() =>{
            paymentMethod.onChange(item)
          }}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}

export default ReceiptPayment;