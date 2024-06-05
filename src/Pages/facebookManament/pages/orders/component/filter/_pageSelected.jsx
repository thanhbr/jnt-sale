import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import React, {useEffect} from 'react'
// import './index.scss'
import useFacebookAutoResponses from "../../hooks/useFacebookAutoResponse";
import ReactImageFallback from "react-image-fallback";

export const PageSelected = () => {
  const {pageSelected} = useFacebookAutoResponses()
  return (
    <AlternativeAutoComplete
      className="order-filter-facebook-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Trang', value: ''}], // menu list in category dropdown
        categoryWidth: 60,
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
      // submitProps={{
      //   onSubmit: pageSelected.onSubmit,
      // }}
    >
      {pageSelected.list.length > 0 &&
        pageSelected.list.map(item => (
          <Option
            key={item.value}
            className="response-filter-form__option-text"
            checked={
              !!pageSelected.value.find(find => find.value === item.value)
            }
            multipleChoices={true}
            onClick={() => pageSelected.onChange({
                id: item.value,
                category: [],
                value: item.name,
                avatar : item.avatar,
            })}

          >
            <div className={'response-filter-form__option-value'}   style={{cursor:'pointer'}}>
                <ReactImageFallback
                    src={item?.avatar}
                    alt={item?.name}
                    fallbackImage='/img/facebook/no-post.png'
                    className={'page-image'}
                    style={{width: '44px',height: '44px',}}
                />
              {/*<img*/}
              {/*  src={item.page_avatar}*/}
              {/*  alt={item.page_name}*/}
              {/*  className="page-image"*/}
              {/*  style={{width: '44px',height: '44px',}}*/}
              {/*/>*/}
              {item.name}
            </div>
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
