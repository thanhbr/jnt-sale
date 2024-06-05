import {useState} from 'react'
import {StyledPopper} from './_styled'

const placementList = [
  'top-start',
  'top',
  'top-end',
  'right-start',
  'right',
  'right-end',
  'bottom-end',
  'bottom',
  'bottom-start',
  'left-end',
  'left',
  'left-start',
]

export const Popper = ({
  disabled,
  placement = 'bottom-start', // top-start | top | top-end | right-start | right | right-end | bottom-end | bottom | bottom-start | left-end | left | left-start
  renderPopper,
  renderToggle,
  children,
  popperProps,
  toggleProps,
  ...props
}) => {
  const checkPlacement = placementList.includes(placement)
    ? placement
    : 'bottom-start'

  const [shouldOpenPopper, setShouldOpenPopper] = useState(false)

  if (!renderToggle && !children) return

  return (
    <StyledPopper {...props}>
      <span
        {...toggleProps}
        className={`popper__toggle ${toggleProps?.className || ''}`}
        onClick={() => !disabled && setShouldOpenPopper(true)}
      >
        {renderToggle ? renderToggle({open: shouldOpenPopper}) : (shouldOpenPopper ? <div className={'show-toggle'}>{children}</div> : children)}
      </span>
      {shouldOpenPopper && (
        <>
          <div
            className="popper__backdrop"
            onClick={() => setShouldOpenPopper(false)}
          ></div>
          <div
            {...popperProps}
            className={`popper__container ${popperProps?.className || ''}`}
            data-placement={checkPlacement}
            onClick={e => {
              e.stopPropagation()
              if (popperProps?.onClick) popperProps.onClick()
            }}
          >
            {renderPopper({onClose: () => setShouldOpenPopper(false)})}
          </div>
        </>
      )}
    </StyledPopper>
  )
}
