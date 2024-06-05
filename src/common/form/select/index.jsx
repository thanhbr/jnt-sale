import {useEffect} from 'react'
import {useRef} from 'react'
import {useState} from 'react'
import {Input} from '../input'
import {SELECT_ICONS} from './_icons'
import {StyledSelect} from './_styled'

export const Select = ({value, inputProps, menuProps, ...props}) => {
  const [isInputFocus, setIsInputFocus] = useState(false)

  const shouldOpenMenu = isInputFocus && props?.children

  const hoverInputRef = useRef(null)
  const menuRef = useRef(null)

  const handleMenuOpen = () => setIsInputFocus(!isInputFocus)

  const handleMenuClose = () => setTimeout(() => setIsInputFocus(false), 200)

  const handleActiveItem = (n, isUp) => {
    const menuListItem = menuRef.current.querySelectorAll('.select__option')

    if (isUp) menuRef.current.scrollTop -= 25
    else if (isUp === false) menuRef.current.scrollTop += 30

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
    const findItem = menuRef.current.querySelector(
      '.select__option[data-hover="true"]',
    )

    if (findItem) {
      findItem.click()
      setIsInputFocus(false)
    }
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
    if (wrapper) wrapper.style.overflow = shouldOpenMenu ? 'hidden' : 'auto'

    if (!!!menuRef?.current) return
    const items = menuRef.current.querySelectorAll('.select__option')
    const activeIndex = [...items].findIndex(
      item =>
        item.attributes['data-active'] &&
        item.attributes['data-active'].value === 'true',
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
  }, [shouldOpenMenu, inputProps?.value])

  return (
    <StyledSelect {...props}>
      <div className="select__toggle">
        <Input
          {...inputProps}
          className="select__input"
          icon={
            <div
              style={{
                transform: shouldOpenMenu
                  ? 'rotate(180deg) translateY(4px)'
                  : 'rotate(0)',
                transition: 'transform 0.25s',
              }}
            >
              {SELECT_ICONS.chevronLeft}
            </div>
          }
          readOnly={true}
          value={value}
          onBlur={handleMenuClose}
          onClick={handleMenuOpen}
          placeholder={props?.placeholder || ''}
        />
      </div>
      {shouldOpenMenu && (
        <>
          <input ref={hoverInputRef} type="hidden" value="0" />
          <ul
            {...menuProps}
            ref={menuRef}
            className="select__menu common-scrollbar"
          >
            {props?.children}
          </ul>
          <div
            className="select__backdrop"
            onClick={() => setIsInputFocus(false)}
          />
        </>
      )}
    </StyledSelect>
  )
}
