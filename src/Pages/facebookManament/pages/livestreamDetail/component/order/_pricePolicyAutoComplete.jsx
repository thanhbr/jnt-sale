import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import {AutoCompleteSingleOption} from './__AutoCompleteSingleOption'

export const PRICE_POLICY = [
  {name: 'Giá bán lẻ', value: 1},
  {name: 'Giá bán sỉ', value: 2},
]

export const PricePolicyAutoComplete = ({...props}) => {
  const {data, productMethods} = useFacebookConversationOrder()
  const {pricePolicy} = data.productInfo.inventoryConfig

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Chính sách giá', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 115,
        categoryHidden: true,
        placeholder: 'Chọn chính sách giá',
        readOnly: true,
        value: pricePolicy.value?.name || '',
      }}
      // menu
      menuProps={{
        empty:
          pricePolicy.list.length <= 0 ? 'Không tìm thấy chính sách giá' : '',
        style: {paddingBottom: 0},
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm chính sách giá',
        value: pricePolicy.keyword,
        onChange: productMethods.onPricePolicy.keywordChange,
      }}
    >
      {pricePolicy.list.map(item => (
        <AutoCompleteSingleOption
          key={item?.value}
          data-active={item.value === pricePolicy.value?.value}
          onClick={() => productMethods.onPricePolicy.change(item)}
        >
          {item?.name || '---'}
        </AutoCompleteSingleOption>
      ))}
    </AlternativeAutoComplete>
  )
}
