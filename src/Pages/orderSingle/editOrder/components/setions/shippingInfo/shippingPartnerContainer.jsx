import { Radio } from 'common/form/radio'
import { Text } from 'common/text'
import styled from 'styled-components'
import React, { useContext } from 'react'
import { OrderSingleContext } from '../../../../provider/_context'
import { ORDER_SINGLE_ICONS } from '../../../../interface/_icons'
import useOrderSingleShippingInfo from '../../../../hooks/useOrderSingleShippingInfo'
import { OptionJnt } from './option/_optionJnt'
import { OptionGhtk } from './option/_optionGhtk'
import { OptionGhn } from './option/_optionGhn'
import { OptionViettel } from './option/_optionViettel'
import { OptionVnpost } from './option/_optionVnPost'
import { Button } from '../../../../../../common/button'
import { OptionSuperShip } from './option/_optionSuperShip'
import { formatMoney } from '../../../../../../util/functionUtil'
import { Popper } from '../../../../../../common/popper'
import { Tooltip } from '../../../../../../common/tooltipv2'
import { Tooltip as TooltipV1 } from '../../../../../../common/tooltip'
import Jnt from './option/img/jnt.png'
import Ghtk from './option/img/ghtk.png'
import Ghn from './option/img/ghn.png'
import Viettel from './option/img/viettel.png'
import Supership from './option/img/SuperShip.png'
import Vnpost from './option/img/vnpost.png'
import { ShippingPartnerSkeleton } from '../../../../components/skelenton/shippingPartner'

export const shippingInfoContainer = ({ ...props }) => {
  const { state } = useContext(OrderSingleContext)
  let partner = state.form.shippingInfo.shippingPartner.list
  if(state.shipping_status.value === '1') {
    partner = [partner.find(item => +item.id === 1)]
  }

  return (
    <StyledInventoryContainer {...props}>
      <div className="order-single-shipping-partner-container__radio-list">
        {(state.form.shippingInfo.shippingPartner?.list?.length === 0 && !state.skeleton) ? '' :
          <div className={'order-single-shipping-partner-container__title'}>
            Đơn vị vận chuyển
          </div>
        }

        <div className={'order-single-shipping-partner-container__radio-item'}>
          {state.skeleton ? (
              <ShippingPartnerSkeleton rows={5}/>
            ) :
            (partner?.length > 0 && !!partner?.find(item => item?.connected)) ? (
                partner?.map((item, index) => {
                  if (+item?.id !== 5)
                    return (
                      <ShippingPartnerItem
                        key={item?.id}
                        partner={item}
                        position={index}
                        isLast={index + 1 >= partner?.length}
                      />
                    )
                })
              ) :
              (
                <EmptyShippingPartner/>
              )}
        </div>
      </div>
    </StyledInventoryContainer>
  )
}

