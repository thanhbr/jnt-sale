import React, {useEffect, useState} from 'react';
import {fNumber} from "../../../../../util/formatNumber";
import {Input} from "../../../../../common/form/input";

const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const removeNonNumeric = num => fNumber(num.toString().replace(/[^0-9]/g, ''))

export const CurrencyInput = ({
                                  defaultValue,
                                  triggerDefault,
                                  onChange,
                                  placeholder,
                                  ...props
                              }) => {
    const numericDefault = addCommas(removeNonNumeric(defaultValue || ''))
    const [val, setVal] = useState(+numericDefault === 0 ? '' : numericDefault)

    const handleChange = e => {
        const numeric = removeNonNumeric(e.target.value)
        setVal(addCommas(+numeric === 0 ? '' : numeric))
        if (onChange) onChange(+numeric === 0 ? '' : numeric)
    }

    useEffect(
        () => setVal(+numericDefault === 0 ? '' : numericDefault),
        [triggerDefault],
    )

    return <Input {...props} value={val} onChange={handleChange} placeholder={placeholder} />
}
