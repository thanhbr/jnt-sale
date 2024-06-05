import { THEME_COLORS } from 'common/theme/_colors'
import styled from 'styled-components'
import { RowTabDetail } from './_rowTabDetail'
import { Spinner } from 'common/spinner'

export const RowOrderExtra = ({ id, active, data, rowData, ...props }) => {
  return (
    <StyledRowOrderExtra {...props} data-active={active}>
      {active && (
        <div className="row-order-extra__container">
          <div className="row-order-extra__content common-scrollbar">
            {id === data?.id ? (
                <RowTabDetail data={data}/>
            ) : (
              <div className="row-order-extra__loading">
                <Spinner size={48} thickness={4}/>
              </div>
            )}
          </div>
        </div>
      )}
    </StyledRowOrderExtra>
  )
}

const StyledRowOrderExtra = styled.div`
  max-height: 0;

  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    max-height: 75vh;
  }

  .row-order-extra {
    &__container {
      overflow: hidden;
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 4px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #e2eaf8;
      border-radius: 8px 8px 0px 0px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0px 0px;
      }

      &[data-active='true'] {
        background: #fff;
      }
    }

    &__content {
      max-height: 60vh;
      overflow: auto;
      background: #fff;
    }

    &__loading {
      width: 100%;
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
