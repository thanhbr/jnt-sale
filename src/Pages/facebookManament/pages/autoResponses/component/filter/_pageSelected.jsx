import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useFacebookAutoResponsesFilter from '../../hooks/useFacebookAutoResponsesFilter'
import React from 'react'
import './index.scss'

export const PageSelected = () => {
  const {pageSelected} = useFacebookAutoResponsesFilter()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Trang áp dụng', value: ''}], // menu list in category dropdown
        categoryWidth: 140,
        placeholder: 'Chọn trang',
        readOnly: true,
        value:
          pageSelected.value.length > 0
            ? `Đã chọn (${pageSelected.value.length < 10 ? 0 : ''}${pageSelected.value.length})`
            : '',
        onIconClick: pageSelected.onInputReset,
      }}
      // menu
      menuProps={{
        className: 'custom-auto-complete',
        empty:
          pageSelected.list.length <= 0
            ? pageSelected.tab === 'all'
              ? 'Không tìm thấy trang'
              : 'Bạn chưa chọn trang nào'
            : '',
        multipleChoices: true,
        onReset: pageSelected.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm trang của bạn',
        value: pageSelected.keyword,
        onChange: pageSelected.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: pageSelected.tab,
        checkedNumber: pageSelected.value.length,
        onChange: pageSelected.onTabChange,
      }}
      submitProps={{
        onSubmit: pageSelected.onSubmit,
      }}
    >
      {pageSelected.list.length > 0 &&
        pageSelected.list.map(item => (
          <Option
            key={item.page_id}
            className="response-filter-form__option-text"
            checked={
              !!pageSelected.value.find(find => find.page_id === item.page_id)
            }
            multipleChoices={true}
            onClick={() => pageSelected.onChange(item)}
          >
            <div className={'response-filter-form__option-value'}>
              <img
                src={item.page_avatar}
                alt={item.page_name}
                className="page-image"
                style={{width: '44px',height: '44px',}}
              />
              {item.page_name}
            </div>
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
