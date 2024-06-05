import {StyledTag} from './_styled'

/**
 * @type {TypeAppearance}  = 'default' | 'leaf'
 * @type {TypeType}        = 'danger' | 'important' | 'info' | 'progress' | 'success'
 */
/**
 * @param {appearance}     ?: TypeAppearance      <Tag appearance>
 * @param {defaultChecked} ?: Type                <Tag type>
 */
export const Tag = ({appearance = 'default', type = 'info', ...props}) => {
  return (
    <StyledTag data-appearance={appearance} data-type={type} {...props}>
      {props?.children}
    </StyledTag>
  )
}
