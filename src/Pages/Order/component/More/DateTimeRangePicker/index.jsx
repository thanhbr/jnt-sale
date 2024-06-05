import React, {useContext, useState} from 'react';
import { DateRangePicker } from 'rsuite';
import './index.scss'
import {fDateTimeSuffix} from "../../../../../util/formatTime";
import {OrderContext} from "../../../../../LayoutWrapper";
import {CalendarLocaleType} from "./locale";
import moment, {now} from "moment";

const Index = () => {
  const [, dispatch] = useContext(OrderContext)
  const { afterToday } = DateRangePicker;
  const [time, ] = useState([new Date(now()  - (24*60*60*1000)*7), new Date(now() )]);

  function handleSelect(date) {
    dispatch({type: 'SET_FILTER', payload: {start_date: {name: fDateTimeSuffix(date[0]), value: moment(date[0]).format("YYYY-MM-DD hh:mm") },
                                              end_date: {name: fDateTimeSuffix(date[1]), value: moment(date[1]).format("YYYY-MM-DD hh:mm") }
    }})
  }
  return (
    <>
      <div className="date-time-range-picker-custom">
        <DateRangePicker format="dd/MM/yyyy HH:mm"
                         placeholder="dd/mm/yy hh:mm - dd/mm/yy hh:mm"
                         disabledDate={afterToday()}
                         onChange={handleSelect}
                         locale={CalendarLocaleType}
                         value={time}
        />
      </div>
    </>
  );
};

export default Index;