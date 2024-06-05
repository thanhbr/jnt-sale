import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle__AutocompleteSingleOption} from '../__autocompleteSingleOption'

export const FacebookLivestreamScriptSingle_ShippingPartner = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {shippingPartner} = data.form

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Đơn vị vận chuyển', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 135,
        placeholder: 'Chọn đơn vị vận chuyển',
        readOnly: true,
        value: shippingPartner.value?.name || '',
      }}
      // menu
      menuProps={{
        empty:
          shippingPartner.list.length <= 0
            ? 'Không tìm thấy đơn vị vận chuyển'
            : '',
        style: {paddingBottom: 0},
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm đơn vị vận chuyển',
        value: shippingPartner.keyword,
        onChange: shippingInfoMethods.handleShippingPartnerKeywordChange,
      }}
    >
      {shippingPartner.list.map(item => (
        <FacebookLivestreamScriptSingle__AutocompleteSingleOption
          key={item?.value}
          data-active={item.value === shippingPartner.value?.value}
          onClick={() => shippingInfoMethods.handleShippingPartnerChange(item)}
        >
          {item?.name || '---'}
        </FacebookLivestreamScriptSingle__AutocompleteSingleOption>
      ))}
    </AlternativeAutoComplete>
  )
}
