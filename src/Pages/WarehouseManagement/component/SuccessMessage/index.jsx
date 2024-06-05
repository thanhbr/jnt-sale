import CloseIcon from '@mui/icons-material/Close'
import {IconButton, Snackbar} from '@mui/material'
import {useEffect} from 'react'
import './index.scss'

const SuccessMessage = ({successMessage, setSuccessMessage}) => {
  const handleSuccessMessageClose = () => {
    setSuccessMessage({active: false, message: ''})
  }

  useEffect(() => {
    let timer = null
    if (successMessage.active)
      timer = setTimeout(
        () => setSuccessMessage({active: false, message: ''}),
        5000,
      )
    return clearTimeout(timer)
  }, [successMessage.active])

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
      open={successMessage.active}
      autoHideDuration={2000}
      onClose={handleSuccessMessageClose}
      action={action}
    >
      <div className="customer-notification-message">
        <div className="t-notification-message">
          {successMessage.iconUrl && <img src={successMessage.iconUrl} alt="check-circle" />}
          <p>{successMessage.message}</p>
        </div>
      </div>
    </Snackbar>
  )
}

export const successIcon = '/svg/check-circle.svg'
export const failIcon = '/svg/alert-circle.svg'

export default SuccessMessage
