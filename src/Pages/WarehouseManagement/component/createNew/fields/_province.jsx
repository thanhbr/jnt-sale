import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete'
import { AutoCompleteSingleOption } from 'Pages/orderSingle/components/autocompleteSingleOption'
import { useEffect, useLayoutEffect, useState } from 'react'
import useInfo from '../../../hooks/useInfo'

const Province = ({ ...props }) => {
  const { data, methods } = useInfo()
  const { address } = data
  const { province } = address
  
  const [backdrop, setBackdrop] = useState(false)
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (province.value) setItem(province.value)
  }, [])

  return (
    <AlternativeAutoComplete
      {...props}
      onBackdrop={() => setBackdrop(true)}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: { name: 'Tỉnh / Thành phố', value: '' }, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        label: '',
        placeholder: 'Tỉnh/Thành phố',
        readOnly: true,
        value: province.value?.name || '',
        validateText: backdrop && !item,
        validateType: "danger",
      }}
      // search menu dropdown
      menuProps={{
        empty:
          province.list.length <= 0 ? 'Không tìm thấy tỉnh / thành phố' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm',
        value: province.keyword || '',
        onChange: methods.onProvinceKeywordChange,
      }}
    >
      {province.list.length > 0 &&
        province.list.map(item => (
          <AutoCompleteSingleOption
            key={item.value}
            data-active={item.value === province.value?.value}
            onClick={() => {
              setItem(item)
              methods.onProvinceChange(item)
            }}
          >
            {item.name}
          </AutoCompleteSingleOption>
        ))}
    </AlternativeAutoComplete>
  )
}

export default Province
