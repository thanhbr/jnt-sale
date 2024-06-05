import {Option} from 'common/form/autoComplete/_option'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import DeliveryFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'
import { useState } from 'react'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'

export const CreatedUser = () => {
  const {createdUser} = DeliveryFilterForm()
  const [keyword, setKeyWord] = useState('')

  const handleKeywordChange = data => {
    setKeyWord(data?.value || '')
    createdUser.onKeywordChange(data)
  }

  return (
    <AlternativeAutoComplete
      className="warehouse-ts-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Nhân viên thực hiện', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn nhân viên thực hiện',
        readOnly: true,
        value:
          createdUser.value.length > 0 ? `Đã chọn ${createdUser.value.length}` : '',
        onIconClick: createdUser.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          createdUser.list.length <= 0
            ? createdUser.tab === 'all'
            ? 'Không tìm thấy nhân viên thực hiện'
            : 'Bạn chưa chọn nhân viên thực hiện nào'
            : '',
        multipleChoices: true,
        onReset: createdUser.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm nhân viên thực hiện',
        value: keyword,
        onChange: handleKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: createdUser.tab,
        checkedNumber: createdUser.value.length,
        onChange: createdUser.onTabChange,
      }}
    >
      {createdUser.list.length > 0 &&
      createdUser.list.map(item => (
        <Option
          key={item.value}
          className="warehouse-ts-filter-form__option-text"
          checked={!!createdUser.value.find(x => x.value === item.value)}
          multipleChoices={true}
          style={{marginBottom: 16}}
          onClick={() => createdUser.onChange(item)}
        >
          <Text color={THEME_COLORS.gray_900} style={{display: 'block'}}>
            {item.name}
          </Text>
          <Text color="#808089" fontSize={12} lineHeight={17}>
            {item?.data?.sku}
          </Text>
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
