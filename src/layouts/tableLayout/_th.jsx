import {Text} from 'common/text'
import styled from 'styled-components'

export const Th = ({icon, ...props}) => {
  const childrenType = typeof props?.children

  return (
    <StyledTh {...props}>
      {childrenType === 'string' ? (
        <Text as="b">{props?.children}</Text>
      ) : (
        props?.children
      )}

      {icon && (
        <i className="th__icon" data-icon-only={!!!props?.children}>
          {icon}
        </i>
      )}
    </StyledTh>
  )
}

const StyledTh = styled.div`
  height: 100%;
  padding: 12px;

  font-size: 14px;
  line-height: 20px;

  @media screen and (max-width: 1599px) {
    padding: 8px;
  }

  .th {
    &__icon {
      width: 16px;
      height: 16px;
      margin-left: 4px;

      display: inline-block;

      transform: translateY(2px);

      cursor: pointer;

      &[data-icon-only='true'] {
        position: relative;

        width: 16px;
        height: 16px;
        margin-left: 0;

        transform: unset;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;

          transform: translate(-50%, -50%);
        }
      }

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`
