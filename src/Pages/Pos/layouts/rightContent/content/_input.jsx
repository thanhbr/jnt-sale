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
                        heightContent = 400,
                        refType,
                        ...props
                      }) => {
  const [shouldOpenDropdown, setShouldOpenDropdown] = useState(refType === 'customer')

  const inputRef = useRef(null)
  const customerRef = useRef(null)
  const priceRef = useRef(null)
  const dropdownRef = useRef(null)

  const validate = validateText
    ? {
      content: validateText,
      type: INPUT_VALIDATE_TYPES.includes(validateType)
        ? validateType
        : 'success',
    }
    : null

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
    const wrapper = document.querySelector('#content-wrap')
    if (wrapper) wrapper.style.overflow = shouldOpenDropdown ? 'hidden' : 'auto'

    if (!dropdown) if (wrapper) wrapper.style.overflow = 'auto'
  }, [shouldOpenDropdown, dropdown])

  useEffect(() => {
    if (focus) inputRef.current.focus()
  }, [focus])

  const handleSearchClick = e => {
    if([27,112,114,113,116,117,118,119,121,9].includes(e.keyCode)) {
      setShouldOpenDropdown(false)
    }
    if (e.keyCode === 115 && !!customerRef.current) {
      setShouldOpenDropdown(true)
      e.preventDefault()
      customerRef.current.focus()
      customerRef.current.click()
    }
    if (e.keyCode === 117) {
      e.preventDefault()
      inputRef.current.focus()
      inputRef.current.click()
    }
    if (e.keyCode === 119) {
      e.preventDefault()
      priceRef.current.focus()
      priceRef.current.click()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleSearchClick)

    return () => {
      window.removeEventListener('keydown', handleSearchClick)
    }
  }, [])


  const [isInputFocus, setIsInputFocus] = useState(false)
  const hoverInputRef = useRef(null)

  const shouldShowMenu = isInputFocus

  const handleActiveItem = (n, isUp) => {
    const menuListItem = dropdownRef.current.querySelectorAll(
      '.contact-list__item',
    )

    if (isUp) dropdownRef.current.scrollTop -= 60
    else if (isUp === false) dropdownRef.current.scrollTop += 60

    menuListItem.forEach(item => item.setAttribute('data-hover', 'false'))

    const findItem = menuListItem[n] || null
    if (!!findItem) findItem.setAttribute('data-hover', 'true')

    if (hoverInputRef?.current)
      hoverInputRef.current.value = Math.max(
        0,
        Math.min(n, menuListItem.length),
      )
  }

  const handleSelectItem = () => {
    const findItem = dropdownRef.current.querySelector(
      '.contact-list__item[data-hover="true"]',
    )

    const currentHover = Number(hoverInputRef.current.value)

    if (findItem) findItem.click()

    handleActiveItem(currentHover)
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

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (wrapper) {
      if (shouldShowMenu) wrapper.classList.add('--overflow-hidden')
      else wrapper.classList.remove('--overflow-hidden')
    }

    if (!!!dropdownRef?.current) return
    const items = dropdownRef.current.querySelectorAll('.contact-list__item')
    const activeIndex = [...items].findIndex(
      item =>
        item.getAttribute('data-active') === 'true' ||
        !!item.querySelector('[data-checked="true"]'),
    )

    handleActiveItem(activeIndex !== -1 ? activeIndex : 0)

    items.forEach((item, i) =>
      item.addEventListener('mouseenter', () => handleActiveItem(i)),
    )
    window.addEventListener('keyup', handleWindowBtnClick)

    return () => {
      window.removeEventListener('keyup', handleWindowBtnClick)
      items.forEach((item, i) =>
        item.removeEventListener('mouseenter', () => handleActiveItem(i)),
      )
    }
  }, [shouldShowMenu,dropdown])

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
        {refType === 'discount' && (
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
          />
        )}
        {refType === 'price' && (
          <input
            {...props}
            ref={priceRef}
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
          />
        )}
        {refType === 'customer' && (
          <input
            {...props}
            ref={customerRef}
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
          />
        )}
        {(refType !== 'discount' && refType !== 'price' && refType !== 'customer') && (
            <input
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
            />
        )}
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
