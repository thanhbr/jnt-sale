import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle__AutocompleteSingleOption} from '../__autocompleteSingleOption'

export const FacebookLivestreamScriptSingle_PricePolicySelect = ({
  ...props
}) => {
  const {data, declareOrderKeywordMethods} = useFacebookLiveStreamScriptSingle()
  const {pricePolicy} = data.form

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Chính sách giá', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 115,
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
        onChange: declareOrderKeywordMethods.handlePricePolicyKeywordChange,
      }}
    >
      {pricePolicy.list.map(item => (
        <FacebookLivestreamScriptSingle__AutocompleteSingleOption
          key={item?.value}
          data-active={item.value === pricePolicy.value?.value}
          onClick={() =>
            declareOrderKeywordMethods.handlePricePolicyChange(item)
          }
        >
          {item?.name || '---'}
        </FacebookLivestreamScriptSingle__AutocompleteSingleOption>
      ))}
    </AlternativeAutoComplete>
  )
}
