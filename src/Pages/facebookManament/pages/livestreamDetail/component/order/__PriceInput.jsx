import {CurrencyInput} from 'common/form/input/_currencyInput'
import styled from 'styled-components'

export const PriceInput = ({...props}) => {
  return <StyledInput {...props} defaultValue={props?.defaultValue || 0} />
}

const StyledInput = styled(CurrencyInput)`
  input {
    padding: 0 8px !important;
    text-align: right;
  }
`
