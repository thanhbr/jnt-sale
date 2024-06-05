import React, {useContext, useEffect, useState} from 'react';
import {SCRIPT} from "../../../_script";
import {ORDER_PAGE, TAB_USER_PROFILE} from "../../../../../Component/Icons";
import DateTimeRangePicker from "../DateTimeRangePicker"
import "./index.scss";
import {OrderContext} from "../../../../../LayoutWrapper";

const Index = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [showOption, setShowOption] = useState(false)
  const [type, setType] = useState(SCRIPT.DATE.CREATE)
  const [, dispatch] = useContext(OrderContext)

  useEffect(() => {
    window.addEventListener('click', function (e) {
      const order_create = document.getElementById('search_order_create')?.contains(e.target)
      if(!order_create) setShowOption(false)
    })
    return function cleanupListener() {
      window.removeEventListener('click', () => {})
    }
  }, [])

  return (
    <>
      <div className={'order-filter-more__grp-date'}>
        <div className={'order-filter-more__date'}>
          <p className={`order-filter-more__date-select ${showOption ? 'active' : ''}`}
             id={'search_order_create'}
             onClick={() => {
               setShowOption(!showOption)
               setShowCalendar(false)
             }}
          >
            <span>{type}</span>
            {TAB_USER_PROFILE.arrow}
          </p>
          {showOption ? (
            <div className={'order-filter-more__date-option'}>
              <p onClick={() => {
                setType(SCRIPT.DATE.CREATE)
                dispatch({type: 'SET_FILTER', payload: {date_type: {label: SCRIPT.DATE.CREATE, value: 'created', name: SCRIPT.DATE.CREATE}}})
              }}>{SCRIPT.DATE.CREATE}</p>
              <p onClick={() => {
                setType(SCRIPT.DATE.SENT)
                dispatch({type: 'SET_FILTER', payload: {date_type: {label: SCRIPT.DATE.SENT, value: 'sended', name: SCRIPT.DATE.SENT}}})
              } }>{SCRIPT.DATE.SENT}</p>
            </div>
          ) : ''}
        </div>
        <DateTimeRangePicker />
        <span className={'order-filter-more__date-calendar'}
              id={'search_order_calendar'}
              onClick={ () => setShowCalendar(!showCalendar) }
        >{ORDER_PAGE.calendar}</span>
      </div>
    </>
  );
};

export default Index;