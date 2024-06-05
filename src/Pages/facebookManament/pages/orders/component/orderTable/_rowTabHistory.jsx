import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'
import {fDateTimeSuffix} from 'util/formatTime'

export const RowTabHistory = ({data, ...props}) => {
  return (
    <StyledRowTabHistory {...props}>
      {Array.isArray(data?.order_logs) && (
        <div className="row-tab-history__list">
          {data.order_logs.map((item, i) => (
            <div
              key={i}
              className="row-tab-history__item"
              data-only={data.order_logs.length <= 1 ? true : undefined}
            >
              <div className="row-tab-history__bullet" data-active={i === 0}>
                <div></div>
              </div>
              <div>
                <Text
                  color={THEME_COLORS.secondary_200}
                  style={{marginBottom: 6, display: 'block'}}
                >
                  {item.user_name} <b>{item.type}</b>{item.type_code === 'Copy' && <b> - {item.order_id}</b>}
                </Text>
                <div className="row-tab-history__content">
                  {ORDER_ICONS.clockFastForward}{' '}
                  <Text style={{marginLeft: 8}}>
                    {item?.dt_created
                      ? fDateTimeSuffix(item.dt_created)
                      : '---'}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </StyledRowTabHistory>
  )
}

const StyledRowTabHistory = styled.div`
  .row-tab-history {
    &__list {
      position: relative;
      z-index: 0;

      &::before {
        position: absolute;
        top: 23px;
        left: 10px;
        z-index: 1;

        width: 1px;
        height: calc(100% - 46px);

        background: #f4f7fc;

        content: '';
      }
    }

    &__item {
      position: relative;
      z-index: 2;

      margin-bottom: 30px;

      display: flex;
      align-items: center;

      &::before {
        position: absolute;
        top: 50%;
        left: -8px;
        z-index: 2;

        width: 36px;
        height: 36px;

        background: #fff;
        border-radius: 50%;

        content: '';

        transform: translate(0, -50%);
      }

      &:first-child {
        &::after {
          position: absolute;
          top: 50%;
          left: 10px;
          z-index: 1;

          width: 1px;
          height: 66px;

          background: ${THEME_COLORS.primary_300};

          content: '';
        }

        &[data-only='true'] {
          &:after {
            display: none;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__bullet {
      position: relative;
      z-index: 2;

      width: 20px;
      height: 20px;
      margin-right: 20px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: linear-gradient(
          0deg,
          rgba(244, 247, 252, 0.98),
          rgba(244, 247, 252, 0.98)
        ),
        #00081d;
      border: 2px solid #fffeee;
      border-radius: 50%;

      &[data-active='true'] {
        background: #1e9a98;
        border: 2px solid #d8fce7;
      }

      & > div {
        width: 6px;
        height: 6px;

        background: #fff;
        border-radius: 50%;
      }
    }

    &__content {
      display: flex;
      align-items: center;
    }
  }
`
