import moment from "moment"
import { useContext } from "react"
import {OrderContext} from '../../LayoutWrapper'

export const useOrder = () => {
  const [state, dispatch] = useContext(OrderContext)

  const onChangeSearchBox = (item, type) => {
    switch (type) {
      case 'CHANGE_TEXT':
        dispatch({type: 'SET_STRING_VALUE', payload: item})
        break
      case 'CHANGE_DROPDOWN':
        dispatch({type: 'SET_STRING_VALUE', payload: ''})
        dispatch({type: 'SET_STRING_FIELD', payload: item})
        break
      default:
        break
    }
  }

  let CheckFormat = false
  const onChangeDateRange = (item, type) => {
    switch (type) {
      case 'CHANGE_TEXT':
        // dispatch({ type: "SET_DATE_TEXT", payload: item });
        checkFormatDate(item)
        break
      case 'CHANGE_DROPDOWN':
        CheckFormat = true
        dispatch({type: 'SET_STRING_VALUE', payload: ''})
        dispatch({type: 'SET_RANGE_TYPE', payload: item})
        break
      default:
        break
    }
  }

  const checkFormatDate = item => {
    if (
      /^\d{2}[./-]\d{2}[./-]\d{4}\s-\s\d{2}[./-]\d{2}[./-]\d{4}$/.test(item)
    ) {
      const startDate = item.slice(0, 10)
      const endDate = item.slice(13, 23)
      // console.log(`date input range is ======= ${item}`);
      const timeStampStartDate = Number(
        moment(startDate, 'DD/MM/YYYY').format('x'),
      )
      const timeStampEndDate = Number(moment(endDate, 'DD/MM/YYYY').format('x'))
      dispatch({
        type: 'SET_DATE_TEXT',
        payload: `${startDate} - ${endDate}`,
      })
      dispatch({
        type: 'SET_RANGE_DATE',
        payload: {end_date: timeStampEndDate, start_date: timeStampStartDate},
      })
      CheckFormat = true
    } else {
      CheckFormat = false
    }
  }

  const onClickResetFilter = () => {
    const icon = document.querySelector('.refresh-icon')
    icon.classList.add('rotate-180')
    setTimeout(() => {
      icon.classList.remove('rotate-180')
    }, 500)
    dispatch({type: 'CANCEL_FILTER'})
  }

  return {
    CheckFormat,
    onChangeSearchBox: onChangeSearchBox,
    onChangDateRange: onChangeDateRange,
    checkFormatDate: checkFormatDate,
    onClickResetFilter: onClickResetFilter
  };
}