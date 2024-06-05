import styled from 'styled-components'

export const Td = ({...props}) => {
  return <StyledTd {...props}>{props?.children}</StyledTd>
}

const StyledTd = styled.div`
  height: 100%;
  min-height: 66px;
  padding: 12px;

  display: flex;
  align-items: center;

  font-size: 14px;
  line-height: 20px;

  @media screen and (max-width: 1599px) {
    padding: 8px;
  }

  .common-ellipsis {
    max-width: 100%;

    overflow: hidden;
    white-space: nowrap;

    text-overflow: ellipsis;

    cursor: pointer;

    &.--multiple {
      display: -webkit-box;

      white-space: unset;

      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`
