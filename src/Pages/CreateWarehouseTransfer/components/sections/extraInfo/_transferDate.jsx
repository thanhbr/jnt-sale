import {CategoryDatePicker} from 'common/form/datePicker'
import { formatDatetime } from 'common/form/datePicker/_functions'
import {now} from 'moment'
import {actionTypes} from 'Pages/CreateWarehouseTransfer/provider/_actions'
import {WarehouseTransferContext} from 'Pages/CreateWarehouseTransfer/provider/_context'
import {useContext} from 'react'

export const WarehouseTransferDate = ({...props}) => {
  const {state, dispatch} = useContext(WarehouseTransferContext)
  const {extraInfo} = state.form

  const handleChangeDate = date => {
    dispatch({
      type: actionTypes.FORM_EXTRA_INFO_UPDATE,
      payload: {...extraInfo, transferDate: new Date(date.value)},
    })
  }

  return (
    <>
      <CategoryDatePicker
        onChange={handleChangeDate}
        onTab={false}
        datePickerProps={{
          placement: 'bottomEnd',
          defaultValue:  new Date()
        }}
        dateFormat="dd/MM/yyyy"
        style={{marginTop: '8px'}}
        format="dd/MM/yyyy"
        inputProps={{
          editable: 'false',
        }}
        disabledTime={'isAfter'}
      />
    </>
  )
}
