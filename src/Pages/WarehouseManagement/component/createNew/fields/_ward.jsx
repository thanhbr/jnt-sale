import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete'
import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import { AutoCompleteSingleOption } from 'Pages/orderSingle/components/autocompleteSingleOption'
import useInfo from '../../../hooks/useInfo'
import { useEffect, useState } from 'react'

const Ward = ({ ...props }) => {
  const { data, methods } = useInfo()
  const { address } = data
  const { district, ward } = address

  const [backdrop, setBackdrop] = useState(false)
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (ward.value) setItem(ward.value)
  }, [])

  return (
    <AlternativeAutoComplete
      {...props}
      onBackdrop={() => setBackdrop(true)}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: { name: 'Xã / Phường', value: '' }, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        disabled: !!!district.value,
        placeholder: 'Phường/Xã',
        readOnly: true,
        value: ward.value?.name || '',
        validateText: backdrop && !item,
        validateType: "danger",
      }}
      // search menu dropdown
      menuProps={{
        empty: ward.list.length <= 0 ? 'Không tìm thấy xã / phường' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm',
        value: ward.keyword || '',
        onChange: methods.onWardKeywordChange,
      }}
    >
      {ward.list.length > 0 &&
        ward.list.map(item => (
          <AutoCompleteSingleOption
            key={item.value}
            data-active={item.value === ward.value?.value}
            onClick={() => {
              setItem(item)
              methods.onWardChange(item)
            }}
          >
            {item.name}
          </AutoCompleteSingleOption>
        ))}
    </AlternativeAutoComplete>
  )
}

export default Ward
