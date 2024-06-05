import { Popover } from '@mui/material'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input } from '.'
import { INPUT_ICONS } from './_icons'

import './_categoryInputPopover.scss'
import { Tooltip } from '../../tooltip'
import { AUTO_COMPLETE_ICONS } from '../autoComplete/_icons'

export const CategoryInputSearch = ({
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
  searchCategoryInputProps,
  searchCategoryInputChange,
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

  const handleSearchCategoryInputChange = e => {
    if (searchCategoryInputChange) searchCategoryInputChange(e.target.value)
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
      <>
        <div
          ref={ref}
          className="category-input__menu-toggle"
          aria-describedby={popoverId}
          data-only-one-option={false}
          style={{ width: categoryWidth }}
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
            <div
              className="category-input__menu-toggle-icon"
              data-active={shouldOpenPopover}
            >
              <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.85845 3.85355C9.00145 3.71055 9.04423 3.4955 8.96684 3.30866C8.88945 3.12182 8.70713 3 8.5049 3H2.5049C2.30267 3 2.12035 3.12182 2.04296 3.30866C1.96557 3.4955 2.00835 3.71055 2.15134 3.85355L5.15134 6.85355C5.34661 7.04882 5.66319 7.04882 5.85845 6.85355L8.85845 3.85355Z"
                  fill="black"/>
              </svg>
            </div>
          )}
        </div>
      </>

      {shouldOpenPopover && (
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
          sx={{ top: 4 }}
          style={{ '--popover-width': `344px` }}
        >

          <div
            className="alternative-auto-complete__menu-header"
            data-size={'md'}
            style={{
              position: 'sticky',
              top: 0,
              padding: '16px 16px 0 16px',
              background: '#ffffff',
            }}
            onClick={e => e.stopPropagation()}
          >
            <Input
              className={`alternative-auto-complete__input ${
                searchCategoryInputProps?.className || ''
              }`}
              placeholder={searchCategoryInputProps?.placeholder}
              icon={searchCategoryInputProps?.icon || AUTO_COMPLETE_ICONS.search}
              onChange={handleSearchCategoryInputChange}
              value={searchCategoryInputProps.value}
            />
          </div>
          <ul className="category-input__menu common-scrollbar" style={{ height: '246px', overflow: 'auto' }}>
            {categoryList.length > 0 && categoryList.map(item => (
              <li
                key={item?.value}
                className="category-input__menu-item"
                onClick={() => handleCategoryChange(item)}
                data-active={item?.value == selected?.value}
              >
                {item?.name}
              </li>
            ))}
            {
              categoryList.length < 1 && (<div className="category-input__empty">
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
                  {searchCategoryInputProps.empty}
                </Text>
              </div>)
            }
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
        readOnly={false}
      ></Input>
    </StyledCategoryInput>
  )
}

const StyledCategoryInput = styled.div`
  position: relative;
  .category-input {
     &__empty {
      min-height: 200px;
      margin-bottom: 20px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    &__menu-toggle {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;

      height: 40px;
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

        width: 1px;
        height: 20px;

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
      right: 12px;

      width: 11px;
      height: 21px;

      transform: translateY(-50%);
      //transition: transform 0.25s;

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
