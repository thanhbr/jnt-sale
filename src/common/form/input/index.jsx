import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {Tooltip} from 'common/tooltip'
import {useEffect} from 'react'
import {useRef, useState} from 'react'
import {INPUT_VALIDATE_TYPES, INPUT_VALIDATE_TYPE_COLORS} from './_constants'
import {INPUT_ICONS} from './_icons'
import {StyledInput} from './_styled'

export const Input = ({
  className,
  button,
  defaultValue,
  dropdown,
  dropdownProps,
  icon,
  iconProps,
  label,
  labelTooltip,
  validateText,
  validateType,
  validateProps,
  value,
  disabled,
  onChange,
  onIconClick,
  focus,
  heightContent = 400,
  onInputBlur,
  ...props
}) => {
  const [shouldOpenDropdown, setShouldOpenDropdown] = useState(false)

  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

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

  const handleDropdownScroll = () => {
    if (
      !dropdownProps?.canLoadMore ||
      !dropdownProps?.onLoadMore ||
      !dropdownRef?.current
    )
      return
    const clientHeight = dropdownRef.current.clientHeight
    const scrollHeight = dropdownRef.current.scrollHeight
    const scrollTop = dropdownRef.current.scrollTop

    if (clientHeight + scrollTop >= scrollHeight) {
      // dropdownRef.current.scrollTo({top: scrollTop - heightContent})
      dropdownProps.onLoadMore()
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleCloseDropdwonByTabPress)
    return () =>
      window.removeEventListener('keyup', handleCloseDropdwonByTabPress)
  }, [])

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (wrapper) wrapper.style.overflow = shouldOpenDropdown ? 'hidden' : 'auto'

    if (!dropdown) if (wrapper) wrapper.style.overflow = 'auto'
  }, [shouldOpenDropdown, dropdown])

  useEffect(() => {
    if (focus) inputRef.current.focus()
  }, [focus])

  const handleSearchClick = e => {
    if (!inputRef?.current || !props?.searchInput) return
    if (e.keyCode === 113) {
      e.preventDefault()
      inputRef.current.focus()
      inputRef.current.click()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleSearchClick)

    return () => {
      window.removeEventListener('keydown', handleSearchClick)
    }
  }, [])
  return (
    <StyledInput {...props} className={className}>
      {label && (
        <Text as="label" className="input__label" color={THEME_COLORS.gray_900}>
          {label}{' '}
          {labelTooltip && (
            <Tooltip title={labelTooltip}>{INPUT_ICONS.question}</Tooltip>
          )}
        </Text>
      )}
      <div className="input__container" data-button={!!button}>
        <input
          ref={inputRef}
          {...props}
          defaultValue={defaultValue}
          className="input__input"
          value={value}
          data-button={!!button}
          data-dropdown={!!dropdown && shouldOpenDropdown}
          data-icon={!!icon}
          data-validate={validate?.type}
          onChange={onChange}
          onBlur={onInputBlur}
          onFocus={() => {
            setShouldOpenDropdown(true)
            if (props?.onFocus) props.onFocus()
          }}
          disabled={disabled}
        />
        {button ? (
          <div
            className="input__button"
            data-dropdown={!!dropdown && shouldOpenDropdown}
          >
            {button}
          </div>
        ) : !!icon ? (
          <div
            {...iconProps}
            className={`input__icon ${iconProps?.className || ''}`}
            data-dropdown={!!dropdown && shouldOpenDropdown}
            style={{
              cursor: 'pointer',
              pointerEvents: onIconClick ? 'all' : 'none',
              ...iconProps?.style,
            }}
            onClick={e => {
              if (onIconClick) {
                e.stopPropagation()
                onIconClick()
              } else {
                if (inputRef?.current) inputRef.current.focus()
              }
            }}
          >
            {icon}
          </div>
        ) : (
          <></>
        )}
        {!!dropdown && shouldOpenDropdown && (
          <>
            <div
              className="input__backdrop"
              onClick={() => setShouldOpenDropdown(false)}
            ></div>
            <div
              {...dropdownProps}
              ref={dropdownRef}
              className={`input__dropdown common-scrollbar ${
                dropdownProps?.className || ''
              }`}
              onScroll={handleDropdownScroll}
            >
              {dropdown({onClose: () => setShouldOpenDropdown(false)})}
            </div>
          </>
        )}
        {validate && (
          <Text
            {...validateProps}
            className="input__validate"
            color={INPUT_VALIDATE_TYPE_COLORS[validate.type]}
            fontSize={12}
            lineHeight={17}
          >
            {validate.content}
          </Text>
        )}
      </div>
    </StyledInput>
  )
}
