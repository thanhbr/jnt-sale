import {THEME_COLORS} from 'common/theme/_colors'
import {StyledSwitch} from './_styled'

/**
 * @type {TypeColor}       = string                      <only color string>
 * @type {TypeOnChange}    = (val: boolean) => void      <Event toggle> <@param {val} - new value>
 */
/**
 * @param {color}          ?: TypeColor                  <Current page>
 * @param {defaultChecked} ?: boolean                    <Total pages>
 * @param {disabled}       ?: boolean                    <Event on page change>
 * @param {onChange}       :  TypeOnChange               <Event on page change>
 */
export const Switch = ({
  color = THEME_COLORS.primary_300,
  defaultChecked = false,
  disabled = false,
  onChange,
  checked,
  ...props
}) => {
  const handleToggle = e => {
    if (disabled) return
    if (onChange) onChange(e)
  }

  return (
    <StyledSwitch
      {...props}
      data-checked={checked}
      data-disabled={disabled}
      style={{'--toggle__active-color': color, ...props?.style}}
      onClick={handleToggle}
    />
  )
}
