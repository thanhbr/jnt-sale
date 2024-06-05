import React from 'react'
import { toast as toastify } from 'react-toastify'
import {TOAST} from '../Icons'
import './index.scss'

export const ToastWrapper = props => {
  const { type = 'success', title, body } = props
  return (
    <div className= {`d-flex align-items-start toast}`}>
      {type === 'success' && (<div className={'toast__type'}>{TOAST.success}</div>)}
      {type === 'error' && (<div className={'toast__type'}>{TOAST.error}</div>)}
      {type === 'info' && (<div className={'toast__type'}>{TOAST.help}</div>)}
      {type === 'warning' && (<div className={'toast__type'}>{TOAST.warning}</div>)}
      <div className='flex-grow-1'>
        {title && <p className={'toast__title'}>{title}</p>}
        {body && (
          <p className={`toast-custom--body ${title ? 'mtb-7px' : ''}`}>
            {body}
          </p>
        )}
      </div>
    </div>
  )
}

const parseNotify = (notify = {}) => {
  let title
  let body

  if (typeof notify === 'string') {
    body = notify
  } else {
    title = notify.title
    body = notify.body
  }

  return {
    title,
    body,
  }
}

const success = notify => {
  const { title = '', body = '' } = parseNotify(notify)
  return toastify.success(<ToastWrapper type='success' title={title} body={body}/>)
}

const error = notify => {
  const { title = '', body = '' } = parseNotify(notify)
  return toastify.error(<ToastWrapper type='error' title={title} body={body} />)
}

const info = notify => {
  const { title = '', body = '' } = parseNotify(notify)
  return toastify.info(<ToastWrapper type='info' title={title} body={body} />)
}

const warning = notify => {
  const { title = '', body = '' } = parseNotify(notify)
  return toastify.warning( <ToastWrapper type='warning' title={title} body={body} />)
}

const toast = {
  success,
  error,
  info,
  warning,
}

export default toast
