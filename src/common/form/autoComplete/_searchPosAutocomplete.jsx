import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { useEffect, useRef, useState } from 'react'
import { CategoryInputSearch } from '../input/_categoryInputSearch'
import { AUTO_COMPLETE_ICONS } from './_icons'
import styled from 'styled-components'

export const SearchPosAutoComplete = ({
  inputProps,
  menuProps,
  searchInputProps,
  tabProps,
  ...props
}) => {
  const defaultCategory =
    inputProps?.categoryValue || inputProps?.categoryList[0]
  const [categoryData, setCategoryData] = useState(defaultCategory)
  const [val, setVal] = useState(inputProps?.value || '')

  const [isInputFocus, setIsInputFocus] = useState(false)
  const [reversePlacement, setReversePlacement] = useState(false)

  const backdropRef = useRef(null)
  const hoverInputRef = useRef(null)
  const menuRef = useRef(null)
  const positionRef = useRef(null)

  const shouldShowMenu = isInputFocus

  const handleInputFocus = () => {
    if (!!!inputProps?.disabled) {
      const viewportOffset = positionRef.current.getBoundingClientRect()
      // these are relative to the viewport, i.e. the window
      const top = viewportOffset.top
      // setReversePlacement(top + 500 > screen.height || top - 50 < 0)
      setReversePlacement(top + 500 > screen.height)

      setIsInputFocus(true)
    }
  }

  const handleInputCategoryChange = data => {
    if (!!inputProps?.disabled) return
    if (searchInputProps?.onSearch)
      searchInputProps.onSearch(data)
  }

  const handleItemCategoryChange = data => {
    if (!!inputProps?.disabled) return
    setCategoryData(data)
    if (searchInputProps?.onChange)
      searchInputProps.onChange({ category: data, value: val })
  }

  useEffect(() => {
    if (typeof searchInputProps?.value === 'string')
      setVal(searchInputProps.value)
  }, [searchInputProps?.value])

  useEffect(() => {
    if (!!!inputProps?.disbaled && shouldShowMenu) {
      if (menuRef?.current) {
        const searchInput = menuRef.current.querySelector(
          '.alternative-auto-complete__input input',
        )
        if (searchInput) searchInput.focus()
      }
    }
  }, [inputProps?.disbaled, shouldShowMenu])

  const handleActiveItem = (n, isUp) => {
    const menuListItem = menuRef.current.querySelectorAll(
      '.auto-complete__option',
    )

    if (isUp) menuRef.current.scrollTop -= 60
    else if (isUp === false) menuRef.current.scrollTop += 60

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
      '.auto-complete__option[data-hover="true"]',
    )

    const currentHover = Number(hoverInputRef.current.value)

    if (findItem) findItem.click()

    handleActiveItem(currentHover)
  }

  const handleWindowBtnClick = e => {

    const keyBreakArr = [27,112,114,115,116,117,118,119,121]
    if(keyBreakArr.includes(e.keyCode)) {
      e.preventDefault()
      backdropRef.current.focus()
      backdropRef.current.click()
    }

    const hoverValue = hoverInputRef?.current
      ? hoverInputRef.current.value
      : null

    if (hoverValue === null) return

    if (e.keyCode === 13) handleSelectItem()
    if (e.keyCode === 38) handleActiveItem(Number(hoverValue) - 1, true)
    if (e.keyCode === 40) handleActiveItem(Number(hoverValue) + 1, false)
  }

  const handleDropdownScroll = () => {
    if (!menuProps?.canLoadMore || !menuProps?.onLoadMore || !menuRef?.current)
      return

    const clientHeight = menuRef.current.clientHeight
    const scrollHeight = menuRef.current.scrollHeight
    const scrollTop = menuRef.current.scrollTop

    if (clientHeight + scrollTop > scrollHeight - 100) menuProps.onLoadMore()
  }

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    const wrapperFacebook = document.querySelectorAll('.order_background')
    if (wrapper) {
      if (shouldShowMenu) {
        wrapperFacebook.forEach(item => {
          item.style.overflow = 'hidden'
        })
        wrapper.classList.add('--overflow-hidden')
      } else {
        wrapperFacebook.forEach(item => {
          item.style.overflow = 'auto'
        })
        wrapper.classList.remove('--overflow-hidden')
      }
    }

    if (!!!menuRef?.current) return
    const items = menuRef.current.querySelectorAll('.auto-complete__option')
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
  }, [shouldShowMenu])

  return (
    <StyledAlternativeAutoComplete {...props} categoryWidth={inputProps?.categoryWidth}>
      <div ref={positionRef}></div>
      <CategoryInputSearch
        {...inputProps}
        className={`alternative-auto-complete__input ${
          inputProps?.className || ''
        }`}
        categoryValue={defaultCategory}
        icon={AUTO_COMPLETE_ICONS.search}
        iconProps={{
          style: {
            bottom: '10px'
          }
        }}
        style={{ cursor: inputProps?.disabled ? 'no-drop' : 'pointer', height: '40px' }}
        onIconClick={
          !!!inputProps?.disabled &&
          !!inputProps?.value &&
          !!inputProps?.onIconClick
            ? () => inputProps.onIconClick()
            : undefined
        }
        onClick={handleInputFocus}
        onCategoryChange={handleItemCategoryChange}
        searchCategoryInputChange={handleInputCategoryChange}
        searchCategoryInputProps={{...searchInputProps}}
      />
      {!!!inputProps?.disbaled &&
      shouldShowMenu &&
      (menuProps?.children || (
        <ul
          {...menuProps}
          ref={menuRef}
          className={`alternative-auto-complete__menu common-scrollbar ${
            menuProps?.className || ''
          }`}
          data-pb={
            !!menuProps?.multipleChoices
              ? Number(tabProps?.checkedNumber || 0) <= 0
              : true
          }
          data-reverse-position={reversePlacement}
          onScroll={handleDropdownScroll}
        >
          <input ref={hoverInputRef} type="hidden"/>
          <div
            className="alternative-auto-complete__menu-list"
            onClick={() => backdropRef?.current && backdropRef.current.click()}
          >
            {props?.children}
          </div>
          {menuProps?.empty && (
            <div className="alternative-auto-complete__empty">
              <img
                src="/img/empty-multiple-choice.png"
                alt="empty"
                width={80}
                height={80}
                style={{
                  marginBottom: 16,
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
              <Text fontSize={13} lineHeight={18}>
                {menuProps.empty}
              </Text>
            </div>
          )}
        </ul>
      ))}
      {shouldShowMenu && (
        <div
          ref={backdropRef}
          className="alternative-auto-complete__backdrop"
          onClick={() => {
            setIsInputFocus(false)
            props.onBackdrop && props.onBackdrop()
          }}
        />
      )}
    </StyledAlternativeAutoComplete>
  )
}

const StyledAlternativeAutoComplete = styled.div`
  position: relative;

  width: 100%;
  .custom-auto-complete{
    padding-bottom: 16px!important;
  }
  .alternative-auto-complete {
    &__menu {
      position: absolute;
      top: calc(100% + 4px);
      right: 0;
      z-index: 11;

      width: ${props => props.categoryWidth ? `calc(100% - ${props.categoryWidth}px)` : '100%'};
      max-height: 320px;
      padding: 0 20px;

      overflow: auto;

      background: #ffffff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

      &[data-pb='true'] {
        padding-bottom: 12px;
      }

      &[data-reverse-position='true'] {
        top: unset;
        bottom: 38px;
      }
    }

    &__menu-header {
      position: sticky;
      top: 0;
      z-index: 1;

      height: 52px;
      padding-top: 12px;

      background: #fff;

      &[data-size='lg'] {
        height: 86px;
      }

      &[data-size='md'] {
        height: 46px;
      }
    }

    &__tabs {
      margin-bottom: 8px;

      display: flex;
    }

    &__tab-item {
      margin-right: 16px;

      color: #7c88a6;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;

      &[data-active='true'] {
        color: ${THEME_COLORS.primary_300};

        cursor: default;
      }

      &[data-disabled='true'] {
        cursor: no-drop !important;
      }
    }

    &__menu-item {
      height: 36px;
      padding: 0 8px;

      display: flex;
      align-items: center;
      overflow: hidden;
      white-space: nowrap;

      border-radius: 6px;

      color: #00081d;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      text-overflow: ellipsis;

      transition: all 0.25s;

      cursor: pointer;

      &:hover {
        color: #1e9a98;
      }
    }

    &__menu-footer {
      position: sticky;
      bottom: 0;

      height: 42px;
      padding-top: 6px;

      display: flex;
      justify-content: flex-end;

      background: #fff;
    }

    &__menu-footer-submit {
      position: sticky;
      bottom: 0;

      height: 66px;
      padding-top: 8px;
      padding-bottom: 16px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      background: #fff;

      transform: translateY(16px);
    }

    &__empty {
      min-height: 200px;
      margin-bottom: 20px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;

      width: 100vw;
      height: 100vh;
    }
  }

  .auto-complete {
    &__option {
      &[data-hover='true'] {
        color: ${THEME_COLORS.primary_300}!important;
      }
    }

    &__option-container {
      display: flex;
      align-items: center;
    }
  }
`
