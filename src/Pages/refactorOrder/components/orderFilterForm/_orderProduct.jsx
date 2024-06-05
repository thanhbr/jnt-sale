import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {useState} from 'react'

export const OrderProduct = () => {
  const {product} = useOrderFilterForm()

  const [keyword, setKeyWord] = useState('')

  const handleKeywordChange = data => {
    setKeyWord(data?.value || '')
    product.onKeywordChange(data)
  }

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Sản phẩm', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 85,
        placeholder: 'Chọn sản phẩm',
        readOnly: true,
        value:
          product.value.length > 0 ? `Đã chọn ${product.value.length}` : '',
        onIconClick: product.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          product.list.length <= 0
            ? product.tab === 'all'
              ? 'Không tìm thấy sản phẩm'
              : 'Bạn chưa chọn sản phẩm nào'
            : '',
        multipleChoices: true,
        onReset: product.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm sản phẩm',
        value: keyword,
        onChange: handleKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: product.tab,
        checkedNumber: product.value.length,
        onChange: product.onTabChange,
      }}
    >
      {product.list.length > 0 &&
        product.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            checked={!!product.value.find(find => find.value === item.value)}
            multipleChoices={true}
            style={{marginBottom: 16}}
            onClick={() => product.onChange(item)}
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
    // <CategoryAutoComplete
    //   className="order-filter-form__input-wide"
    //   categoryList={[{name: 'Sản phẩm', value: ''}]}
    //   categoryWidth={85}
    //   emptyMenu={product.list.length <= 0}
    //   emptyText="Không tìm thấy sản phẩm"
    //   multipleChoices={true}
    //   placeholder="Chọn sản phẩm"
    //   onChange={product.onKeywordChange}
    // >
    //   <div className="order-filter-form__option-tabs">
    //     <div
    //       className="order-filter-form__option-tab"
    //       data-active={product.tab === 'all'}
    //       onClick={() => product.tab !== 'all' && product.onTabChange('all')}
    //     >
    //       Tất cả
    //     </div>
    //     <div
    //       className="order-filter-form__option-tab"
    //       data-active={product.tab === 'checked'}
    //       onClick={() =>
    //         product.tab !== 'checked' && product.onTabChange('checked')
    //       }
    //     >
    //       Đã chọn ({product.value.length})
    //     </div>
    //   </div>
    //   {product.list.length > 0 &&
    //     product.list.map(item => (
    //       <Option
    //         key={item.value}
    //         className="order-filter-form__option-text"
    //         checked={!!product.value.find(find => find.value === item.value)}
    //         multipleChoices={true}
    //         style={{marginBottom: 16}}
    //         onClick={() => product.onChange(item)}
    //       >
    //         <Text
    //           color={THEME_COLORS.gray_900}
    //           style={{display: 'block'}}
    //         >
    //           {item.name}
    //         </Text>
    //         <Text
    //           color="#808089"
    //           fontSize={12}
    //           lineHeight={17}
    //         >
    //           {item?.data?.sku}
    //         </Text>
    //       </Option>
    //     ))}
    // </CategoryAutoComplete>
  )
}
