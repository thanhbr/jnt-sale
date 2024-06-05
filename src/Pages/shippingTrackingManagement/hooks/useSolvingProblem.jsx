import { useContext } from 'react'
import { ShippingTrackingContext } from '../provider/_context'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import useAlert from '../../../hook/useAlert'
import moment from 'moment'

const useSolvingProblem = (onClose) => {

  const { pageState, pageDispatch } = useContext(ShippingTrackingContext)
  const solvingContent = pageState.form
  const {showAlert} = useAlert()


  const convertDateTimeToApiFormat = data => {
    const dateTimeSplit = data.split(' ')
    const dmy = dateTimeSplit[0] ? dateTimeSplit[0].split('/') : []
    const ymd = `${dmy[2]}-${dmy[1]}-${dmy[0]}`
    return `${ymd} ${dateTimeSplit[1] || ''}`.trim() + ':00'
  }


  const cellCodeOrderFormatDateTime = dateTimeParam => {
    const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
    const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
    const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
    const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
    const hm = `${hms[0]}:${hms[1]}`
    return `${dmy} ${hm}`.trim()
  }
  const setDataform = (data) => {
    const solvingAction = data?.problem_solving_action == 0 || !data?.problem_solving_action ? '' : JSON.parse(data?.problem_solving_action)
    pageDispatch({type: 'SET_DATA_FORM', payload: {
        note : data?.problem_note,
        billCode : data?.billcode,
        status : data?.status,
        problem_solving_action: !solvingAction ? false : true,
        solvingAction : !solvingAction  ? {} :{
          type : solvingAction?.type,
          datetime : {
          formatValue: cellCodeOrderFormatDateTime(solvingAction?.datetime),
          value: new Date(solvingAction?.datetime || '')
        },
          remark : solvingAction?.remark
        }
      }})
  }

  const handleNote = note => {
    pageDispatch({type: 'SET_DATA_FORM', payload: {
        note : note,
      }})
  }

  const handleDateTimeSolving = data => {
    pageDispatch({type: 'SET_SOLVING_ACTION', payload: {
        datetime : data,
      }})
    pageDispatch({type: 'SET_VALIDATE_TIME', payload: {
        timeSolving : !data?.formatValue,
      }})
  }

  const handleRemarkSolving = data => {
    pageDispatch({type: 'SET_SOLVING_ACTION', payload: {
        remark : data,
      }})
  }


  const handleShowSolvingContent = _ => {
    pageDispatch({type: 'SET_SOLVING_ACTION', payload: {
        show : !solvingContent.solvingAction?.show,
      }})
  }

  const solvingOrder = async (onClose) => {
    let data = {
      content: solvingContent?.note,
    }
    const date = new Date()
    if(!!solvingContent.solvingAction?.show)
      data.solving_action =  {
          type : 1,
          datetime : !!solvingContent.solvingAction?.datetime?.formatValue ? convertDateTimeToApiFormat(solvingContent.solvingAction?.datetime?.formatValue) : moment(date).format("YYYY-MM-DD h:mm:ss"),
          remark : solvingContent.solvingAction?.remark
        }
    const response = await sendRequestAuth(
      'post',
      `${config.API}/delivery/warning/solving/${solvingContent?.billCode}`,
      data
    )
    if (response?.data?.success) {
      showAlert({content: response?.data?.message, type: 'success'})
      let listOrder = pageState.table?.display?.list ?? []
      listOrder = listOrder.map((item) =>{
        if( item?.billcode == solvingContent?.billCode){
          item.problem_note = solvingContent?.note
          item.problem_solving_status = 1
          item.problem_solving_action = solvingContent?.solvingAction?.datetime?.formatValue ? JSON.stringify({type: 1, datetime: solvingContent?.solvingAction?.datetime?.formatValue, remark: solvingContent?.solvingAction?.remark}) : 0
        }
        return item
      })
      pageDispatch({
        type : 'TABLE_DISPLAY_DATA_UPDATE',
        payload: {
          display : {
            list: listOrder
          }
        }
      })
      onClose()
      pageDispatch({type: 'SHOW_CONFIRM', payload: false})
    } else {
      showAlert({
        content: response?.data?.message,
        type: 'danger',
      })
    }
  }
  const handleShowConfirm = boo => {
    !!boo ? onClose : ''
    pageDispatch({type: 'SHOW_CONFIRM', payload: boo})
  }
  const handleShowSolvingForm = boo => {
    pageDispatch({type: 'SHOW_FORM', payload: boo})
  }
  return {
    funcs: {
      setDataform,
      onChangeContentHandle: handleNote,
      solvingOrder, handleShowConfirm,
      handleShowSolvingForm,
      handleDateTimeSolving,
      handleRemarkSolving,
      handleShowSolvingContent
    },
    dataForm : {
      solvingContent
    },
    pageData: pageState
  };
}

export default useSolvingProblem