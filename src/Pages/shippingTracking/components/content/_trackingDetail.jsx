import config from 'config'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {fDateTimeSuffix} from 'util/formatTime'
import {EmptySection} from 'common/emptySection'
import {SHIPPING_ICONS} from 'Pages/shippingTracking/_icons'
import {useContext} from 'react'
import {ShippingTrackingContext} from 'Pages/shippingTracking'
import {THEME_COLORS} from 'common/theme/_colors'
import {actions} from '../../_reducer'
import {RightLoading} from './_boxRightLoading'
import styled from 'styled-components'

export const TrackingDetail = ({...props}) => {
  const {pageState, pageDispatch} = useContext(ShippingTrackingContext)
  const {
    dataDisplay,
    dataTracking,
    positionActive,
    prePosition,
    nextposition,
    isRightLoading,
  } = pageState

  const handleChooseItem = key => {
    pageDispatch({
      type: actions.CHANGE_POSITION,
      payload: {
        data: dataDisplay,
        position: key,
      },
    })
  }

  const handleRefreshItem = async billcode => {
    pageDispatch({type: actions.RIGHT_LOADING})

    if (!billcode) return

    const response = await sendRequestAuth(
      'get',
      `${config.API}/tool/shipping/tracking?billcodes=${billcode}`,
    )

    if (response?.status !== 200) return

    const data = response?.data?.data || []

    dataDisplay[positionActive] = data[0]

    pageDispatch({
      type: actions.FETCH_BILLCODE,
      payload: {
        data: dataDisplay,
        position: positionActive,
      },
    })
  }

  return (
    <StyledTrackingDetail {...props}>
      {isRightLoading ? (
        <RightLoading />
      ) : (
        <>
          {dataTracking.length <= 0 ? (
            <EmptySection
              banner={<img src="/img/tools/no-tracking.png" alt="Empty" />}
            >
              Chưa có thông tin hành trình vận đơn.
            </EmptySection>
          ) : (
            <div className={'boxTracking'}>
              <div className="boxTracking__header">
                <div className="boxTracking__header__tracking">
                  <p>Mã vận đơn: </p>
                  <span>{dataTracking.billcode}</span>
                </div>
                <div className="boxTracking__header__actions">
                  <div className="boxTracking__header__action-item">
                    <Button
                      size="sm"
                      appearance={'primary'}
                      icon={SHIPPING_ICONS.refresh}
                      onClick={() => handleRefreshItem(dataTracking.billcode)}
                    >
                      Làm mới hành trình
                    </Button>
                  </div>
                  <div className="boxTracking__header__action-item">
                    <Button
                      size="sm"
                      appearance={'secondary'}
                      icon={SHIPPING_ICONS.arrowLeft}
                      data-disabled={prePosition === false ? 'true' : 'false'}
                      disabled={prePosition === false ? 'disabled' : ''}
                      onClick={() => handleChooseItem(prePosition)}
                    />
                  </div>
                  <div className="boxTracking__header__action-item">
                    <Button
                      size="sm"
                      appearance={'secondary'}
                      icon={SHIPPING_ICONS.arrowRight}
                      data-disabled={nextposition === false ? 'true' : 'false'}
                      disabled={nextposition === false ? 'disabled' : ''}
                      onClick={() => handleChooseItem(nextposition)}
                    />
                  </div>
                </div>
              </div>
              {dataTracking?.detail?.order_id ? (
                <>
                  <div className="boxTracking__table">
                    <div className="row-tab-detail__table">
                      <div className="row-tab-detail__thead">
                        <div className="row-tab-detail__tr">
                          <div className="row-tab-detail__th">
                            Đơn vị vận chuyển
                          </div>
                          <div className="row-tab-detail__th">Người nhận</div>
                          <div className="row-tab-detail__th">Điện thoại</div>
                          <div className="row-tab-detail__th">COD</div>
                          <div className="row-tab-detail__th">Vận phí</div>
                        </div>
                      </div>
                      <div className="row-tab-detail__tbody">
                        <div className="row-tab-detail__tr">
                          <div className="row-tab-detail__td">
                            {dataTracking?.detail?.partner_name ?? '---'}
                          </div>
                          <div className="row-tab-detail__td">
                            <Text
                              as="a"
                              href={
                                dataTracking?.detail?.customer_mobile
                                  ? `/partner-management/customer?keyword=${dataTracking?.detail?.customer_mobile}`
                                  : '#'
                              }
                              target="_blank"
                              color={THEME_COLORS.blue_500}
                              fontWeight={400}
                              style={{cursor: 'pointer'}}
                            >
                              {dataTracking?.detail?.customer_name ?? '---'}
                            </Text>
                          </div>
                          <div className="row-tab-detail__td">
                            {dataTracking?.detail?.customer_mobile ?? '---'}
                          </div>
                          <div className="row-tab-detail__td">
                            {dataTracking?.detail?.cod
                              ? `${dataTracking.detail.cod
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                              : 0}
                            {' ₫'}
                          </div>
                          <div className="row-tab-detail__td">
                            {dataTracking?.detail?.ship_fee
                              ? `${dataTracking.detail.ship_fee
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
                              : 0}
                            {' ₫'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="boxTracking__tracking">
                    <div className="boxTracking__tracking__title">
                      Hành trình vận đơn:
                    </div>
                    <div className="boxTracking__tracking__trackings">
                      {dataTracking?.tracking.length > 0 ? (
                        <div className="row-tab-history__list">
                          {dataTracking?.tracking.map((item, i) => (
                            <div key={i} className="row-tab-history__item">
                              <div
                                className="row-tab-history__bullet"
                                data-active={i == 0 ?? false}
                              >
                                <div></div>
                              </div>
                              <div>
                                <Text
                                  color={THEME_COLORS.secondary_200}
                                  fontSize={14}
                                  fontWeight={400}
                                  lineHeight={20}
                                  style={{
                                    marginBottom: 6,
                                    display: 'block',
                                    'max-height': '40px',
                                    overflow: 'hidden',
                                  }}
                                >
                                  Trạng thái:{' '}
                                  <b>{item?.status_name ?? '---'}</b>
                                  {item.note && (
                                    <div
                                      style={{
                                        marginLeft: '4px',
                                        float: 'right',
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: ' - ' + item.note,
                                      }}
                                    ></div>
                                  )}
                                </Text>
                                <div className="row-tab-history__content">
                                  {SHIPPING_ICONS.clock}{' '}
                                  <Text
                                    color={THEME_COLORS.secondary_100}
                                    fontSize={14}
                                    fontWeight={400}
                                    lineHeight={20}
                                    style={{marginLeft: 8}}
                                  >
                                    {item?.time
                                      ? fDateTimeSuffix(item.time)
                                      : '---'}
                                  </Text>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <EmptySection
                          banner={
                            <img src="/img/tools/no-tracking.png" alt="Empty" />
                          }
                        >
                          Vận đơn chưa có hành trình
                        </EmptySection>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="boxTracking__tracking">
                  <div className="boxTracking__tracking__trackings">
                    <EmptySection
                      banner={
                        <img src="/img/tools/no-tracking.png" alt="Empty" />
                      }
                    >
                      Không tìm thấy vận đơn trên hệ thống EVO
                    </EmptySection>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </StyledTrackingDetail>
  )
}

const StyledTrackingDetail = styled.div`
  height: 100%;

  .boxTracking__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__tracking {
      color: #7c88a6;
      font-size: 16px;
      font-weight: 600;
      padding-top: 10px;
      display: flex;

      p {
        margin: 0 10px 0 0;
      }

      span {
        color: #E5101D;
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__action-item {
      margin: 0 12px 0 0;

      &:last-child {
        margin: 0;
      }

      [data-appearance='secondary'][data-disabled='true'] {
        border-color: #c8cbd4;
        cursor: no-drop;
      }
      [data-appearance='secondary'][data-disabled='true']:hover {
        background: #fff;
      }
      [data-disabled='true'] .button {
        &__container {
          &[data-appearance='secondary'] {
            svg {
              color: #c8cbd4 !important;
              path[stroke] {
                stroke: #c8cbd4 !important;
              }
            }

            &:hover {
              svg {
                color: #4baead;
                path[stroke] {
                  stroke: #4baead;
                }
              }
            }
          }
        }
      }
    }
  }

  .boxTracking__table {
    margin-top: 12px;

    .row-tab-detail {
      &__content {
        position: relative;
        margin-bottom: 24px;
        display: flex;
      }

      &__info-table {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &__table {
        margin-bottom: 12px;
        overflow: hidden;
        border: 1px solid #e2eaf8;
        border-radius: 4px;
      }

      &__thead {
        .row-tab-detail__tr {
          background: #f7f9fd;
        }
      }

      &__tr {
        display: flex;
      }

      &__th {
        min-height: 44px;
        padding: 12px 18px;
        color: ${THEME_COLORS.secondary_100};
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;

        &:nth-child(1) {
          width: 16%;
          min-width: 150px;
        }
        &:nth-child(2) {
          flex: 1;
        }
        &:nth-child(3) {
          width: 13%;
          min-width: 110px;
        }
        &:nth-child(4),
        &:nth-child(5) {
          width: 13%;
          min-width: 110px;
          text-align: right;
        }
      }

      &__td {
        padding: 18px;
        border-top: 1px solid #e2eaf8;
        color: ${THEME_COLORS.secondary_100};
        font-size: 14px;
        font-weight: 400;
        line-height: 19px;

        &:nth-child(1) {
          width: 16%;
          min-width: 150px;
        }
        &:nth-child(2) {
          flex: 1;
          div {
            max-width: 100%;
            max-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        &:nth-child(3) {
          width: 13%;
          min-width: 110px;
        }
        &:nth-child(4),
        &:nth-child(5) {
          width: 13%;
          min-width: 110px;
          text-align: right;
        }
      }
    }
  }

  .boxTracking__tracking {
    margin-top: 24px;

    &__title {
      font-size: 16px;
      line-height: 23px;
      font-weight: 600;
    }

    &__trackings {
      margin: 12px 0;
      height: 420px;
      max-height: 420px;
      overflow: hidden;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #ebeef5;
        border-radius: 60px;
      }

      .row-tab-history {
        &__list {
          position: relative;
          z-index: 0;
        }

        &__item {
          position: relative;
          z-index: 2;
          margin-bottom: 24px;
          display: flex;
          align-items: center;

          &:last-child {
            margin-bottom: 0;
          }

          &:last-child .row-tab-history__bullet {
            &::before {
              width: 0;
              height: 0;
            }
          }
        }

        &__bullet {
          width: 26px;
          height: 26px;
          min-width: 26px;
          min-height: 26px;
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
          border: 2px solid #f8fafd;
          border-radius: 50%;

          &::before {
            position: absolute;
            top: 40px;
            left: 12px;
            z-index: 1;
            width: 1px;
            height: 41px;
            background: #f4f7fc;
            content: '';
          }

          &[data-active='true'] {
            background: #e5101d;
            border: 2px solid #fddcce;
          }

          &[data-active='true']::before {
            background: #e5101d;
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
    }
  }
`
