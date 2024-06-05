/**
 *
 * DatePicker v 1.0
 * by kynk - copyright 2020
 *
 */
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  useCallback,
} from 'react'
// import Paper from "@material-ui/core/Paper";
import {addDays, subDays} from 'date-fns'
import {DateRangePicker} from 'react-date-range'
import {enUS, vi} from 'date-fns/locale'
import {v4 as uuidv4} from 'uuid'

import {useTranslation} from 'react-i18next'
import moment from 'moment'
import {useConfigContext} from '../NavBar/navBar'
import * as DATE_RANGE_INPUT from './rangeInput'
import {OrderContext} from '../../LayoutWrapper'
import dataStorage from 'dataStorage'
// let count = 0;
// let isType = false;
let timeout
let isDelete = false
export default function DatePickerCustom({...props}) {
  const that = {}
  const {
    listOption = null,
    callBack = () => {},
    cbFilter = () => {},
    rangeDate = '',
    customClass = '',
    selected,
    id = null,
    dispatch = () => {},
    callBackInput = () => {},
  } = props
  // let
  const {t} = useTranslation()
  const {lang} = useConfigContext()

  const [isShowDatePicker, changeShowDatepicker] = useState(false)
  const [isShowMenu, changeShowMenu] = useState(false)
  // const [isDelete, changeIsDelete] = useState(false);

  const range = DATE_RANGE_INPUT.DefaultStaticRanges()
  const ref = useRef(null)
  const datePickerRef = useRef(null)
  const inputRef = useRef(null)
  const [value, changeValue] = useState(rangeDate)
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  
  // const [orderState, orderDispatch] = useContext(OrderContext);
  let objLang = {}
  switch (lang) {
    case 'vi':
      objLang = vi
      break
    case 'en':
      objLang = enUS
      break
    default:
      break
  }
  const resetDatePicker = () => {
    setState([
      {
        startDate: subDays(new Date(), 7),
        endDate: new Date(),
        key: 'selection',
      },
    ])
  }
  const resetInputValue = () => {
    changeValue(
      `${moment(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).format(
        'DD/MM/YYYY',
      )} - ${moment(new Date().getTime()).format('DD/MM/YYYY')}`,
    )
  }
  const changeSelect = obj => {
    try {
      changeShowMenu(false)
      dispatch({
        type: 'SET_RANGE_TYPE',
        payload: obj.value,
      })
      cbFilter(obj, changeShowMenu)
    } catch (error) {
      console.log(`error at changeSelect ==========${error}`)
    }
  }
  const ClickConfirmButton = params => {
    const item = state[0]
    const start = moment(item.startDate).format('DD/MM/YYYY')
    const end = moment(item.endDate).format('DD/MM/YYYY')
    const dateString = `${start} - ${end}`
    changeValue(dateString)
    dispatch({
      type: 'SET_RANGE_DATE',
      payload: {end_date: item.endDate, start_date: item.startDate},
    })
    dispatch({
      type: 'SET_DATE_TEXT',
      payload: `${start} - ${end}`,
    })
    changeShowDatepicker(false)
  }
  const ClickCanCelButton = params => {
    changeShowDatepicker(false)
  }
  const CreatButtonBottom = t => {
    const parent = document.querySelector('.rdrMonths.rdrMonthsHorizontal')
    if (!parent) return
    const ele = document.createElement('div')
    const ok = document.createElement('div')
    const cancel = document.createElement('div')
    ok.innerText = t('confirm')
    cancel.innerText = t('cancel')
    ele.append(cancel)
    ele.append(ok)
    cancel.onclick = () => ClickCanCelButton()
    ele.classList.add('date-picker-button')
    ok.classList.add('date-picker-confirm')
    ok.onclick = () => ClickConfirmButton()
    cancel.classList.add('date-picker-cancel')
    parent.append(ele)
  }
  const didmout = () => {
    CreatButtonBottom(t)
    dataStorage.resetDatePicker = () => resetDatePicker()
    dataStorage.resetDatePickerValue = () => resetInputValue()
    if (inputRef.current && inputRef.current) {
    }
    document.addEventListener('mousedown', handleClickOutside)
  }
  const unmount = () => {
    dataStorage.resetDatePicker = null
    dataStorage.resetDatePickerValue = null
    document.removeEventListener('mousedown', handleClickOutside)
  }
  useEffect(() => {
    try {
      didmout()
      return () => {
        unmount()
      }
    } catch (error) {
      console.log(`error at search box didmout${error}`)
    }
  }, [state])

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenu(false)
    }
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      changeShowDatepicker(false)
    }
  }

  const onInputKeydown = event => {
    const {key} = event
    console.log('kyn -- on keydown event')
    if (key === 'Backspace' || key === 'Delete') {
      if (!isDelete) {
        isDelete = true
      }
    } else if (isDelete) {
      isDelete = false
    }
  }
  const handleTextInput = text => {
    try {
      if (isDelete) {
        return text
      }
      if (/^[0-9\\/-]*$/.test(text)) {
        console.log('valid--text')
      } else {
        text = text.replace(!/^[0-9\\/-]*$/, '')
        return text
      }
      const l = text.length
      switch (l) {
        case 2:
        case 7:
        case 19:
        case 24:
          text += ' / '
          break
        case 14:
          text += ' - '
          break
        default:
          break
      }
      return text
    } catch (error) {
      console.log(
        `=============== error handleTextInput ===============${error}`,
      )
    }
  }
  const updateData = (data, type) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      if (callBack) {
        callBack(data, type)
      }
    }, 300)
  }
  const onChangeText = event => {
    try {
      let text = event.target.value
      const l = text.length
      if (l > 23) return
      text = handleTextInput(text)
      changeValue(text)
      callBackInput(text)
    } catch (error) {
      console.log(`=============== error onChangeText ===============${error}`)
    }
  }
  const onchangeDateRange = item => {
    setState([item.selection])
    updateData([item.selection])
  }

  return (
    <div className="datepicker">
      <div
        ref={datePickerRef}
        className="datepicker-wrapper hidden-select-month"
      >
        {/* <RenderInputDate /> */}
        <input
          ref={inputRef}
          className={`${customClass} date-selected`}
          onClick={() => {
            changeShowDatepicker(!isShowDatePicker)
          }}
          onChange={event => onChangeText(event)}
          value={value}
          onKeyDown={event => onInputKeydown(event)}
          onBlur={() => {
            // updateData();
          }}
          id={id || 'default-input-datepicker'}
        />
        {/* <RenderDatePickerForm /> */}
        <div className={isShowDatePicker ? 'upos-show-item' : 'upos-hide-item'}>
          <DateRangePicker
            onChange={item => {
              onchangeDateRange(item)
            }}
            showSelectionPreview
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            maxDate={new Date()}
            locale={objLang}
            showDateDisplay={false}
            weekdayDisplayFormat="eeeee"
            staticRanges={range}
          />
        </div>
      </div>
      {/* <RenderDropdown /> */}
      {listOption && (
        <div ref={ref} className="dropdown-wrapper cursor-pointer ">
          <div
            className={
              !isShowMenu ? 'searchbox-dropdown' : 'searchbox-dropdown'
            }
            onClick={e => {
              changeShowMenu(!isShowMenu)
              const icon = e.target.querySelector('img')
              if (!icon) return
              if (!isShowMenu) {
                icon.style.transform = 'rotate(180deg)'
              } else {
                icon.style.transform = 'rotate(0deg)'
              }
            }}
          >
            {listOption[selected].label}
            <img
              className="block-click add-effect-all expand-menu-order"
              src="/svg/arr-white.svg"
            />
          </div>
          <div
            className={
              isShowMenu
                ? 'dropdown-items-wrapper '
                : 'dropdown-items-wrapper dropdown-hide'
            }
          >
            {Object.keys(listOption).map(item => (
              <div
                key={uuidv4()}
                className={
                  selected === listOption[item].label
                    ? 'dropdown-items dropdown-items-active'
                    : 'dropdown-items'
                }
                onClick={e => {
                  changeSelect(listOption[item])
                }}
              >
                {listOption[item].label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
