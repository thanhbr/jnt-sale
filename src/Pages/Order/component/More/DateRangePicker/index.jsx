import {useState} from 'react';
import {DateRangePicker} from "react-date-range";
import {now} from "moment";
import {fDateTimeSuffix} from '../../../../../util/formatTime'

import './index.scss'
import {days, months, ruStaticRanges} from './locale'

const Index = ({...props}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date(now() ))
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  }
  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    props.callBackStartDate(fDateTimeSuffix(startDate))
    props.callBackEndDate(fDateTimeSuffix(endDate))
  }

  //Locale
  const locale = {
    localize: {
      day: n => days[n],
      month: n => months[n],
    },
    formatLong: {
      date: () => 'mm/dd/yyyy'
    }
  }

  return (
    <div className="date-range-picker-custom">
      <DateRangePicker ranges={ [selectionRange] }
                       onChange={handleSelect}
                       locale={locale}
                       staticRanges={ruStaticRanges}
                       maxDate={new Date(now())}
      />
    </div>
  )
};

export default Index;