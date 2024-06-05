import {useState} from 'react'
import styled from 'styled-components'
import {Input} from '../input'
import {CategoryInput} from '../input/_categoryInput'
import {SELECT_ICONS} from './_icons'

export const CategorySelect = ({
  categoryDefaultValue,
  categoryList,
  categoryValue,
  categoryWidth = 125,
  onCategoryChange,
  label,
  labelTooltip,
  multipleChoices,
  placeholder,
  validateText,
  validateType,
  value,
  onChange,
  onKeyUp,
  ...props
}) => {
  const inputProps = {
    categoryDefaultValue,
    categoryList,
    categoryValue,
    categoryWidth,
    placeholder,
  }

  const [isInputFocus, setIsInputFocus] = useState(false)

  const [categoryData, setCategoryData] = useState(
    categoryValue ? categoryValue : categoryDefaultValue || categoryList[0],
  )

  const shouldOpenMenu = isInputFocus && props?.children

  const handleCategoryChange = data => {
    setCategoryData(data)

    if (onChange) onChange({category: data, value})
  }

  const handleMenuOpen = () => setIsInputFocus(true)

  const handleMenuClose = () =>
    setTimeout(() => !multipleChoices && setIsInputFocus(false), 200)

  return (
    <StyledCategorySelect {...props}>
      <div className="category-select__toggle">
        <CategoryInput
          {...inputProps}
          className="category-auto-complete__input"
          categoryList={categoryList}
          categoryValue={categoryData}
          categoryWidth={categoryWidth}
          onCategoryChange={handleCategoryChange}
          icon={SELECT_ICONS.chevronLeft}
          value={value}
          onBlur={handleMenuClose}
          onClick={handleMenuOpen}
          onKeyUp={onKeyUp}
        />
      </div>
      {shouldOpenMenu && (
        <ul className="category-select__menu common-scrollbar">
          {props?.children}
        </ul>
      )}
      {multipleChoices && shouldOpenMenu && (
        <div
          className="category-select__backdrop"
          onClick={() => setIsInputFocus(false)}
        />
      )}
    </StyledCategorySelect>
  )
}

const StyledCategorySelect = styled.div`
  position: relative;

  .category-select {
    &__toggle {
      position: relative;

      cursor: pointer;
    }

    &__input {
      & > input {
        cursor: pointer;
      }
    }

    &__menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 11;

      width: 100%;
      max-height: 320px;
      padding: 20px;

      overflow: auto;

      background: #ffffff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
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

  .select {
    &__option-container {
      display: flex;
      align-items: center;
    }
  }
`
