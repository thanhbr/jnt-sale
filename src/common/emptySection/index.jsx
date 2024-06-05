import {StyledEmptySection} from './_styled'

export const EmptySection = ({banner, ...props}) => {
  return (
    <StyledEmptySection {...props}>
      {banner && <div className="empty-section__banner">{banner}</div>}
      {props?.children && (
        <div className="empty-section__text">{props.children}</div>
      )}
    </StyledEmptySection>
  )
}
