import styled from 'styled-components'
import {DatePicker} from 'rsuite'
import {DATE_PICKER_ICONS} from './_icons'
import {THEME_COLORS} from 'common/theme/_colors'
import {formatDatetime} from './_functions'
import { useEffect, useState } from 'react'
import {Input} from '../input'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import {useRef} from 'react'

export const CategoryDatePicker = ({
  onChange,
  inputProps,
  placeholder,
  format,
  disabledTime,
  onTab = true,
  datePickerProps,
  horizontal = 'Start',
  trigger = false,
  ...props
}) => {
  const [tmpVal, setTmpVal] = useState(datePickerProps?.defaultValue)
  const [placement, setPlacement] = useState(`bottom${horizontal}`)

  const toggleRef = useRef(null)

  let before1Day = new Date()
  before1Day.setDate(before1Day.getDate() - 1)

  const onOpen = () => {
    setTimeout(() => handleWrapperToggle(true), 0)

    const viewportOffset = toggleRef.current.getBoundingClientRect()
    // these are relative to the viewport, i.e. the window
    const top = viewportOffset.top
    setPlacement(top + 500 > screen.height ? `top${horizontal}` : `bottom${horizontal}`)
  }

  const handleWrapperToggle = (boo, deps = false) => {
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return

    wrapper.style.overflow = !deps ?  boo ? 'hidden' : 'auto' : 'auto'
  }

  const handleChange = val => {
    if (onChange) {
      const formatValue = val ? formatDatetime(val) : ''

      setTmpVal(val)

      onChange({
        formatValue,
        value: val || null,
      })
    }
  }
  useEffect(() => {
    setTmpVal(datePickerProps?.defaultValue)
  },[trigger])

  return (
    <StyledDatePicker {...props}>
      <div ref={toggleRef} className="date-picker__container">
        <Input {...inputProps} className="date-picker__category" onClick={onOpen} />
        <DatePicker
          {...datePickerProps}
          id="date-picker"
          className="date-picker__date-input"
          format={format || 'dd/MM/yyyy HH:mm'}
          isoWeek={true}
          oneTap={onTab}
          placement={placement}
          ranges={[]}
          value={tmpVal}
          style={{
            '--input-padding-left': '16px',
          }}
          onClick={onOpen}
          placeholder={placeholder || 'dd/mm/yy'}
          onChange={handleChange}
          onExit={() => handleWrapperToggle(false)}
          onOk={() => {
            handleWrapperToggle(false,true )
          }}
          disabledDate={date =>
            !!disabledTime
              ? disabledTime === 'isAfter'
              ? isAfter(date, new Date())
              : isBefore(date, before1Day)
              : ''
          }
        />
        <div className="date-picker__icon">{DATE_PICKER_ICONS.calendar}</div>
      </div>
    </StyledDatePicker>
  )
}

const StyledDatePicker = styled.div`
  .date-picker {
    &__container {
      position: relative;
    }

    &__category {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;

      &:hover {
        & ~ .date-picker__date-input {
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
