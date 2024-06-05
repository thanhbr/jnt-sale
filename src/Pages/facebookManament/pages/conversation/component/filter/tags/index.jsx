import { ICON_FILTER } from '../../../interface/icon'
import { FanPageAutoComplete } from '../../../../../../../common/form/autoComplete/_fanpageFBAutoComplete'
import { Option } from '../../../../../../../common/form/autoComplete/_option'
import React from 'react'
import styled from 'styled-components'
import useFilterFacebookConversation from '../../../hooks/useFilterFacebookConversation'

export const TagsCustomer = () => {
  const { tagsCustomer,methods } = useFilterFacebookConversation()
  return (
    <StyleTags>
      <FanPageAutoComplete
        className="fb-tags-filter-form__input-wide"
        // main input
        titleProps={'Lọc theo nhãn khách hàng'}
        iconProps={
            ICON_FILTER.tags
        }
        filterProps={
          {
            isActive: tagsCustomer.activeValue.length > 0
          }
        }
        inputProps={{
          categoryList: [{ name: 'Trang áp dụng', value: '' }], // menu list in category dropdown
          categoryWidth: 140,
          placeholder: 'Chọn trang',
          readOnly: true,
          value:
            tagsCustomer.value.length > 0
              ? `Đã chọn (${tagsCustomer.value.length})`
              : '',
          onIconClick: tagsCustomer.onInputReset,
        }}
        // menu
        menuProps={{
          className: "fb-tags-menu",
          empty:
            tagsCustomer.list.length <= 0
              ? tagsCustomer.tab === 'all'
              ? 'Không tìm thấy dữ liệu phù hợp'
              : 'Bạn chưa chọn nhãn khách hàng'
              : '',
          multipleChoices: true,
          onReset: tagsCustomer.onInputReset, // only use this prop for multiple choicecon
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: 'Tìm kiếm nhãn khách hàng',
          value: tagsCustomer.keyword,
          onChange: tagsCustomer.onKeywordChange,
        }}
        // tab list <only use this prop for multiple choices>
        tabProps={{
          active: tagsCustomer.tab,
          checkedNumber: tagsCustomer.value.length,
          onChange: tagsCustomer.onTabChange,
        }}
        submitProps={{
          onSubmit: methods.approveFilter,
          closeFilter: methods.closeFilter
        }}
      >
        {tagsCustomer.list.length > 0 &&
        tagsCustomer.list.map(item => (
          <Option
            key={item.id}
            className="response-filter-form__option-text"
            checked={
              !!tagsCustomer.value.find(find => find.id === item.id)
            }
            multipleChoices={true}
            onClick={() => tagsCustomer.onChange(item)}
            style={{cursor: 'pointer'}}
          >
            <div className={'response-filter-form__option-value'} style={
              {
                color: item?.color == '#ffffff' ? '#000000' : item?.color,
                border: `${item?.color == '#ffffff' ? '#000000' : item?.color} solid 1px`,
                padding: '2px 8px',
                fontSize: '12px',
                lineHeight: '150%',
                fontWidth: 500,
                borderRadius: '4px'
              }
            }>
              {item.name}
            </div>
          </Option>
        ))}
      </FanPageAutoComplete>
    </StyleTags>
  )
}

const StyleTags = styled.div`

.fb-tags-filter-form__input-wide {
  .fb-tags-menu {
    min-height: 384px;
    height: auto;
  }
  .alternative-auto-complete__menu-list {
    max-height: 190px;
  }
}

`