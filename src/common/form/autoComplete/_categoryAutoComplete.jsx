import {Text} from 'common/text'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {CategoryInput} from '../input/_categoryInput'
import {AUTO_COMPLETE_ICONS} from './_icons'

export const CategoryAutoComplete = ({
  categoryDefaultValue,
  categoryList,
  categoryValue,
  categoryWidth = 125,
  defaultValue,
  emptyMenu,
  emptyText,
  icon,
  label,
  labelTooltip,
  multipleChoices,
  placeholder,
  validateText,
  validateType,
  value,
  setValue,
  onChange,
  onReset,
  ...props
}) => {
  const inputProps = {
    defaultValue,
    label,
    labelTooltip,
    placeholder,
    validateText,
    validateType,
    value,
    onChange,
  }

  const [isInputFocus, setIsInputFocus] = useState(false)

  const [categoryData, setCategoryData] = useState(
    categoryValue ? categoryValue : categoryDefaultValue || categoryList[0],
  )
  const [val, setVal] = useState(value ? value : defaultValue || '')

  const triggerSetValue = typeof setValue === 'string' ? setValue : null

  const shouldShowMenu = isInputFocus

  const handleCategoryChange = data => {
    setCategoryData(data)

    if (onChange) onChange({category: data, value: val})
  }

  const handleInputBlur = () =>
    !multipleChoices && setTimeout(() => setIsInputFocus(false), 200)

  const handleInputChange = v => {
    setVal(v)

    if (onChange) onChange({category: categoryData, value: v})
  }

  const handleInputFocus = () => setIsInputFocus(true)

  useEffect(() => {
    if (typeof triggerSetValue === 'string') setVal(triggerSetValue)
  }, [triggerSetValue])

  return (
    <StyledCategoryAutoComplete {...props}>
      <CategoryInput
        {...inputProps}
        className="category-auto-complete__input"
        categoryList={categoryList}
        categoryValue={categoryData}
        categoryWidth={categoryWidth}
        onCategoryChange={handleCategoryChange}
        icon={
          val ? (
            AUTO_COMPLETE_ICONS.x
          ) : (
            <div
              style={{
                transform: shouldShowMenu
                  ? 'rotate(180deg) translateY(4px)'
                  : 'rotate(0)',
                transition: 'transform 0.25s',
              }}
            >
              {AUTO_COMPLETE_ICONS.chevronLeft}
            </div>
          )
        }
        value={val}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onClick={handleInputFocus}
        onIconClick={() => {
          handleInputChange('')
          if (onReset) onReset()
        }}
      />
      {shouldShowMenu && (
        <ul
          className="category-auto-complete__menu common-scrollbar scroll-custom"
          data-ps={!multipleChoices}
        >
          {props?.children}
          {emptyMenu && (
            <div className="category-auto-complete__empty">
              <img
                src="/img/order/empty-filter-auto-complete.png"
                alt="empty"
                width={124}
                height={124}
              />
              <Text as="b" fontSize={13} lineHeight={18}>
                {emptyText}
              </Text>
            </div>
          )}
        </ul>
      )}
      {multipleChoices && shouldShowMenu && (
        <div
          className="category-auto-complete__backdrop"
          onClick={() => setIsInputFocus(false)}
        />
      )}
    </StyledCategoryAutoComplete>
  )
}

const StyledCategoryAutoComplete = styled.div`
  position: relative;

  width: 100%;

  .category-auto-complete {
    &__menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 11;

      width: 100%;
      max-height: 320px;
      padding: 20px 20px 0;

      overflow: auto;

      background: #ffffff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

      &[data-ps='true'] {
        padding: 8px;
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

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;

      width: 100vw;
      height: 100vh;
    }

    &__empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .auto-complete {
    &__option-container {
      display: flex;
      align-items: center;
    }
  }
`
