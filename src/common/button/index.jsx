import {Tag} from 'common/tag'
import {Link} from 'react-router-dom'
import {StyledButton} from './_styled'

/**
 * @type {TypeAppearance} = 'primary' | 'secondary' | 'ghost'
 * @type {TypeSize}       = 'md' | 'sm'
 */
/**
 * @param {appearance}    ?: TypeAppearance      <Appearances of button>
 * @param {disabled}      ?: boolean             <HTML attribute of <button> tag>
 * @param {href}          ?: string              <url <a> tag>
 * @param {icon}          ?: ReactNode           <Display icon button (SVG only)>
 * @param {size}          ?: TypeSize            <Button Size>
 * @param {onClick}       ?: () => void          <onclick event>
 */
export const Button = ({
  appearance = 'primary', // primary | secondary | ghost
  badge,
  badgeType,
  disabled = false, // boolean
  href,
  icon, // svg only
  iconPosition, // front | back
  size = 'md', // md | md- | sm | xs
  onClick,
  ...props
}) => {
  const badgeData = badge
    ? {
        content: badge,
        type: ['danger', 'important', 'info', 'success'].includes(badgeType)
          ? badgeType
          : 'info',
      }
    : null
  const As = href ? (props?.download || props?.target ? 'a' : Link) : 'button'

  const handleClick = (e, opt) => {
    if (onClick && !disabled) onClick(e, opt)
  }

  return (
    <StyledButton
      {...props}
      as={As}
      to={href || undefined}
      href={href}
      disabled={disabled}
      data-appearance={appearance}
      data-badge={!!badge}
      data-exist-icon={!!icon}
      data-icon-position={iconPosition}
      data-missing-content={!!!props?.children}
      data-size={size}
      onClick={handleClick}
    >
      {icon ? (
        <div
          className="button__container"
          data-appearance={appearance}
          data-disabled={disabled}
        >
          {iconPosition === 'back' ? (
            <>
              {props?.children && <span>{props.children}</span>} {icon}
            </>
          ) : (
            <>
              {icon} {props?.children && <span>{props.children}</span>}
            </>
          )}
        </div>
      ) : (
        props?.children
      )}
      {badgeData && (
        <Tag
          className="button__badge"
          type={badgeData.type}
          data-circle={badgeData.content === true ? true : undefined}
        >
          {badgeData.content === true ? '' : badgeData.content}
        </Tag>
      )}
    </StyledButton>
  )
}
