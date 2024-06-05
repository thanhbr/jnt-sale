import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete'
import useClickOutside from 'Pages/customer/useClickOutside'
import { AutoCompleteSingleOption } from 'Pages/orderSingle/components/autocompleteSingleOption'
import { useEffect, useRef, useState } from 'react'
import useInfo from '../../../hooks/useInfo'

const District = ({ ...props }) => {
  const { data, methods } = useInfo()
  const { address } = data
  const { province, district } = address

  const [backdrop, setBackdrop] = useState(false)
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (district.value) setItem(district.value)
  }, [])

  return (
    <AlternativeAutoComplete
      {...props}
      onBackdrop={() => setBackdrop(true)}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: { name: 'Quận / Huyện', value: '' }, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        disabled: !!!province.value,
        placeholder: 'Quận/Huyện',
        readOnly: true,
        value: district.value?.name || '',
        validateText: backdrop && !item,
        validateType: "danger",
      }}
      // search menu dropdown
      menuProps={{
        empty: district.list.length <= 0 ? 'Không tìm thấy quận / huyện' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm',
        value: district.keyword || '',
        onChange: e => {
          methods.onDistrictKeywordChange(e)
        },
      }}
    >
      {district.list.length > 0 &&
        district.list.map(item => (
          <AutoCompleteSingleOption
            key={item.value}
            data-active={item.value === district.value?.value}
            onClick={() => {
              setItem(item)
              methods.onDistrictChange(item)
            }}
          >
            {item.name}
          </AutoCompleteSingleOption>
        ))}
    </AlternativeAutoComplete>
  )
}

export default District
