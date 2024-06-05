import {Tooltip as LibTooltip} from '@mui/material'
import {TOOLTIP_ERROR_PLACEMENTS} from './_constants'

import './index.scss'

export const TooltipError = ({arrow=true,...props}) => {
  const placement = TOOLTIP_ERROR_PLACEMENTS.includes(props?.placement)
    ? props.placement
    : 'top'

  return (
    <LibTooltip
      {...props}
      arrow={arrow}
      placement={placement}
      PopperProps={{
        ...props?.PopperProps,
        className: `common-tooltip-error ${props?.className || ''}`,
      }}
    >
      <span>{props?.children}</span>
    </LibTooltip>
  )
}
