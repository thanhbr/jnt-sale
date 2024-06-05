import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'
import {AlternativeAutoComplete} from '../../../../common/form/autoComplete/_alternativeAutoComplete'

export const WarehouseImport = () => {
  const {warehouseImport} = useFilterForm()
  return (
    <AlternativeAutoComplete
      className="warehouse-ts-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Kho nhập hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 120,
        placeholder: 'Chọn kho nhập hàng',
        readOnly: true,
        value: warehouseImport.value?.name || '',
        onIconClick: () => warehouseImport.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          warehouseImport.list.length <= 0
            ? 'Không tìm thấy kho nhập hàng'
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm kho nhập hàng',
        value: warehouseImport.keyword,
        onChange: warehouseImport.onKeywordChange,
      }}
    >
      {warehouseImport.list.length > 0 &&
        warehouseImport.list.map(item => {
          if (+item.data?.is_purchase == 1)
            return (
              <Option
                key={item.value}
                className="warehouse-ts-filter-form__option-text"
                data-active={item.value === warehouseImport.value?.value}
                onClick={() => warehouseImport.onChange(item)}
              >
                {item.name}
              </Option>
            )
        })}
    </AlternativeAutoComplete>
  )
}
