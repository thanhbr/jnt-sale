import {StyledRadio} from './_styled'

export const Radio = ({checked, disabled, id, ...props}) => {
  const handleChange = event => {
    if (disabled) return
    if (props?.onChange) props.onChange(event)
  }

  return (
    <StyledRadio {...props} data-checked={checked} data-disabled={disabled}>
      <input
        {...props}
        id={id}
        className="radio__input"
        type="radio"
        checked={checked}
        onChange={handleChange}
      />
    </StyledRadio>
  )
}
