import React, {useContext, useState} from 'react'
import {DateRangePicker} from 'rsuite'
import './index.scss'
import {fDateTimeSuffix} from '../../../../util/formatTime'
import {OrderContext} from '../../../../LayoutWrapper'
import {CalendarLocaleType} from './locale'
import moment, {now} from 'moment'

const Index = ({open, startDate, endDate, setEndDate, setStartDate}) => {
  const {afterToday} = DateRangePicker
  function handleSelect(date) {
    if (!date) {
      setStartDate(null)
      setEndDate(null)
    } else {
      setStartDate(moment(date[0]).format('YYYY-MM-DD hh:mm'))
      setEndDate(moment(date[1]).format('YYYY-MM-DD hh:mm'))
    }
  }
  return (
    <>
      <div className="date-time-range-picker-custom">
        <DateRangePicker
          // open={open}
          format="dd/MM/yyyy HH:mm"
          placeholder="dd/mm/yy hh:mm - dd/mm/yy hh:mm"
          disabledDate={afterToday()}
          cleanable={false}
          onChange={handleSelect}
          locale={CalendarLocaleType}
          value={[
            startDate ? new Date(startDate) : null,
            endDate ? new Date(endDate) : null,
          ]}
        />
      </div>
    </>
  )
}

export default Index
