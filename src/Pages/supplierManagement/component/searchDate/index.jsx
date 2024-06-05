import React, {useContext, useEffect, useRef, useState} from 'react'
import {ORDER_PAGE, TAB_USER_PROFILE} from '../../../../Component/Icons'
import './index.scss'
import {OrderContext} from '../../../../LayoutWrapper'
import {SCRIPT} from 'Pages/Order/_script'
import useClickOutside from 'Pages/customer/useClickOutside'
import DateTimeRangePickerCustom from "../../../customer/components/DateTimeRangePickerCustom/index"
const Index = ({startDate, endDate, setStartDate, setEndDate}) => {
    const [showCalendar, setShowCalendar] = useState(false)
    const [showOption, setShowOption] = useState(false)
    const [type, setType] = useState(SCRIPT.DATE.CREATE)
    // const [, dispatch] = useContext(OrderContext)

    // useEffect(() => {
    //   window.addEventListener('click', function (e) {
    //     const order_create = document
    //       .getElementById('search_order_create')
    //       ?.contains(e.target)
    //     if (!order_create) setShowOption(false)
    //   })
    //   return function cleanupListener() {
    //     window.removeEventListener('click', () => {})
    //   }
    // }, [])

    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, () => {
        setShowOption(false)
        setShowCalendar(false)
    });

    return (
        <>
            <div ref={wrapperRef} className={'supplier-filter-more__grp-date'}>
                <div className={'supplier-filter-more__date'}>
                    <p
                        className={`supplier-filter-more__date-select`}
                        // id={'search_order_create'}
                        onClick={() => {
                            // setShowOption(!showOption)
                            setShowCalendar(false)
                        }}
                    >
                        <span>Ngày tạo phiếu</span>
                    </p>
                    {showOption ? (
                        <div className={'supplier-filter-more__date-option'}>
                            <p
                                onClick={() => {
                                    setType(SCRIPT.DATE.CREATE)
                                    // dispatch({type: 'SET_FILTER', payload: {date_type: {label: SCRIPT.DATE.CREATE, value: 'created', name: SCRIPT.DATE.CREATE}}})
                                }}
                            >
                                {SCRIPT.DATE.CREATE}
                            </p>
                            <p
                                onClick={() => {
                                    setType(SCRIPT.DATE.SENT)
                                    // dispatch({type: 'SET_FILTER', payload: {date_type: {label: SCRIPT.DATE.SENT, value: 'sended', name: SCRIPT.DATE.SENT}}})
                                }}
                            >
                                {SCRIPT.DATE.SENT}
                            </p>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <DateTimeRangePickerCustom
                    open={showCalendar}
                    startDate={startDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    setStartDate={setStartDate}
                    size="sm"
                />
                <span
                    className={'supplier-filter-more__date-calendar'}
                    id={'search_order_calendar'}
                    onClick={() => {
                        setShowCalendar(!showCalendar)
                    }}
                >
          {ORDER_PAGE.calendar}
        </span>
            </div>
        </>
    )
}

export default Index
