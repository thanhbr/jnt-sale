import { ICON_FILTER } from '../../../interface/icon'
import { Tooltip } from '../../../../../../../common/tooltip'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FacebookDateTimeRangePicker } from './_FbDateTimeRangePicker'
import { DateRangePicker } from 'rsuite'
import useFilterFacebookLiveStreamDetail from '../../../hooks/useFilterFacebookLiveStreamDetail'

export const Calendar = ({ ...props }) => {
  const { data, date } = useFilterFacebookLiveStreamDetail()
  const [isActionActive, setIsActionActive] = useState(false)
  const wrapperRef = useRef(null)
  const wrapperRef2 = useRef(null)
  useEffect(() => {
    function handleClickOutside (event) {
      let contain = (document.getElementsByClassName('rs-picker-menu') ? document.getElementsByClassName('rs-picker-menu')[0] : '')
      if (
        !contain?.contains(event.target) &&
        !wrapperRef2.current?.contains(event.target)
      ) {
        setIsActionActive(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])
  const resetFilter = _ => {
    date.clearFilterDate()
    setIsActionActive(false)
  }
  const { afterToday } = DateRangePicker
  return (
    <div style={{ position: 'relative' }} className={'facebook-calendar'}>
      <StyledRowMenuPopover>
        <FacebookDateTimeRangePicker
          className="facebook-calendar order-filter-form__input-wide"
          value={date.value}
          triggerDefault={date.value}
          onChange={date.handleDateChange}
          onPickerOpen={() => setIsActionActive(true)}
          onPickerClose={() => setIsActionActive(false)}
          datePickerProps={{
            defaultValue: [date.startDate, date.endDate],
            disabledDate: afterToday(),
            placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
            open: isActionActive,
            ref: wrapperRef
          }}
        />
      </StyledRowMenuPopover>
      <div
        className={'filter-content__item'}
        ref={wrapperRef2}
        data-show={!!isActionActive}
        data-filter={!!date?.value}
      >
        {
          !isActionActive
            ?
            <Tooltip placement="right" title={'Lọc theo thời gian nhận bình luận/tin nhắn'}>
              <div
                className={'filter-content__item-icon'}
                onClick={e => {
                  setIsActionActive(!isActionActive)
                  e.stopPropagation()
                }}>
                {ICON_FILTER.calendar}
              </div>
            </Tooltip>
            :
            <div
              className={'filter-content__item-icon'}
              onClick={e => {
                setIsActionActive(!isActionActive)
                e.stopPropagation()
              }}>
              {ICON_FILTER.calendar}
            </div>
        }
        {!!date.value
        &&
        <div className={'close-filter'} onClick={resetFilter}>
          <Tooltip placement="right" title={'Bỏ lọc'}>{ICON_FILTER.close}</Tooltip>
        </div>
        }
      </div>
    </div>
  )
}

const StyledRowMenuPopover = styled.div`
opacity: 0;
width: 100%;
height: 1px;
overflow: hidden;
`
