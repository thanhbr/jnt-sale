import React from 'react';
import {Option} from "../../../../common/form/autoComplete/_option";
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import useReceiptFilter from "../../hooks/useReceiptFilter";
import {Text} from "../../../../common/text";

const ReceiptGroupSubmitter = () => {
  const {groupSubmitter} = useReceiptFilter()

  return (
    <AlternativeAutoComplete
      className="receipts-filter-form__input-wide receipts-filter-form__input-wide--submitter"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Nhóm người nộp', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn người nộp',
        readOnly: true,
        value: groupSubmitter?.value?.name || '',
        // onIconClick: () => groupSubmitter.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          groupSubmitter?.list?.length <= 0
            ? 'Không tìm thấy nhóm người nộp'
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm người nộp',
        value: groupSubmitter.keyword,
        onChange: groupSubmitter.onKeywordChange,
      }}
    >
      {groupSubmitter?.list?.length > 0 &&
      groupSubmitter?.list?.map(item => (
        <Option
          key={item?.id}
          className="receipt-filter-form__option-text"
          data-active={item?.id === groupSubmitter?.value?.id}
          onClick={() => groupSubmitter.onChange(item)}
        >
          <Text>{item?.name}</Text>
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}

export default ReceiptGroupSubmitter;