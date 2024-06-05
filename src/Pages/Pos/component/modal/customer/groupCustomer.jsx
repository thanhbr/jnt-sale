import { AlternativeAutoComplete } from '../../../../../common/form/autoComplete/_alternativeAutoComplete'
import { AutoCompleteSingleOption } from '../../../../orderSingle/components/autocompleteSingleOption'
import { usePosCustomer } from '../../../hooks/usePosCustomer'

export const GroupCustomer = ({...props}) => {
  
  const {groupCustomer} = usePosCustomer()

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Nhóm khách hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        label: 'Nhóm khách hàng',
        placeholder: 'Chọn nhóm khách hàng',
        readOnly: true,
        value: groupCustomer.value?.name || '',
      }}
      // search menu dropdown
      menuProps={{
        empty:
          groupCustomer.list.length <= 0 ? 'Không tìm thấy nhóm khách hàng' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm nhóm khách hàng',
        value: groupCustomer.keyword || '',
        onChange: groupCustomer.onGroupCustomerKeywordChange,
      }}
    >
      {groupCustomer.list.length > 0 &&
      groupCustomer.list.map(item => (
        <AutoCompleteSingleOption
          key={item.value}
          data-active={item.value === groupCustomer.value?.value}
          onClick={() => groupCustomer.onGroupCustomerChange(item)}
        >
          {item.name}
        </AutoCompleteSingleOption>
      ))}
    </AlternativeAutoComplete>
  )
}