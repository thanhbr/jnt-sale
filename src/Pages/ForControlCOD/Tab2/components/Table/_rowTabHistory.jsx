import { Button } from 'common/button'
import { Text } from 'common/text'
import { THEME_COLORS } from 'common/theme/_colors'
import { Tooltip } from 'common/tooltipv2'
import useRow from 'Pages/ForControlCOD/Tab2/hooks/useRow'
import { ORDER_ICONS } from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'
import { fDateTimeSuffix } from 'util/formatTime'
import {useTranslation} from "react-i18next";

export const RowTabHistory = ({data, ...props}) => {
  const {row, detail} = useRow(data)
  const { t } = useTranslation();
  return (
    <StyledRowTabHistory {...props}>
      {Array.isArray(data?.trackings) && (
        <div className="row-tab-history__list">
          <div className="row-tab-history__header">
            <Text
              as="h4"
              color={THEME_COLORS.secondary_100}
              fontSize={16}
              lineHeight={22}
              style={{marginBottom: 12, display: 'flex', alignItems: 'center'}}
            >
              {t("billcode")}: {data.code}
              {!!data?.code && (
                <Tooltip title={t("copy_billcode_n")}>
                  <i
                    style={{
                      display: 'flex',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }}
                    onClick={row.onCopyOrderCode}
                  >
                    {ORDER_ICONS.copy03_x}
                  </i>
                </Tooltip>
              )}
            </Text>
            <Button
              appearance="primary"
              size="sm"
              icon={ORDER_ICONS.repeat}
              onClick={() => row.refreshOrderDetails(true)}
              className="btn-green"
            >
              {t("refresh_route")}
            </Button>
          </div>
          <Text
            as="h4"
            color={THEME_COLORS.secondary_100}
            fontSize={16}
            lineHeight={22}
            style={{marginBottom: 12, marginTop: 12}}
          >
            {t("shipment_route")}:
          </Text>

          {!data?.trackings.length && (
            <div className="row-tab-history__journey">
              <div className="row-tab-history__journey-no-data">
                <img
                  src={'/img/delivery-manager/Empty state.svg'}
                  alt="Empty state"
                />
                <p>{t("waybill_no_route")}</p>
              </div>
            </div>
          )}

          {data.trackings.map((item, i, arr) => (
            <div
              key={i}
              className="row-tab-history__item"
              style={{visibility: detail.isLoading ? 'hidden' : 'visible'}}
            >
              <div className={`row-tab-history__bullet ${i === (arr.length - 1) ? 'row-tab-history__last-child' : ''}`} data-active={i === 0}>
                <div></div>
              </div>
              <div>
                <Text
                  color={THEME_COLORS.secondary_200}
                  fontSize={14}
                  fontWeight={400}
                  lineHeight={20}
                  style={{marginBottom: 6, display: 'block'}}
                >
                  <div className="row-tab-history__status">
                    {t("status")} <p>{item.status_name}</p>
                    {
                      item.note && (<div style={{marginLeft:'4px'}} dangerouslySetInnerHTML={{ __html: '- '+item.note }}></div>)
                      
                    }
                  </div>
                </Text>
                <div className="row-tab-history__content">
                  <img src={'/svg/clock-fast-forward.svg'} alt='clock-fast-forward' style={{transition: 'unset'}} />
                  <Text
                    color={THEME_COLORS.secondary_100}
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={20}
                    style={{marginLeft: 8}}
                  >
                    {data?.dt_created
                      ? fDateTimeSuffix(item.time)
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
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-transform: unset;
    }

    .btn-green {
      background: #E5101D;
      border-radius: 6px;
    }

    &__item {
      position: relative;
      z-index: 2;

      margin-bottom: 30px;

      display: flex;
      align-items: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__last-child {
      &::before {
        display: none;
      }
    }

    &__bullet {
      width: 26px;
      height: 26px;
      margin-right: 20px;

      display: flex;
      align-items: center;
      justify-content: center;

      &::before {
        position: absolute;
        top: 40px;
        left: 12px;
        z-index: 1;

        width: 2px;
        // height: calc(100% - 46px);
        height: 41px;

        background: #f4f7fc;

        content: '';
      }

      &[data-active='true'] {
        &::before {
          background: #E5101D;
          // border: 2px solid #d8fce7;
        }
      }

      background: linear-gradient(
          0deg,
          rgba(244, 247, 252, 0.98),
          rgba(244, 247, 252, 0.98)
        ),
        #00081d;
      border: 2px solid #fffeee;
      border-radius: 50%;

      &[data-active='true'] {
        background: #E5101D;
        border: 2px solid #d8fce7;
      }

      & > div {
        width: 6px;
        height: 6px;

        background: #fff;
        border-radius: 50%;
      }
    }

    &__status {
      display: flex;
      p {
        font-weight: 600;
        margin-left: 0.2rem;
      }
    }

    &__content {
      display: flex;
      align-items: center;
    }

    &__journey {
    }

    &__journey-no-data {
      display: grid;
      justify-content: center;

      p {
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
        color: #7c88a6;
      }
    }
  }
`
