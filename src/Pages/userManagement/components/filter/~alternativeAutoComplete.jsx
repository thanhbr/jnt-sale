import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {useEffect, useRef, useState} from 'react'
import {Input} from '../../../../common/form/input'
import {CategoryInput} from '../../../../common/form/input/_categoryInput'
import {AUTO_COMPLETE_ICONS} from '../../../../common/form/autoComplete/_icons'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

export const AlternativeAutoComplete = ({
                                          inputProps,
                                          menuProps,
                                          searchInputProps,
                                          tabProps,
                                          ...props
                                        }) => {
  const {t} = useTranslation()
  const [categoryData, setCategoryData] = useState(
    inputProps?.categoryValue || inputProps?.categoryList[0],
  )
  const [val, setVal] = useState(inputProps?.value || '')

  const [isInputFocus, setIsInputFocus] = useState(false)

  const backdropRef = useRef(null)
  const menuRef = useRef(null)

  const shouldShowMenu = isInputFocus

  const handleInputFocus = () => {
    !!!inputProps?.disabled && setIsInputFocus(true)
  }

  const handleInputCategoryChange = data => {
    if (!!inputProps?.disabled) return
    setCategoryData(data)
    if (searchInputProps?.onChange)
      searchInputProps.onChange({category: data, value: val})
  }

  const handleSearchInputChange = e => {
    if (!!inputProps?.disabled) return
    setVal(e.target.value)
    if (searchInputProps?.onChange)
      searchInputProps.onChange({
        category: categoryData,
        value: e.target.value,
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

  return (
    <StyledAlternativeAutoComplete {...props}>
      <CategoryInput
        {...inputProps}
        className={`alternative-auto-complete__input ${
          inputProps?.className || ''
        }`}
        categoryValue={categoryData}
        icon={
          !!!inputProps?.disabled &&
          !!inputProps?.value &&
          !!inputProps?.onIconClick ? (
            AUTO_COMPLETE_ICONS.x
          ) : (
            <div
              style={{
                transform: shouldShowMenu
                  ? 'rotate(180deg) translateY(4px)'
                  : 'rotate(0)',
                transition: 'transform 0.25s',
              }}
              onClick={() => setIsInputFocus(!isInputFocus)}
            >
              {AUTO_COMPLETE_ICONS.chevronLeft}
            </div>
          )
        }
        onClick={handleInputFocus}
        onCategoryChange={handleInputCategoryChange}
      />
      {!!!inputProps?.disbaled &&
      shouldShowMenu &&
      (menuProps?.children || (
        <ul
          ref={menuRef}
          className="alternative-auto-complete__menu common-scrollbar"
          data-pb={
            !!menuProps?.multipleChoices
              ? Number(tabProps?.checkedNumber || 0) <= 0
              : true
          }
        >
          <div
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
          <div
            onClick={() =>
              !!!menuProps?.multipleChoices &&
              backdropRef?.current &&
              backdropRef.current.click()
            }
          >
            {props?.children}
          </div>
          {!!menuProps?.multipleChoices &&
          Number(tabProps?.checkedNumber || 0) > 0 && (
            <div className="alternative-auto-complete__menu-footer">
              <Text
                color="#1E9A98"
                style={{cursor: 'pointer'}}
                onClick={() => {
                  tabProps.onChange('all')
                  menuProps.onReset()
                }}
              >
                {t('unselect_all')}
              </Text>
            </div>
          )}
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
          onClick={() => setIsInputFocus(false) }
        />
      )}
    </StyledAlternativeAutoComplete>
  )
}

const StyledAlternativeAutoComplete = styled.div`
  position: relative;

  width: 100%;

  .alternative-auto-complete {
    &__menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 11;

      width: 100%;
      max-height: 320px;
      padding: 0 20px;

      overflow: auto;

      background: #ffffff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

      &[data-pb='true'] {
        padding-bottom: 12px;
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
    &__option-container {
      display: flex;
      align-items: center;
    }
  }
`
