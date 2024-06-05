import React, {useEffect, useRef, useState} from "react";
import {INPUT_VALIDATE_TYPE_COLORS, INPUT_VALIDATE_TYPES} from "../../../../../common/form/input/_constants";
import {StyledInput} from "../../../../../common/form/input/_styled";
import {Text} from "../../../../../common/text";
import {THEME_COLORS} from "../../../../../common/theme/_colors";
import {Tooltip} from "../../../../../common/tooltip";
import {INPUT_ICONS} from "../../../../../common/form/input/_icons";

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
                        onKeyUp,
                        heightContent = 400,
                        ...props
                      }) => {
  const [shouldOpenDropdown, setShouldOpenDropdown] = useState(false)
  const hoverInputRef = useRef(null)

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


  const handleSelectItem = () => {
    const findItem = dropdownRef.current.querySelector(
      '.auto-complete__option[data-hover="true"]',
    )

    const currentHover = Number(hoverInputRef.current.value)

    if (findItem) findItem.click()

    handleActiveItem(currentHover)
  }

  const handleActiveItem = (n, isUp) => {
    const menuListItem = dropdownRef.current.querySelectorAll(
      '.auto-complete__option',
    )

    if (isUp) dropdownRef.current.scrollTop -= 50
    else if (isUp === false) dropdownRef.current.scrollTop += 50

    menuListItem.forEach(item => item.setAttribute('data-hover', 'false'))

    const findItem = menuListItem[n] || null
    if (!!findItem) findItem.setAttribute('data-hover', 'true')

    if (hoverInputRef?.current)
      hoverInputRef.current.value = Math.max(
        0,
        Math.min(n, menuListItem.length),
      )
  }

  const handleWindowBtnClick = e => {
    const hoverValue = hoverInputRef?.current
      ? hoverInputRef.current.value
      : null

    if (hoverValue === null) return

    if (e.keyCode === 13) handleSelectItem()
    if (e.keyCode === 38) handleActiveItem(Number(hoverValue) - 1, true)
    if (e.keyCode === 40) handleActiveItem(Number(hoverValue) + 1, false)
  }

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
      dropdownRef.current.scrollTo({top: scrollTop - heightContent})
      dropdownProps.onLoadMore()
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', handleCloseDropdwonByTabPress)
    window.addEventListener('keyup', handleWindowBtnClick)

    return () => {
      window.removeEventListener('keyup', handleCloseDropdwonByTabPress)
      window.removeEventListener('keyup', handleWindowBtnClick)
    }
  }, [])

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (wrapper) wrapper.style.overflow = shouldOpenDropdown ? 'hidden' : 'auto'

    if (!dropdown) if (wrapper) wrapper.style.overflow = 'auto'
  }, [shouldOpenDropdown, dropdown])

  useEffect(() => {
    if (focus) inputRef.current.focus()
  }, [focus])

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

      <input ref={hoverInputRef} type="hidden" />
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
          onFocus={() => {
            setShouldOpenDropdown(true)
            if (props?.onFocus) props.onFocus()
          }}
          disabled={disabled}
          onKeyUp={onKeyUp}
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
            <input ref={hoverInputRef} type="hidden" />
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
