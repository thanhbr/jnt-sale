import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'

export const WarehouseExport = () => {
  const {warehouseExport} = useFilterForm()
  return (
    <AlternativeAutoComplete
      className="warehouse-ts-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Kho xuất hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 110,
        placeholder: 'Chọn kho xuất hàng',
        readOnly: true,
        value: warehouseExport.value?.name || '',
        onIconClick: () => warehouseExport.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          warehouseExport.list.length <= 0
            ? 'Không tìm thấy kho xuất hàng'
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm kho xuất hàng',
        value: warehouseExport.keyword,
        onChange: warehouseExport.onKeywordChange,
      }}
    >
      {warehouseExport.list.length > 0 &&
      warehouseExport.list.map(item => (
        <Option
          key={item.value}
          className="warehouse-ts-filter-form__option-text"
          data-active={item.value === warehouseExport.value?.value}
          onClick={() => warehouseExport.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
