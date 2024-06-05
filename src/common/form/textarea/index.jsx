import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Tooltip} from 'common/tooltip'
import {useEffect, useRef, useState} from 'react'
import {
  INPUT_VALIDATE_TYPES,
  INPUT_VALIDATE_TYPE_COLORS,
} from '../input/_constants'
import {INPUT_ICONS} from '../input/_icons'
import {StyledTextarea} from './_styled'

export const Textarea = ({
  className,
  defaultValue,
  icon,
  label,
  labelTooltip,
  dropdown,
  dropdownProps,
  validateText,
  validateType,
  value,
  onChange,
  onIconClick,
  ...props
}) => {
  const inputRef = useRef()
  const [shouldOpenDropdown, setShouldOpenDropdown] = useState(false)
  const validate = validateText
    ? {
      content: validateText,
      type: INPUT_VALIDATE_TYPES.includes(validateType)
        ? validateType
        : 'success',
    }
    : null

  const handleCloseDropdwonByTabPress = e =>
    e.keyCode === 9 && setShouldOpenDropdown(false)

  useEffect(() => {
    window.addEventListener('keyup', handleCloseDropdwonByTabPress)
    return () =>
      window.removeEventListener('keyup', handleCloseDropdwonByTabPress)
  }, [])

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (wrapper) wrapper.style.overflow = shouldOpenDropdown ? 'hidden' : 'auto'
  }, [shouldOpenDropdown])

  return (
    <StyledTextarea className={className} {...props}>
      {label && (
        <Text
          as="label"
          className="textarea__label"
          color={THEME_COLORS.gray_900}
        >
          {label}{' '}
          {labelTooltip && (
            <Tooltip title={labelTooltip}>{INPUT_ICONS.question}</Tooltip>
          )}
        </Text>
      )}
      <textarea
        ref={inputRef}
        {...props}
        className="textarea__input common-scrollbar"
        value={value}
        data-icon={!!icon}
        data-validate={validate?.type}
        onChange={e => {
          if (!!dropdown && e.target.value == '/') setShouldOpenDropdown(true)
          if (onChange) onChange(e)
        }}
      />
      {!!icon && (
        <div
          className="textarea__icon"
          style={{
            cursor: 'pointer',
            pointerEvents: onIconClick ? 'all' : 'none',
          }}
          onClick={() => {
            if (onIconClick) onIconClick()
            if (inputRef?.current) inputRef.current.focus()
            if (!!dropdown) setShouldOpenDropdown(true)
          }}
        >
          {icon}
        </div>
      )}
      {!!dropdown && shouldOpenDropdown && (
        <>
          <div
            className="input__backdrop"
            onClick={() => setShouldOpenDropdown(false)}
          ></div>
          <div
            {...dropdownProps}
            className={`input__dropdown common-scrollbar ${
              dropdownProps?.className || ''
            }`}
          >
            {dropdown({onClose: () => setShouldOpenDropdown(false)})}
          </div>
        </>
      )}
      {validate && (
        <Text
          className="textarea__validate"
          color={INPUT_VALIDATE_TYPE_COLORS[validate.type]}
          fontSize={12}
          lineHeight={17}
        >
          {validate.content}
        </Text>
      )}
    </StyledTextarea>
  )
}
