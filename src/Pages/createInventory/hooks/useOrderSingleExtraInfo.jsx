import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {orderSingleAction} from '../provider/_actions'
import {InventorySingleContext} from '../provider/_context'

const useOrderSingleExtraInfo = () => {
  const {state, dispatch} = useContext(InventorySingleContext)
  const {extraInfo} = state.form
  // ======================================================================================================
  // NOTE
  // ======================================================================================================

  const [errorNote, setDeliveryNote] = useState(state?.form?.extraInfo?.note?.value?.length > 255)
  const handleNoteChange = val => {
    dispatch({
      type: orderSingleAction.FORM_NOTE_UPDATE,
      payload: {value: val},
    })
    val.length > 255 ? setDeliveryNote(true) : setDeliveryNote(false)
  }

  return {
    data: extraInfo,
    methods: {
      // note
      onNoteChange: handleNoteChange,
      errorNote
    },
  }
}

export default useOrderSingleExtraInfo
