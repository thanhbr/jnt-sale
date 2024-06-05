import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../input'
import { AUTO_COMPLETE_ICONS } from './_icons'
import styled from 'styled-components'
import { Button } from '../../button'
import { Tooltip } from '../../tooltip'
import { ICON_FILTER } from '../../../Pages/facebookManament/pages/conversation/interface/icon'
import { useTranslation } from 'react-i18next'

export const FanPageAutoComplete = ({
  inputProps,
  menuProps,
  searchInputProps,
  tabProps,
  iconProps,
  submitProps,
  ...props
}) => {
  const {t} = useTranslation()
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

  const wrapperRef2 = useRef(null)
  useEffect(() => {
    function handleClickOutside (event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !wrapperRef2.current.contains(event.target)
      ) {
        // handleSearchInputChange(null, {value: ''})
        submitProps.closeFilter()
        setIsInputFocus(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  const shouldShowMenu = isInputFocus

  const handleInputFocus = () => {
    if (!!!inputProps?.disabled) {
      const viewportOffset = positionRef.current.getBoundingClientRect()
      // these are relative to the viewport, i.e. the window
      const top = viewportOffset.top
      setReversePlacement(top + 500 > screen.height || top - 50 < 0)

      setIsInputFocus(true)
    }
  }

  const handleSearchInputChange = (e, opt) => {
    if (!!inputProps?.disabled) return
    const newValue = e ? e.target.value : opt?.value || ''

    setVal(newValue)
    if (searchInputProps?.onChange)
      searchInputProps.onChange({
        category: categoryData,
        value: newValue,
      })
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
      '.auto-complete__option[data-hover="true"]',
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
    if (wrapper) {
      if (shouldShowMenu) wrapper.classList.add('--overflow-hidden')
      else wrapper.classList.remove('--overflow-hidden')
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
    <StyledAlternativeAutoComplete {...props}>
      <div ref={positionRef}></div>
      <div
        ref={wrapperRef2}
        style={{ cursor: inputProps?.disabled ? 'no-drop' : 'pointer' }}
        className={'filter-icon filter-content__item'}
        data-show={shouldShowMenu}
        data-filter={!!props?.filterProps?.isActive}
      >
        {!!props?.filterProps?.isActive
          ?
          <>
            {
              !!shouldShowMenu
                ?
                <div className={'filter-content__item-icon'} onClick={handleInputFocus}>
                  {iconProps}
                </div>
                :
                <Tooltip placement="right" title={props?.titleProps}>
                  <div className={'filter-content__item-icon'} onClick={handleInputFocus}>
                    {iconProps}
                  </div>
                </Tooltip>
            }
            <div className={'close-filter'} onClick={
              e => {
                e.preventDefault()
                menuProps.onReset()
              }
            }>
              <Tooltip placement="right" title={'Bỏ lọc'}>{ICON_FILTER.close}</Tooltip>
            </div>
          </>
          :
          !!shouldShowMenu
            ?
            <div className={'filter-content__item-icon'} onClick={handleInputFocus}>
              {iconProps}
            </div>
            :
            <Tooltip placement="right" title={props?.titleProps}>
              <div className={'filter-content__item-icon'} onClick={handleInputFocus}>
                {iconProps}
              </div>
            </Tooltip>
        }
      </div>
      {!!!inputProps?.disbaled &&
      shouldShowMenu &&
      (menuProps?.children || (
        <>
          <ul
            {...menuProps}
            ref={menuRef}
            className={`alternative-auto-complete__menu ${
              menuProps?.className || ''
            }`}
            data-pb={
              !!menuProps?.multipleChoices
                ? Number(tabProps?.checkedNumber || 0) <= 0
                : true
            }
            data-reverse-position={reversePlacement}
          >
            <div className="fanpage-auto-complete__title" style={{ textAlign: 'left', marginTop: '16px' }}>
              <Text fontSize={14} fontWeight={600}>{props?.titleProps}</Text>
            </div>
            <div
              style={{ display: props.hideSearchBar ? 'none' : 'block' }}
              className="alternative-auto-complete__menu-header"
              data-size={
                !!menuProps?.multipleChoices
                  ? tabProps?.active === 'all'
                  ? 'lg'
                  : 'md'
                  : 'sm'
              }
              onClick={e => e.stopPropagation()}
            >
              {!!menuProps?.multipleChoices && (
                <div className="alternative-auto-complete__tabs">
                  <div
                    className="alternative-auto-complete__tab-item"
                    data-active={tabProps?.active === 'all'}
                    onClick={() =>
                      tabProps?.active !== 'all' &&
                      tabProps?.onChange &&
                      tabProps.onChange('all')
                    }
                  >
                    Tất cả
                  </div>
                  <div
                    className="alternative-auto-complete__tab-item"
                    data-active={tabProps?.active === 'checked'}
                    data-disabled={!!!tabProps?.checkedNumber}
                    onClick={() =>
                      !!tabProps?.checkedNumber &&
                      tabProps?.active !== 'checked' &&
                      tabProps?.onChange &&
                      tabProps.onChange('checked')
                    }
                  >
                    Đã chọn ({tabProps?.checkedNumber})
                  </div>
                </div>
              )}
              {!menuProps?.multipleChoices ||
              (menuProps?.multipleChoices && tabProps?.active === 'all') ? (
                <Input
                  {...searchInputProps}
                  className={`alternative-auto-complete__input ${
                    searchInputProps?.className || ''
                  }`}
                  icon={searchInputProps?.icon || AUTO_COMPLETE_ICONS.search}
                  onChange={handleSearchInputChange}
                />
              ) : (
                <></>
              )}
            </div>
            <input ref={hoverInputRef} type="hidden"/>
            <div ref={menuRef}
              className="alternative-auto-complete__menu-list common-scrollbar"
              onClick={() =>
                !!!menuProps?.multipleChoices &&
                backdropRef?.current &&
                backdropRef.current.click()
              }
              onScroll={handleDropdownScroll}
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
            {!!menuProps?.multipleChoices &&
            (!!submitProps ? (
              <div className="alternative-auto-complete__menu-footer-submit">
                <Text
                  color="#1E9A98"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setIsInputFocus(false)
                    tabProps.onChange('all')
                    menuProps.onReset()
                  }}
                >
                  Đặt lại
                </Text>
                <Button
                  size={'sm'}
                  onClick={() => {
                    setIsInputFocus(false)
                    submitProps?.onSubmit()
                  }}
                  style={{ width: '88px' }}
                >
                  Lọc
                </Button>
              </div>
            ) : (
              <div className="alternative-auto-complete__menu-footer">
                <Text
                  color="#1E9A98"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    tabProps.onChange('all')
                    menuProps.onReset()
                  }}
                >
                  {t('unselect_all')}
                </Text>
              </div>
            ))}
          </ul>
        </>
      ))}
    </StyledAlternativeAutoComplete>
  )
}

const StyledAlternativeAutoComplete = styled.div`
          position: relative;

          width: 100%;
          .filter-icon{
          .close-filter{
          position: absolute;
          top: 0;
          right: 8px;
          }
          &[data-active='true']{
          background: #001429;
          svg {
          color: #1e9a98;
          path[stroke] {
          stroke: #1e9a98;
          }
          }
          }
          &[data-filter='true']{
          background: #001429;
          svg {
          color: #1e9a98;
          path[stroke] {
          stroke: #1e9a98;
          }
          }
          }
          }
          .alternative-auto-complete {
          &__menu {
          position: absolute;
          top: 0;
          left: 64px;
          z-index: 11;

          width: 340px;
          max-height: 466px;
          padding: 0 20px;

          background: #ffffff;
          border-radius: 6px;
          box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
          &-list{
          max-height: 280px;
          overflow: auto;
          }
          &[data-pb='true'] {
          padding-bottom: 16px;
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
          padding-top: 8px;
          padding-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          background: transparent;

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
