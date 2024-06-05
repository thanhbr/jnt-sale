import {THEME_COLORS} from 'common/theme/_colors'
import {useState} from 'react'
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
  checked,
  disabled = false,
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const handleToggle = () => {
    if (disabled) return

    if (props?.onClick) {
      props.onClick()
      return
    }

    if (onChange) onChange(!isChecked)

    setIsChecked(!isChecked)
  }

  return (
    <StyledSwitch
      {...props}
      data-checked={checked || isChecked}
      data-disabled={disabled}
      style={{'--toggle__active-color': color, ...props?.style}}
      onClick={handleToggle}
    />
  )
}
