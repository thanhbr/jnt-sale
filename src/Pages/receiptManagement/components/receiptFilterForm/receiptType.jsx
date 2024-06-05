import React from 'react';
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import useReceiptFilter from "../../hooks/useReceiptFilter";
import {Option} from "../../../../common/form/autoComplete/_option";
import {Tooltip} from "../../../../common/tooltip";

const ReceiptType = () => {
  const {typeReceipt} = useReceiptFilter()
  return (
    <AlternativeAutoComplete
      className="receipts-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Loại phiếu thu', value: ''}], // menu list in category dropdown
        categoryWidth: 120,
        placeholder: 'Chọn loại phiếu thu',
        readOnly: true,
        value: typeReceipt?.value?.length > 0 ? `Đã chọn ${typeReceipt?.value?.length}` : '',
        onIconClick: typeReceipt.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          typeReceipt?.list?.length <= 0
            ? typeReceipt?.tab === 'all'
            ? 'Không tìm thấy loại phiếu thu'
            : 'Bạn chưa chọn loại phiếu thu nào'
            : '',
        multipleChoices: true,
        onReset: typeReceipt.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm loại phiếu thu',
        value: typeReceipt?.keyword,
        onChange: typeReceipt?.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: typeReceipt?.tab,
        checkedNumber: typeReceipt?.value?.length,
        onChange: typeReceipt.onTabChange,
      }}
    >
      {typeReceipt?.list?.length > 0 &&
      typeReceipt?.list?.map(item => (
        <Option
          key={item.id}
          className="receipt-filter-form__option-text"
          checked={!!typeReceipt?.value?.find(find => find.id === item.id)}
          multipleChoices={true}
          onClick={() =>{
            typeReceipt.onChange(item)
          }}
        >
          {item?.name?.length < 50 ? item?.name
            : <Tooltip placement="bottom-start"
                       title={item?.name}
            >
              {item?.name?.substring(0, 50)+' ...'}
            </Tooltip>
          }
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}


export default ReceiptType;