const ShippingPartnerItem = ({ partner, ...props }) => {
  const { methods } = useOrderSingleShippingInfo()
  const { state } = useContext(OrderSingleContext)
  const shippingPartner = state.form.shippingInfo.shippingPartner
  const services = state.form.shippingInfo.shippingPartner.service
  return (
    <StyledBasicItem>
      <div
        className={
          +shippingPartner.selected === +partner?.id
            ? 'shipping-partner-item-container active'
            : 'shipping-partner-item-container'
        }
        // style={{maxHeight: '303px'}}
      >
        <div className={'shipping-partner-basic-container'}>
          <div className={'shipping-partner-basic-container__left'}>
            <div
              onClick={e => {
                e.stopPropagation()
                methods.onShippingPartSelect(partner.id)
              }}
            >
              {!!!(shippingPartner.selected) && methods.onShippingPartSelect(partner.id)}
              <Radio
                checked={(+shippingPartner.selected === +partner?.id) || !!!(shippingPartner.selected)}
                name="partner-info"
                value={partner?.id}
                style={{ transform: 'translateY(2px)' }}
                className={
                  'shipping-partner-basic-container__left__partner-info'
                }
              />
            </div>
            <div
              className={'shipping-partner-basic-container__left__partner-logo'}
            >
              {+partner.id === 1 && <img src={Jnt} alt={partner.name}/>}
              {+partner.id === 2 && <img src={Ghtk} alt={partner.name}/>}
              {+partner.id === 3 && <img src={Ghn} alt={partner.name}/>}
              {+partner.id === 4 && <img src={Viettel} alt={partner.name}/>}
              {+partner.id === 5 && <img src={Supership} alt={partner.name}/>}
              {+partner.id === 6 && <img src={Vnpost} alt={partner.name}/>}
            </div>
          </div>
          <div className={'shipping-partner-basic-container__right'}>
            <div
              className={'shipping-partner-basic-container__right-item'}
              onClick={() => {
                methods.onShippingPartSelect(partner.id)
              }}
            >
              <p
                className={'shipping-partner-basic-container__right-item-title'}
              >
                {partner.name}
              </p>
              <p
                className={'shipping-partner-basic-container__right-item-desc'}
              >
                {partner?.time || 'Giao hàng 2-3 ngày'}
              </p>
            </div>
            <div
              className={'shipping-partner-basic-container__right-item'}
              onClick={() => {
                methods.onShippingPartSelect(partner.id)
              }}
            >
              <p
                className={'shipping-partner-basic-container__right-item-title'}
              >
                {partner?.fee
                  ? formatMoney(partner?.fee)
                  : +partner?.fee === 0
                    ? '0 ₫'
                    : 'N/A'}
                {
                  +partner?.fee === 0 &&
                  <TooltipV1
                    title={'Phí vận chuyển dự kiến bằng 0 có thể do hệ thống tính phí của đơn vị vận chuyển đang hoạt động chưa chính xác, hãy cân nhắc kỹ trước khi chọn đơn vị này.'}
                  >
                    <Text style={{ marginLeft: '4px' }}>{ORDER_SINGLE_ICONS.warning}</Text>
                  </TooltipV1>
                }
              </p>
              <p
                className={'shipping-partner-basic-container__right-item-desc'}
              >
                Phí dự kiến
              </p>
            </div>
            <div
              className={'shipping-partner-services shipping-partner-basic-container__right-item'}
              onClick={() => {
                if (!partner?.services) {
                  methods.onShippingPartSelect(partner.id)
                }
              }}
            >
              {partner?.services?.length > 1 ? (
                <div onClick={() => {
                }}>
                  <Popper
                    placement="bottom-start"
                    renderPopper={({ onClose }) => (
                      <ul
                        className="order-popover__selected-action-menu"
                        style={{ width: '288px' }}
                      >
                        {partner?.services.map((item, index) => (
                          <li
                            className="order-popover__selected-action-menu-item"
                            onClick={() => {
                              onClose()
                              methods.handleSetServices(item, {
                                partnerId: partner.id,
                              })
                            }}
                            key={index}
                          >
                            <Tooltip
                              title={item.name}
                              placement="top-center"
                              baseOn="height"
                              className="tooltipv2"
                            >
                              <Text className="tooltipv2-text">{item.name}</Text>
                            </Tooltip>
                          </li>
                        ))}
                      </ul>
                    )}
                  >
                    <Text
                      as={'p'}
                      color={'#1A94FF'}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      {(!!services &&
                        services.find(item => +item.partnerId === +partner.id)
                          ?.name) ||
                      partner?.services[0]?.name}{' '}
                      {ORDER_SINGLE_ICONS.serviceDown}
                    </Text>
                  </Popper>
                </div>
              ) : partner?.services?.length === 1 ? (
                <Text>{partner?.services[0]?.name}</Text>
              ) : (
                <Text>Gói tiêu chuẩn</Text>
              )}
              <div
                className={
                  state.collapseStatus.includes(partner.id) ? 'collapse-btn active' : 'collapse-btn'
                }
                onClick={e => {
                  e.stopPropagation()
                  methods.onSetCollapseStatus(partner.id)
                }}
              >
                {ORDER_SINGLE_ICONS.chevron}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            state.collapseStatus.includes(partner.id)
              ? 'shipping-partner-option-container show'
              : 'shipping-partner-option-container'
          }
        >
          <div className={'shipping-partner-basic-container__left'}>&nbsp;</div>
          <div className={'shipping-partner-collapse-container'}>
            {+partner.id === 1 && (
              <OptionJnt partner={partner} position={props?.position}/>
            )}
            {+partner.id === 2 && (
              <OptionGhtk
                partner={partner}
                position={props?.position}
                isLast={props?.isLast}
              />
            )}
            {+partner.id === 3 && (
              <OptionGhn partner={partner} position={props?.position}/>
            )}
            {+partner.id === 4 && (
              <OptionViettel partner={partner} position={props?.position}/>
            )}
            {+partner.id === 5 && (
              <OptionSuperShip partner={partner} position={props?.position}/>
            )}
            {+partner.id === 6 && (
              <OptionVnpost partner={partner} position={props?.position}/>
            )}
            {+partner.id === 7 && (
              <OptionVnpost partner={partner} position={props?.position}/>
            )}
            {+partner.id === 8 && (
              <OptionVnpost partner={partner} position={props?.position}/>
            )}
            {+partner.id === 9 && (
              <OptionVnpost partner={partner} position={props?.position}/>
            )}
            {+partner.id === 10 && (
              <OptionVnpost partner={partner} position={props?.position}/>
            )}
            {+partner.id === 11 && (
              <OptionVnpost partner={partner} position={props?.position}/>
            )}
          </div>
        </div>
      </div>
    </StyledBasicItem>
  )
}

