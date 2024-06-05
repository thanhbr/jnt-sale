import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {BulkOrderSingleOption} from 'Pages/bulkOrder/components/bulkOrderSingleOption'
import useBulkOrderFilter from 'Pages/bulkOrder/hooks/useBulkOrderFilter'

export const BulkOrderFilterEmployee = ({...props}) => {
  const {employee} = useBulkOrderFilter()
  const {data, methods} = employee

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Nhân viên lên đơn', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn Nhân viên lên đơn',
        readOnly: true,
        value: data.value?.name || '',
        onIconClick: () => methods.onChange(null),
      }}
      // menu
      menuProps={{
        empty: data.list.length <= 0 ? 'Không tìm thấy nhân viên lên đơn' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm nhân viên lên đơn',
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
