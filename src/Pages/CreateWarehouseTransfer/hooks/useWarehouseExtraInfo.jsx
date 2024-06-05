import { useContext, useState } from 'react'
import { actionTypes } from '../provider/_actions'
import { WarehouseTransferContext } from '../provider/_context'

const useWarehouseTSExtraInfo = () => {
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {extraInfo} = state.form

  const [errorNote, setErrorNote] = useState(state?.form?.extraInfo?.note?.length > 255)
  const handleNoteChange = val => {
    dispatch({
      type: actionTypes.FORM_NOTE_UPDATE,
      payload: val,
    })
    val.length > 255 ? setErrorNote(true) : setErrorNote(false)
  }

  return {
    data: extraInfo,
    methods: {
      onNoteChange: handleNoteChange,
      errorNote
    },
  }
}

export default useWarehouseTSExtraInfo
