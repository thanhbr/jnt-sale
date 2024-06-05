import CloseIcon from '@mui/icons-material/Close'
import {IconButton, Snackbar} from '@mui/material'
import {useEffect,useState} from 'react'
import './index.scss'
import useGroupCustomerContext from '../../hooks/_context'

const NotificationMessage = () => {

  const [state, setSuccessMessage]= useGroupCustomerContext();
  
  const handleSuccessMessageClose = () => {
    setSuccessMessage({type:'SET_SUCCESS_MESSAGE',payload: {active: false, message: ''}})
  }

  useEffect(() => {
    let timer = null
    if (state.successMessage.active)
      timer = setTimeout(
        () => setSuccessMessage({type:'SET_SUCCESS_MESSAGE',payload: {active: false, message: ''}}),
        5000,
      )
    return clearTimeout(timer)
  }, [state.successMessage.active])

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSuccessMessageClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={state.successMessage.active}
      autoHideDuration={2000}
      onClose={handleSuccessMessageClose}
      action={action}
    >
      <div className="grcustomer-notification-message">
        <div className="t-notification-message">
          {state.successMessage.iconUrl && <img src={state.successMessage.iconUrl} alt="check-circle" />}
          <p>{state.successMessage.message}</p>
        </div>
      </div>
    </Snackbar>
  )
}

export const successIcon = '/svg/check-circle.svg'
export const failIcon = '/svg/alert-circle.svg'

export default NotificationMessage
