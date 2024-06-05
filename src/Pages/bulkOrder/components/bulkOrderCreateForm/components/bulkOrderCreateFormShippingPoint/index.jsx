import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {BulkOrderSingleOption} from 'Pages/bulkOrder/components/bulkOrderSingleOption'
import useBulkOrderCreateForm from 'Pages/bulkOrder/hooks/useBulkOrderCreateForm'

export const BulkOrderCreateFormShippingPoint = ({...props}) => {
  const {shippingPoint} = useBulkOrderCreateForm()
  const {data, methods} = shippingPoint

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Điểm gửi hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 110,
        placeholder: 'Chọn điểm gửi hàng',
        readOnly: true,
        value: data.value?.name || '',
      }}
      // menu
      menuProps={{
        empty: data.list.length <= 0 ? 'Không tìm thấy điểm gửi hàng' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm điểm gửi hàng',
        value: data.keyword,
        onChange: methods.onKeywordChange,
      }}
    >
      {data.list.map(item => (
        <BulkOrderSingleOption
          key={item?.value}
          data-active={item.value === data.value?.value}
          onClick={() => methods.onChange(item)}
        >
          {item?.name || '---'}
        </BulkOrderSingleOption>
      ))}
    </AlternativeAutoComplete>
  )
}
