import {Text} from 'common/text'
import {useState} from 'react'
import {NOTIFICATION_ICONS} from './_icons'
import {StyledNotificationBar} from './_styled'

/**
 * @type {TypeType}  = 'danger' | 'info' | 'success' | 'warning'
 */
/**
 * @param {canClose} ?: Boolean       <Have toggle to close>
 * @param {type}     ?: TypeType      <Appearances of notification>
 */
export const NotificationBar = ({
  type = 'info', // danger | info | success | warning
  onClose,
  ...props
}) => {
  const [shouldOpen, setShouldOpen] = useState(true)

  const selectedType = ['danger', 'info', 'success', 'warning'].includes(type)
    ? type
    : 'info'

  const handleClose = () => {
    if (onClose) onClose()

    setShouldOpen(false)
  }

  if (!shouldOpen) return <></>

  return (
    <StyledNotificationBar
      {...props}
      data-type={selectedType}
      data-close-toggle={true}
    >
      {NOTIFICATION_ICONS[selectedType]}
      <Text>{props?.children}</Text>
      <button className="notification-bar__delete-btn" onClick={handleClose}>
        {NOTIFICATION_ICONS.delete}
      </button>
    </StyledNotificationBar>
  )
}
