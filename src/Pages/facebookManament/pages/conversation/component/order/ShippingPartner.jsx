import {Text} from 'common/text'
import styled from 'styled-components'
import Slider from 'react-slick'
import {ICON_CONVERSATION} from '../../interface/icon'
import {Popover} from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useFacebookOrderShippingInfo from '../../hooks/useFacebookOrderShippingInfo'
import {Tooltip} from '../../../../../../common/tooltip'
import {formatMoney} from '../../../../../../util/functionUtil'
import {ORDER_SINGLE_ICONS} from '../../../../../orderSingle/interface/_icons'
import './popperOver.scss'
import {Spinner} from "../../../../../../common/spinner";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  variableWidth: true,
  slidesToScroll: 3,
  autoplay: false,
  arrows: true,
  nextArrow: ICON_CONVERSATION.nextSlideArrow,
  prevArrow: ICON_CONVERSATION.prevSlideArrow,
}

export const ShippingPartner = ({...props}) => {
  const {shippingInfo, methods} = useFacebookOrderShippingInfo()
  const {shippingPartner} = shippingInfo
  const sliderRef = useRef()
  const containerSlide = useRef()
  const scroll = useCallback(
    y => {
      if (y > 0) {
        return sliderRef?.current?.slickNext() /// ? <- using description below
      } else {
        return sliderRef?.current?.slickPrev()
      }
    },
    [sliderRef]
  )
  useEffect(() => {
    containerSlide.current.addEventListener('wheel', e => {
      scroll(e.deltaY)
      e.preventDefault()
    })
    return () => {
      containerSlide.current?.removeEventListener('wheel', scroll, true)
    }
  }, [scroll])

  return (
    <Container {...props}>
      <Text as="h5">Đơn vị vận chuyển</Text>
      <Text as="p" color="#7C88A6" style={{marginTop: 4, marginBottom: 16}}>
        Tùy thuộc vào gói cước bạn đã thỏa thuận với đối tác vận chuyển, phí vận
        chuyển dự kiến có thể thay đổi.
      </Text>
      <div className="shipping-partner__scroll-view" ref={containerSlide}>
        <Slider {...settings} ref={sliderRef}>
          {shippingPartner.list.map(item => {
            if (item.id != 5)
              return (
                <Item
                  key={item?.id}
                  data={item}
                  active={item?.id === shippingPartner.id}
                  onClick={() => methods?.onShippingPartSelect(item.id)}
                  services={shippingPartner.service}
                />
              )
          })}
        </Slider>
      </div>
    </Container>
  )
}

