import {Tooltip as LibTooltip} from '@mui/material'
import {TOOLTIP_PLACEMENTS} from './_constants'

import './index.scss'
import {useEffect, useRef, useState} from 'react'

export const Tooltip = ({baseOn = 'width', ...props}) => {
  const placement = TOOLTIP_PLACEMENTS.includes(props?.placement)
    ? props.placement
    : 'top'
  const [isOverflowed, setIsOverflow] = useState(false)
  const textElementRef = useRef()

  const compareSize = () => {
    switch (baseOn) {
      case 'width':
        setIsOverflow(
          textElementRef.current.scrollWidth >
            textElementRef.current.clientWidth,
        )
        break
      case 'height':
        setIsOverflow(
          textElementRef.current.scrollHeight >
            textElementRef.current.clientHeight,
        )
        break

      default:
        break
    }
  }

  // compare once and add resize listener on "componentDidMount"
  useEffect(() => {
    compareSize()
    window.addEventListener('resize', compareSize)
  }, [])

  // remove resize listener again on "componentWillUnmount"
  useEffect(
    () => () => {
      window.removeEventListener('resize', compareSize)
    },
    [],
  )

  return (
    <LibTooltip
      {...props}
      arrow
      placement={placement}
      PopperProps={{className: 'common-tooltip-v2'}}
      disableHoverListener={!isOverflowed}
    >
      <div ref={textElementRef}>{props?.children}</div>
    </LibTooltip>
  )
}
