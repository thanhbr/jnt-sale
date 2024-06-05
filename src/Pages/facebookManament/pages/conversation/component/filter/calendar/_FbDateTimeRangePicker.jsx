import styled from 'styled-components'
import {DATE_PICKER_ICONS} from './_icons'
import {DateRangePicker} from 'rsuite'
import {useEffect, useState} from 'react'
import {formatDatetime} from './_functions'
import {THEME_COLORS} from '../../../../../../../common/theme/_colors'
import './index.scss'

export const FacebookDateTimeRangePicker = ({
  defaultValue,
  label,
  labelTooltip,
  triggerDefault,
  validateText,
  validateType,
  value,
  onChange,
  datePickerProps,
  onPickerOpen,
  onPickerClose,
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

  const handleDateRangeChange = val => {
    onPickerClose()
    const start = val && val[0] ? formatDatetime(val[0]) : ''
    const end = val && val[1] ? formatDatetime(val[1]) : ''

    setTmpDateVal(val)
    setDateVal(!!start && !!end ? `${start} - ${end}` : '')

    if (onChange)
      onChange({
        formatValue: !!start && !!end ? `${start} - ${end}` : '',
        value: val || [null, null],
      })
  }

  const handleWrapperToggle = boo => {
    boo ? onPickerClose()  : onPickerOpen()
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return

    wrapper.style.overflow = boo ? 'auto' : 'hidden'
  }

  useEffect(() => {
    setTmpDateVal(
      !triggerDefault
        ? ['', '']
        : [datePickerProps.defaultValue[0], datePickerProps.defaultValue[1]],
    )
    setDateVal(triggerDefault === null ? '' : defaultVal)
  }, [triggerDefault])
  return (
    <StyledCategoryDateTimeRangePicker {...props}>
      <div className="facebook-calendar category-date-time-range-picker__container">
        <DateRangePicker
          {...datePickerProps}
          className="category-date-time-range-picker__date-input"
          format="dd/MM/yyyy HH:mm"
          isoWeek={true}
          placement="rightStart"
          ranges={[]}
          value={tmpDateVal}
          style={{'--input-padding-left': '133px'}}
          // onOk={() => {
          //   handleDateRangeChange()
          // }}
          onChange={handleDateRangeChange}
          onOpen={() => {
            handleWrapperToggle(false)
          }}
          onClose={() => handleWrapperToggle(true)}
        />
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
            font-size: 13px;
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
