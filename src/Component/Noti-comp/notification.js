import cls from 'clsx'
import css from '../HeaderBar/index.module.scss'
import {Tooltip} from 'common/tooltip'
import {useState} from 'react'

export default function Notification() {
  const [active, setActive] = useState(true)
  return (
    <Tooltip placement="bottom" title={'Tính năng đang phát triển'}>
      {/* <div className={`${cls(css.notification)} ${active && cls(css.active)}`}> */}
      <div style={{height:'24px'}}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.35395 21C10.0591 21.6224 10.9853 22 11.9998 22C13.0142 22 13.9405 21.6224 14.6456 21M17.9998 8C17.9998 6.4087 17.3676 4.88258 16.2424 3.75736C15.1172 2.63214 13.5911 2 11.9998 2C10.4085 2 8.88235 2.63214 7.75713 3.75736C6.63192 4.88258 5.99977 6.4087 5.99977 8C5.99977 11.0902 5.22024 13.206 4.34944 14.6054C3.6149 15.7859 3.24763 16.3761 3.2611 16.5408C3.27601 16.7231 3.31463 16.7926 3.46155 16.9016C3.59423 17 4.19237 17 5.38863 17H18.6109C19.8072 17 20.4053 17 20.538 16.9016C20.6849 16.7926 20.7235 16.7231 20.7384 16.5408C20.7519 16.3761 20.3846 15.7859 19.6501 14.6054C18.7793 13.206 17.9998 11.0902 17.9998 8Z"
            stroke="#56697C"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* <div className={cls(css.count)}>
          <label>1</label>
          <span></span>
        </div> */}
      </div>
    </Tooltip>
  )
}
