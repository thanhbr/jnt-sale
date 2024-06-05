import styled from 'styled-components'

export const Tr = ({extra, type, onClick, ...props}) => {
  return (
    <StyledTr {...props} data-type={type}>
      <div className="tr__container" onClick={onClick}>
        {props?.children}
      </div>
      {extra && <div className="tr__extra">{extra}</div>}
    </StyledTr>
  )
}

const StyledTr = styled.div`
  border-top: 1px solid #e2eaf8;

  &[data-type='tHead'] {
    .tr {
      &__container {
        background: #eff3fb !important;
      }
    }
  }

  &[data-active='true'] {
    .tr {
      &__container {
        background: #e2eaf8 !important;
      }
    }
  }
  &:hover {
    .tr {
      &__container {
        background: #f3f6fc;
      }
    }
  }

  .tr {
    &__container {
      width: 100%;
      display: flex;
      align-items: center;

      background: #fff;

      transition: background 0.25s;
    }
  }
`
