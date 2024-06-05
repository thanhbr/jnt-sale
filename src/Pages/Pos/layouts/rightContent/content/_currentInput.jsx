import {useState, useEffect} from 'react'
import {fNumber} from "../../../../../util/formatNumber";
import {Input} from "./_input";

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const removeNonNumeric = num => fNumber(num.toString().replace(/[^0-9]/g, ''))

export const CurrencyInput = ({
                                defaultValue,
                                triggerDefault,
                                onChange,
                                refType,
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

  return <Input {...props}
                value={val}
                onChange={handleChange}
                style={{textAlign: 'right', background: 'transparent'}}
                refType={refType}
  />
}
