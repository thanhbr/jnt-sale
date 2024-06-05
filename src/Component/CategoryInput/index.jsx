import {useState} from "react";
import {Text} from "../../common/text";
import {Popover} from "@mui/material";
import styled from "styled-components";
import {Input} from '../Input'
import {THEME_COLORS} from "../../common/theme/_colors";
import {INPUT_ICONS} from "../../common/form/input/_icons";

export const CategoryInput = ({
    categoryDefaultValue,
    categoryIcon,
    categoryList,
    categoryValue,
    categoryWidth = 125,
    onCategoryChange,
    defaultValue,
    icon,
    label,
    labelTooltip,
    validateText,
    validateType,
    value,
    onChange,
    onKeyDown,
    onIconClick,
    disabled,
    ...props
  }) => {
  const inputProps = {
    icon,
    label,
    labelTooltip,
    validateText,
    validateType,
    value,
    ...props,
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const [selected, setSelected] = useState(
    categoryValue
      ? categoryValue
      : categoryDefaultValue
      ? categoryList[0]
      : null,
  )

  const shouldOpenPopover = Boolean(anchorEl)
  const popoverId = shouldOpenPopover ? 'category-input-popover' : undefined

  const handleCategoryChange = data => {
    setSelected(data)

    if (onCategoryChange) onCategoryChange(data)

    handlePopoverClose()
  }

  const handleInputChange = e => {
    if (onChange) onChange(e.target.value)
  }
  const handleInputKeypress = e => {
    if (onKeyDown) onKeyDown(e.keyCode)
  }

  const handlePopoverOpen = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handlePopoverClose = () => setAnchorEl(null)

  return (
    <StyledCategoryInput {...props} onClick={e => e.stopPropagation()}>
      <div
        className="category-input__menu-toggle"
        aria-describedby={popoverId}
        data-only-one-option={
          Array.isArray(categoryList) && categoryList.length <= 1
        }
        style={{width: categoryWidth}}
        onClick={handlePopoverOpen}
      >
        <Text className="category-input__menu-toggle-text">
          {selected?.name}
        </Text>
        {categoryIcon ? (
          <div className="category-input__menu-toggle-icon">{categoryIcon}</div>
        ) : (
          Array.isArray(categoryList) &&
          categoryList.length > 1 && (
            <div
              className="category-input__menu-toggle-icon"
              data-active={shouldOpenPopover}
            >
              {INPUT_ICONS.chevronLeft}
            </div>
          )
        )}
      </div>
      {shouldOpenPopover &&
      Array.isArray(categoryList) &&
      categoryList.length > 1 && (
        <Popover
          id={popoverId}
          className="category-input__popover"
          open={true}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{top: 4}}
          style={{'--popover-width': `${categoryWidth}px`}}
        >
          <ul className="category-input__menu">
            {categoryList.map(item => (
              <li
                key={item?.value}
                className="category-input__menu-item"
                onClick={() => handleCategoryChange(item)}
              >
                {item?.name}
              </li>
            ))}
          </ul>
        </Popover>
      )}
      <Input
        {...inputProps}
        className="category-input__input"
        style={{'--input-padding-left': `${categoryWidth + 6}px`}}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeypress}
        onIconClick={onIconClick}
        disabled={disabled}
      />
    </StyledCategoryInput>
  )
}

const StyledCategoryInput = styled.div`
  position: relative;

  .category-input {
    &__menu-toggle {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;

      height: 34px;
      padding: 0 32px 0 12px;

      display: flex;
      align-items: center;

      cursor: pointer;

      &[data-only-one-option='true'] {
        padding: 0 12px;

        pointer-events: none;
      }

      &::before {
        position: absolute;
        top: 50%;
        right: 0;

        width: 2px;
        height: 12px;

        background: #ebeef5;

        content: '';

        transform: translateY(-50%);
      }

      &:hover {
        & ~ .category-input__input {
          .input__input {
            border-color: ${THEME_COLORS.primary_400};
          }
        }
      }
    }

    &__menu-toggle-text {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;

      text-overflow: ellipsis;
    }

    &__menu-toggle-icon {
      position: absolute;
      top: 50%;
      right: 6px;

      width: 20px;
      height: 20px;

      transform: translateY(-50%);
      transition: transform 0.25s;

      pointer-events: none;

      &[data-active='true'] {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &__input {
      position: relative;
      z-index: 1;

      & > input {
        padding-left: var(--input-padding-left);
      }
    }
  }
`
