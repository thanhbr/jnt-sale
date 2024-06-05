const {StyledActionBtn} = require('./_styled')

const ActionBtn = ({icon, ...props}) => {
  return (
    <StyledActionBtn {...props}>
      {icon && <span className="action-btn__icon">{icon}</span>}
      <span>{props?.children}</span>
    </StyledActionBtn>
  )
}

const FIXED_ACTION_BTN_GROUP_COMPONENTS = {ActionBtn}

export default FIXED_ACTION_BTN_GROUP_COMPONENTS
