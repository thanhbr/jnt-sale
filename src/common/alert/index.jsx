import {Snackbar} from '@mui/material'
import {Text} from 'common/text'
import useGlobalContext from 'containerContext/storeContext'
import {getValidType} from './_functions'
import {NOTIFICATION_ICONS} from './_icons'
import {StyledAlert} from './_styled'

/**
 * @type {TypeType}  = 'danger' | 'info' | 'success' | 'warning'
 */
/**
 * @param {duration} ?: number          <Time automatically disappears (miliseconds)>
 * @param {open}     ?: boolean         <Hide or show status>
 * @param {type}     ?: TypeType        <Appearances of alert>
 * @param {onClose}  ?: () => void      <Trigger close alert>
 */
export const Alert = ({
  duration = 5000,
  open = false,
  type = 'info',
  onClose,
  ...props
}) => {
  const [, dispatch] = useGlobalContext()

  const handleClose = () => {
    if (onClose) onClose()

    dispatch({type: 'ALERT_CLOSE'})
  }

  const selectedType = getValidType(type)
  return (
    <Snackbar
      className="common-alert"
      open={open}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <StyledAlert {...props}>
        {NOTIFICATION_ICONS[selectedType]}
        <Text color="#fff">{props?.children}</Text>
        <button className="alert__delete-btn" onClick={handleClose}>
          {NOTIFICATION_ICONS.delete}
        </button>
      </StyledAlert>
    </Snackbar>
  )
}
