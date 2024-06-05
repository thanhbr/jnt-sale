import {Text} from 'common/text'
import {MODAL_ICONS} from './_icons'
import {StyledModal} from './_styled'

export const Modal = ({
  actions = [],
  closeIcon,
  description,
  title,
  width = 600,
  onClose,
  containerProps,
  ...props
}) => {
  return (
    <StyledModal onClick={onClose} {...props}>
      <div
        className="modal__container"
        style={{width}}
        onClick={e => e.stopPropagation()}
        {...containerProps}
      >
        {closeIcon && (
          <i className="modal__close" onClick={onClose}>
            {MODAL_ICONS.x}
          </i>
        )}
        {[!!description, !!title].includes(true) && (
          <div className="modal__header">
            {title && (
              <Text as="h2" fontSize={20} lineHeight={28}>
                {title}
              </Text>
            )}
            {description && (
              <Text as="p" color="#7C88A6" style={{marginTop: 8}}>
                {description}
              </Text>
            )}
          </div>
        )}
        <div className="modal__body">{props?.children}</div>
        {actions.length > 0 && (
          <div className="modal__footer">{actions.map(item => item)}</div>
        )}
      </div>
    </StyledModal>
  )
}