const Item = ({data, services, active, ...props}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const {loading, methods} = useFacebookOrderShippingInfo()
  const handleClick = target => {
    setAnchorEl(target)
  }

  const handleClose = e => {
    setAnchorEl(null)
    e.stopPropagation()
  }

  const open = Boolean(anchorEl)
  const id = open ? data?.value : undefined

  return (
    <div {...props} className={`shipping-partner__item ${props?.className}`}>
      <div className="shipping-partner__radio">
        {active ? (
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="-24" width="54" height="54" rx="27" fill="#1E9A98"/>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.7931 10.1711C22.0497 10.4174 22.0705 10.839 21.8396 11.1126L16.2146 17.7793C16.096 17.9198 15.9272 18 15.75 18C15.5728 18 15.404 17.9198 15.2854 17.7793L12.1604 14.0756C11.9295 13.8019 11.9503 13.3804 12.2069 13.1341C12.4635 12.8878 12.8587 12.91 13.0896 13.1837L15.75 16.3368L20.9104 10.2207C21.1413 9.94702 21.5365 9.92484 21.7931 10.1711Z"
              fill="white"
              stroke="white"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="-24" width="54" height="54" rx="27" fill="#EBEEF5"/>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.7931 10.1711C22.0497 10.4174 22.0705 10.839 21.8396 11.1126L16.2146 17.7793C16.096 17.9198 15.9272 18 15.75 18C15.5728 18 15.404 17.9198 15.2854 17.7793L12.1604 14.0756C11.9295 13.8019 11.9503 13.3804 12.2069 13.1341C12.4635 12.8878 12.8587 12.91 13.0896 13.1837L15.75 16.3368L20.9104 10.2207C21.1413 9.94702 21.5365 9.92484 21.7931 10.1711Z"
              fill="#7C88A6"
              fillOpacity="0.2"
            />
          </svg>
        )}
      </div>
      <div className="shipping-partner__logo">
        <img
          src={`/img/fb/collections/logo-shipping-partner-${data?.id}.png`}
          alt=""
        />
      </div>
      <div className="shipping-partner__fee">
        <Text fontSize={13} lineHeight={17} style={{textAlign: 'center', display: 'flex', alignItems: 'center'}}>
          <Text color="#7C88A6" fontSize={10}>{'Phí dự kiến: '} &nbsp;</Text>
          {!!loading
            ?
            <Spinner size={12} thickness={5}/>
            : <span style={{fontWeight:600}}>
              {data?.fee
                ? formatMoney(data?.fee)
                : data?.fee == 0
                  ? '0 ₫'
                  : 'N/A'}
              {data?.fee == 0 && (
                <Tooltip
                  title={
                    'Phí vận chuyển dự kiến bằng 0 có thể do hệ thống tính phí của đơn vị vận chuyển đang hoạt động chưa chính xác, hãy cân nhắc kỹ trước khi chọn đơn vị này.'
                  }
                >
                  <Text style={{marginLeft: '4px'}}>
                    {ORDER_SINGLE_ICONS.warning}
                  </Text>
                </Tooltip>
              )}
            </span>
          }
        </Text>
        <div
          className={
            'shipping-partner-services shipping-partner-basic-container__right-item'
          }
          // onClick={() => {
          //   if (!data?.services) {
          //     methods.onShippingPartSelect(data.id)
          //   }
          // }}
        >
          {data?.services?.length > 1 ? (
            <div style={{display: 'flex'}}
                 onClick={e => {
                   e.stopPropagation()
                   handleClick(e.currentTarget)
                 }}>
              <Text
                as={'span'}
                color={'#1A94FF'}
                style={{display: 'flex', alignItems: 'center'}}
                className={'title-service'}
              >
                {(!!services &&
                  services.find(item => item.partnerId == data.id)
                    ?.name) ||
                data?.services[0]?.name}{' '}
              </Text>
              {ORDER_SINGLE_ICONS.serviceDown}
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <ul
                  className="order-popover__selected-action-menu"
                  style={{width: 'auto', padding: '16px 16px 0'}}
                >
                  {data?.services.map((item, index) => (
                    <li
                      className="facebook-order-popover__selected-action-menu-item"
                      onClick={(e) => {
                        handleClose(e)
                        methods.handleSetServices(item, {
                          partnerId: data.id,
                        })
                      }}
                      key={index}
                      style={{
                        marginBottom: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      {/*<Tooltip*/}
                      {/*  title={item.name}*/}
                      {/*  placement="top-center"*/}
                      {/*  baseOn="height"*/}
                      {/*  className="tooltipv2"*/}
                      {/*>*/}
                        <Text className="tooltipv2-text">
                          {item.name}
                        </Text>
                      {/*</Tooltip>*/}
                    </li>
                  ))}
                </ul>
              </Popover>
            </div>
          ) : data?.services?.length == 1 ? (
            <Text>{data?.services[0]?.name}</Text>
          ) : (
            <Text fontSize={13}>Gói tiêu chuẩn</Text>
          )}
        </div>
      </div>
    </div>
  )
}

const Container = styled.div`
  padding: 16px;

  background: #f3f6fc;
  border-radius: 6px;
  
  .title-service{
      width: 90%!important;
      -webkit-box-orient: vertical!important;
      -webkit-line-clamp: 1;
      display: -webkit-box!important;
      overflow: hidden!important;
      text-overflow: ellipsis!important;
  }
  .shipping-partner {
    &__item {
      position: relative;

      height: 92px;
      margin-top: 27px;
      padding: 40px 10px 12px 10px;

      background: #fff;
      border-radius: 6px;

      cursor: pointer;
    }

    &__radio {
      position: absolute;
      top: 0;
      right: 3px;

      width: 27px;
      height: 27px;
      svg{
        border-top-right-radius: 6px;
      }
    }

    &__logo {
      position: absolute;
      top: 0;
      left: 50%;

      width: 54px;
      height: 54px;

      transform: translate(-50%, -50%);
            
      border: 3px solid #FFFFFF;
      border-radius: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__fee {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .slick-disabled{
    display: none!important;
  }

  .slick-slide {
    width: 166px;

    margin-right: 16px;
  }

  .slick-track {
    overflow-y: unset;
  }

  .slick-next {
    background: #00081d;
    opacity: 0.4;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 60px 0px 0px 60px;
    height: 24px;
    width: 24px;
    right: 0;
    transform: translateY(0px);
  }
  .slick-prev {
    background: #00081d;
    opacity: 0.4;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0px 60px 60px 0px;
    height: 24px;
    width: 24px;
    left: 0;
    z-index: 100;
    transform: translateY(0px);
  }
  .tooltipv2-text{
    :hover{
      cursor: pointer;
      color: rgb(30, 154, 152)!important;
    }
  }
`
