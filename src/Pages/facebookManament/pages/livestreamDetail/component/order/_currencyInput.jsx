import {useState, useEffect} from 'react'
import { Input } from '../../../../../../common/form/input'
import { fNumber } from '../../../../../../util/formatNumber'

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const removeNonNumeric = num => fNumber(num.toString().replace(/[^0-9]/g, ''))

export const CurrencyInput = ({
  defaultValue,
  triggerDefault,
  onChange,
  ...props
}) => {
  const [val, setVal] = useState(addCommas(defaultValue || ''))

  const handleChange = e => {
    const numeric = removeNonNumeric(e.target.value)
    if(e.target.value == ''){
      setVal(addCommas(''))
      if (onChange) onChange('')
    }else{
      setVal(addCommas(numeric))
      if (onChange) onChange(numeric)
    }
  }

  useEffect(
    () => setVal(addCommas(defaultValue || '')),
    [triggerDefault],
  )
  return <Input {...props} value={val} onChange={handleChange} />
}
