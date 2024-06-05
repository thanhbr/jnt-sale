import useFacebookOrders from '../../hooks/useFacebookOrders'

import styled from 'styled-components'
import {ICON_CONVERSATION, ICON_FILTER} from "../../interface/icon";
import { useNavigate } from 'react-router-dom'
import {Tooltip} from "../../../../../../common/tooltip";
import React, {useCallback, useEffect, useRef} from "react";
import Slider from 'react-slick'
export const ListPage = () => {

  const {page,methods} = useFacebookOrders()
  const nav = useNavigate()
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        arrows: true,
        nextArrow: (
            ICON_CONVERSATION.downSlideArrow
        ),
        prevArrow: (
            ICON_CONVERSATION.upSlideArrow
        ),
    }

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
        containerSlide.current.addEventListener("wheel", e => {
            scroll(e.deltaY);
        });
        return () => {
            containerSlide.current?.removeEventListener("wheel", scroll, true);
        };
    }, [scroll]);

    const showFallBack = () => {
        return page?.list.map((item, key) =>
            <Tooltip title={item.page_name} placement={'right'}>
                <div className={'list-page__item'} data-active={page?.active.length == 1 && page?.active.includes(item.page_id)} onClick={() => methods.handlePageChange(item.page_id)}>
                    <div key={key} className={'list-page__avatar'}>
                        <img src={item?.page_avatar} alt={item.page_name}/>
                    </div>
                    {page?.active.includes(item.page_id) ? ICON_FILTER.checkActive : ICON_FILTER.checkDisable}
                </div>
            </Tooltip>
        )
    }
  return (
    <Styled>
      <div className={'list-page'} ref={containerSlide}>
          {
              page?.list?.length > 6
                  ?
                  <Slider {...settings} ref={sliderRef}>
                      {showFallBack()}
                  </Slider>
                  : page?.list?.length > 0 &&
                  showFallBack()
          }
          <Tooltip title={'Thêm trang kết nối'} placement={'right'}>
              <div style={{ cursor: 'pointer' }} onClick={() => nav('/facebook')}>{ICON_CONVERSATION.addPage}</div>
          </Tooltip>
      </div>
    </Styled>
  )
}

const Styled = styled.div`
  position: absolute;
  bottom: 16px;
  width: 100%;
   top: 19px;
  .slick-slide{
    display: flex;
    justify-content: center;
  }
  .slick-disabled{
    display: none!important;
  }
  .slick-next{
    top: inherit;
    left: 0;
    bottom: -26px;
    width: 100%;
    z-index: 2;
  }
  .slick-prev{
    top: -10px!important;
    left: 0;
    width: 100%;
    z-index: 2;
  }
  .slick-slider{
    margin-bottom: 24px;
  }
  .list-page{
    padding: 0 10px;
    &__item{
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
      cursor: pointer;
      position: relative;
      svg{
        position: absolute;
        bottom: -4px;
      }
      &[data-active='true']{
        cursor: context-menu;
      }
    }
    &__avatar{
      width: 36px;
      height: 36px;
      background: #0f131a;
      border-radius: 50%;
      overflow: hidden;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`