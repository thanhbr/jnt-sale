import {CategoryInput} from '../input/_categoryInput'
import styled from 'styled-components'
import {DATE_PICKER_ICONS} from './_icons'
import {DateRangePicker} from 'rsuite'
import {useEffect, useState} from 'react'
import {formatDatetime} from './_functions'
import {THEME_COLORS} from 'common/theme/_colors'
import './index.scss'

export const CategoryDateTimeRangePicker = ({
  categoryDefaultValue,
  categoryList,
  categoryValue,
  categoryWidth = 125,
  defaultValue,
  label,
  labelTooltip,
  triggerDefault,
  validateText,
  validateType,
  value,
  onChange,
  datePickerProps,
  ...props
}) => {
  const checkExistDefaultValue =
    datePickerProps?.defaultValue && datePickerProps.defaultValue.length === 2

  const defaultStart = checkExistDefaultValue
    ? formatDatetime(datePickerProps.defaultValue[0])
    : ''
  const defaultEnd = checkExistDefaultValue
    ? formatDatetime(datePickerProps.defaultValue[1])
    : ''
  const defaultVal =
    defaultStart && defaultEnd ? `${defaultStart} - ${defaultEnd}` : ''

  const [tmpDateVal, setTmpDateVal] = useState([
    datePickerProps.defaultValue[0],
    datePickerProps.defaultValue[1],
  ])
  const [dateVal, setDateVal] = useState(defaultVal)
  const [categoryData, setCategoryData] = useState(
    categoryValue ? categoryValue : categoryDefaultValue || categoryList[0],
  )
  const handleCategoryChange = data => {
    setCategoryData(data)

    if (onChange)
      onChange({category: data, value: tmpDateVal, formatValue: dateVal})
  }

  const handleDateRangeChange = val => {
    const start = val && val[0] ? formatDatetime(val[0]) : ''
    const end = val && val[1] ? formatDatetime(val[1]) : ''

    setTmpDateVal(val)
    setDateVal(!!start && !!end ? `${start} - ${end}` : '')

    if (onChange)
      onChange({
        category: categoryData,
        formatValue: !!start && !!end ? `${start} - ${end}` : '',
        value: val || [null, null],
      })
  }

  const handleWrapperToggle = boo => {
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return

    wrapper.style.overflow = boo ? 'auto' : 'hidden'
  }

  useEffect(() => {
    setTmpDateVal(
      triggerDefault === null
        ? ['', '']
        : [datePickerProps.defaultValue[0], datePickerProps.defaultValue[1]],
    )
    setDateVal(triggerDefault === null ? '' : defaultVal)
    setCategoryData(
      categoryValue ? categoryValue : categoryDefaultValue || categoryList[0],
    )
  }, [triggerDefault])

  return (
    <StyledCategoryDateTimeRangePicker {...props}>
      <div className="category-date-time-range-picker__container">
        <CategoryInput
          className="category-date-time-range-picker__category"
          categoryList={categoryList}
          categoryValue={categoryData}
          categoryWidth={categoryWidth}
          onCategoryChange={handleCategoryChange}
        />
        <DateRangePicker
          {...datePickerProps}
          className="category-date-time-range-picker__date-input"
          format="dd/MM/yyyy HH:mm"
          isoWeek={true}
          placement="bottomStart"
          ranges={datePickerProps?.range ? datePickerProps?.range : []}
          value={tmpDateVal}
          style={{'--input-padding-left': `${categoryWidth + 8}px`}}
          // onClean={() => handleDateRangeChange([null, null])}
          onOk={handleDateRangeChange}
          onChange={handleDateRangeChange}
          onOpen={() => handleWrapperToggle(false)}
          onClose={() => handleWrapperToggle(true)}
        />
        <div className="category-date-time-range-picker__icon">
          {DATE_PICKER_ICONS.calendar}
        </div>
      </div>
    </StyledCategoryDateTimeRangePicker>
  )
}

const StyledCategoryDateTimeRangePicker = styled.div`
  .category-date-time-range-picker {
    &__container {
      position: relative;
    }

    &__category {
      position: absolute;
      top: 0;
      left: 0;

      &:hover {
        & ~ .category-date-time-range-picker__date-input {
          [role='combobox'] {
            border-color: ${THEME_COLORS.primary_400}!important;
          }
        }
      }

      input {
        opacity: 0;
      }
    }

    &__icon {
      position: absolute;
      top: 6px;
      right: 8px;
      z-index: 2;

      width: 20px;
      height: 20px;

      pointer-events: none;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &__date-input {
      position: relative;
      z-index: 1;

      width: 100%;
      height: 34px;

      border: none;

      [role='combobox'] {
        height: 34px;

        border: 1px solid #ebeef5 !important;
        border-radius: 8px;
        box-shadow: none !important;

        &.rs-picker-toggle-active,
        &:hover {
          border-color: ${THEME_COLORS.primary_400}!important;
        }

        input {
          height: 32px;
          padding-left: var(--input-padding-left);
          padding-right: 42px;

          overflow: hidden;
          white-space: nowrap;

          border: none;
          opacity: 1 !important;

          text-overflow: ellipsis;

          &::placeholder {
            color: #7c88a6;
            font-size: 14px;
            font-weight: 400 !important;
          }
        }

        .rs-picker-toggle-clean.rs-btn-close {
          top: 6px;

          svg {
            color: #7c88a6;
          }
        }

        .rs-picker-toggle-caret.rs-icon {
          display: none;
        }

        .rs-picker-toggle-placeholder {
          display: none;
        }
      }
    }
  }
`
