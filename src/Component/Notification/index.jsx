import React, { useState } from 'react'
import cls from 'clsx'
import css from './index.module.scss'
import { NOTIFICATION_BAR } from '../Icons/index'

function Index (props) {
  const {type = 'success', message} = props
  const [active, setActive] = useState(true)
  return (
    <>
      {active &&
        <div className={`${cls(css[type])} ${cls(css.general)}`}>
          <div className={cls(css.group)}>
            <div className={cls(css.icon)}>
              {NOTIFICATION_BAR.error}
            </div>
            <p>{message}</p>
          </div>
          <div className={cls(css.close)} onClick={() => setActive(false)}>
            {NOTIFICATION_BAR.cancel}
          </div>
        </div>
      }
    </>
  )
}

export default Index