import React from 'react';
import {Text} from "../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Option} from "../../../../../common/form/select/_option";
import {AlternativeAutoComplete} from "./~alternativeAutoComplete";
import useCreateReceiptBody from "../../../hooks/useCreateReceiptBody";

const GroupSubmitter = () => {
  const {data, methods, validateState} = useCreateReceiptBody()
  const groupSubmitter = data?.groupSubmitter

  return (
    <>
      <AlternativeAutoComplete
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: { name: 'Nhóm người nộp', value: '' }, // if not exist this value -> default category: categoryList[0]
          // categoryWidth: 140,
          categoryHidden: true,
          label: (
            <>
              Nhóm người nộp <Text color={THEME_SEMANTICS.failed}>*</Text>
            </>
          ),
          placeholder: 'Chọn nhóm người nộp',
          readOnly: true,
          // disabled,
          value: groupSubmitter?.value?.name || '',

        }}
        menuProps={{
          empty: groupSubmitter?.list?.length <= 0 ? 'Không tìm thấy nhóm người nộp' : '',
        }}
        searchInputProps={{
          placeholder: 'Tìm kiếm nhóm người nộp',
          value: groupSubmitter?.keyword || '',
          onChange: cate => methods?.handleGroupSubmitChangeKeyword(cate?.value),
        }}
        validateText={validateState?.groupSubmitter?.message}
        validateType={validateState?.groupSubmitter?.status ? 'danger' : 'success'}
        // className={disabled && 'product-group-content_alternative'}
      >
        {groupSubmitter?.list?.length > 0 &&
        groupSubmitter?.list?.map(item => {
          return (
            <Option
              key={item.id}
              className={"receipt-create__option-text"}
              data-active={+item.id === +groupSubmitter?.value?.id}
              onClick={() => methods.handleGroupSubmitterValue(item)}
              style={{paddingTop: 16, cursor: 'pointer'}}
            >
              <Text>{item.name}</Text>
            </Option>
          )}
        )}
      </AlternativeAutoComplete>
    </>
  )
}

export default GroupSubmitter
