import {Tooltip as LibTooltip} from '@mui/material'
import {TOOLTIP_PLACEMENTS} from './_constants'

import './index.scss'

export const Tooltip = ({...props}) => {
  const placement = TOOLTIP_PLACEMENTS.includes(props?.placement)
    ? props.placement
    : 'top'

  return (
    <LibTooltip
      {...props}
      arrow
      placement={placement}
      PopperProps={{className: `common-tooltip ${props?.className || ''}`}}
    >
      <span>{props?.children}</span>
    </LibTooltip>
  )
}