const EmptyShippingPartner = () => {
  const { state } = useContext(OrderSingleContext)
  return (
    <StyledEmptyShipping>
      <div className={'shipping-partner-empty-container'}>
        <div className="shipping-partner-empty-container__img">
          {ORDER_SINGLE_ICONS.emptyShipping}
        </div>
        <div className="shipping-partner-empty-container__title">
          <Text color={state.validate?.shippingPartner || '#00081D'}>
            Bạn chưa kết nối với đơn vị vận chuyển nào, hãy thực hiện kết nối để
            nhập thông tin giao hàng.
          </Text>
        </div>
        <div className="shipping-partner-empty-container__btn">
          <Button
            appearance="secondary"
            href={'/shipping/shipping-partners'}
            target={'_plank'}
            iconPosition={'front'}
            icon={ORDER_SINGLE_ICONS.plus}
            size={'sm'}
          >
            Kết nối đơn vị vận chuyển
          </Button>
        </div>
      </div>
    </StyledEmptyShipping>
  )
}

const StyledInventoryContainer = styled.div`
  .order-single-shipping-partner-container {
    &__title {
      display: flex;
      font-weight: 600;
      font-size: 15px;
      line-height: 140%;
      color: #00081d;
      margin-bottom: 16px;
      justify-content: space-between;
      align-items: center;
      &-reload {
        :hover {
          cursor: pointer;
        }
        display: flex;
        align-items: center;
        svg {
          margin-right: 8px;
        }
      }
    }
    &__manual,
    &__auto {
      margin-bottom: 24px;
    }
    &__radio-item {
      margin-bottom: 16px;
    }
  }
  .shipping-partner-services {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 6px;
  }
`

const StyledBasicItem = styled.div`
  .shipping-partner-item-container {
    :hover {
      cursor: pointer;
    }
    background: #f6fafe;
    border: 1px solid #f0f5ff;
    border-radius: 8px;
    margin-bottom: 4px;
    .shipping-partner-collapse-container {
      width: 90%;
    }
    .shipping-partner-basic-container {
      display: flex;
      align-items: center;
      padding: 12px 0;
      &__right {
        display: flex;
        width: 90%;
        &-item {
          .collapse-btn {
            :hover {
              cursor: pointer;
            }
          }
          width: 33.3%;
          position: relative;
          &-title {
            font-weight: 600;
            font-size: 14px;
            line-height: 140%;
            color: #00081d;
            display: flex;
            align-items: center;
          }
          &-desc {
            font-weight: 400;
            font-size: 12px;
            line-height: 140%;
            color: #7c88a6;
          }
        }
      }
      &__left {
        display: flex;
        width: 10%;
        align-items: center;
        &__partner-info {
          margin: 0 12px 0 8px;
        }
        &__partner-logo {
          width: 40px;
          height: 40px;
          img {
            max-width: 100%;
          }
          margin-right: 12px;
        }
      }
    }
    .shipping-partner-option-container {
      transition: transform 290ms cubic-bezier(0, 1, 0, 1),
        fill 290ms cubic-bezier(0.4, 0, 0.2, 1);
      display: none;
      margin-top: 4px;
      margin-bottom: 28px;
    }
    .shipping-partner-option-container.show {
      transition: transform 290ms cubic-bezier(0, 1, 0, 1),
        fill 290ms cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
    }
  }

  .shipping-partner-item-container.active {
    background: #ffffff;
    border: 1px solid #1e9a98;
    border-radius: 8px;
  }
  .shipping-partner-basic-container {
    &__right-item .collapse-btn.active {
      svg {
        transition: transform 290ms cubic-bezier(0, 1, 0, 1),
          fill 290ms cubic-bezier(0.4, 0, 0.2, 1);
        transform: rotateZ(-179.99deg);
      }
    }
  }
  .order-popover__selected-action-menu-item {
    margin-bottom: 16px;
    :hover {
      cursor: pointer;
      .tooltipv2-text {
        color: rgb(229, 16, 29) !important;
      }
    }
    :last-child {
      margin-bottom: 4px;
    }
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const StyledEmptyShipping = styled.div`
  .shipping-partner-empty-container {
    text-align: center;
    &__img {
      margin-bottom: 16px;
    }
    &__title {
      margin-bottom: 16px;
    }
    &__btn {
      margin-bottom: 16px;
    }
  }
`
