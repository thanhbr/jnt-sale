import {useState, useEffect} from 'react'
import {Input} from '.'
import {fNumber} from '../../../util/formatNumber'

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const removeNonNumeric = num => fNumber(num.toString().replace(/[^0-9]/g, ''))

export const CurrencyInput = ({
  defaultValue,
  triggerDefault,
  onChange,
  ...props
}) => {
  const [val, setVal] = useState(addCommas(removeNonNumeric(defaultValue || 0)))

  const handleChange = e => {
    const numeric = removeNonNumeric(e.target.value)
    setVal(addCommas(numeric))
    if (onChange) onChange(numeric)
  }

  useEffect(
    () => setVal(addCommas(removeNonNumeric(defaultValue || 0))),
    [triggerDefault],
  )

  return <Input {...props} value={val} onChange={handleChange} />
}
