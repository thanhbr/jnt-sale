import {useEffect, useState} from "react";
import {Text} from "../../../../common/text";
import {Tooltip} from "../../../../common/tooltip";
import {INPUT_ICONS} from "../../../../common/form/input/_icons";
import {Popover} from "@mui/material";
import {Input} from "../../../../common/form/input";
import styled from "styled-components";
import {THEME_COLORS} from "../../../../common/theme/_colors";

export const CategoryInput = ({
                                categoryDefaultValue,
                                categoryHidden = false,
                                categoryIcon,
                                categoryList,
                                categoryValue,
                                categoryWidth = 125,
                                onCategoryChange,
                                defaultValue,
                                icon,
                                label,
                                labelTooltip,
                                triggerCategory,
                                validateText,
                                validateType,
                                value,
                                onChange,
                                onIconClick,
                                labelCategoryTooltip,
                                ref,
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

  const handlePopoverOpen = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }
  const handlePopoverClose = () => setAnchorEl(null)

  useEffect(() => {
    if (!!categoryValue) setSelected(categoryValue)
  }, [categoryValue])

  return (
    <StyledCategoryInput {...props} onClick={e => e.stopPropagation()}>
      {!categoryHidden && (
        <>
          <div
            ref={ref}
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
              {labelCategoryTooltip && (
                <Tooltip title={labelCategoryTooltip}>{INPUT_ICONS.question}</Tooltip>
              )}
            </Text>
            {categoryIcon ? (
              <div className="category-input__menu-toggle-icon">
                {categoryIcon}
              </div>
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
        </>
      )}

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
                data-active={item?.value == selected?.value}
              >
                {item?.name}
              </li>
            ))}
          </ul>
        </Popover>
      )}
      {selected?.icon}
      <Input
        {...inputProps}
        className="category-input__input"
        style={{
          '--input-padding-left': `${
            categoryHidden ? 16 : categoryWidth + 6
          }px`,
          ...inputProps?.style,
        }}
        value={value}
        onChange={handleInputChange}
        onIconClick={onIconClick}
      ></Input>
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

      input {
        padding-left: var(--input-padding-left) !important;
      }
    }
  }
`
