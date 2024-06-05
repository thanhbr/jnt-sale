import { ICON_CONVERSATION } from '../../../interface/icon'
import { Text } from '../../../../../../../common/text'
import useFacebookDetailConversation from '../../../hooks/useFacebookDetailConversation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { Tooltip } from '../../../../../../../common/tooltip'
import CreateStickers from '../../modal/index'
import useFacebookConversationTags from '../../../hooks/useFacebookConversationTags'
import { ReportCustomerModal } from './_reportCustomerModal'
import useAlert from 'hook/useAlert'

export const TagCustomer = () => {

  const [isHover, setIsHover] = useState(false)
  const {showAlert} = useAlert()
  const [openBomModal, setOpenBomModal] = useState(false)
  const [tagBom, setTagBom] = useState([])
  const { data, methods } = useFacebookConversationTags()
  const tagsCustomer = data.filter.conversation.tagsCustomer
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    variableWidth: true,
    slidesToScroll: 5,
    autoplay: false,
    arrows: true,
    nextArrow: (
      ICON_CONVERSATION.nextSlideArrow
    ),
    prevArrow: (
      ICON_CONVERSATION.prevSlideArrow
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
    containerSlide.current.addEventListener('wheel', e => {
      scroll(e.deltaY)
    })
    return () => {
      containerSlide.current?.removeEventListener('wheel', scroll, true)
    }
  }, [scroll])
  const showFallBack = () => {
    return tagsCustomer.listOrigin.map((item, index) =>
      <Tooltip title={item.added ? 'Bỏ gán nhãn' : 'Gán nhãn'}>
        <div className={'tags__item'} onClick={() => {
              if(item.is_bom == 1 && item.added == false ) {
                if(data.detail.customerInfor.list.customer_mobile){
                  setTagBom(item)
                  setOpenBomModal(true)
                } else {
                  showAlert({content: 'Vui lòng bổ sung Số điện thoại trước khi thực hiện đánh dấu khách bom hàng', type: 'danger'})
                }
              } else {
                methods.handleTagsAction(item)
              }
            }
          }>
          <Text
            as={'p'}
            color={
              item.added ? '#ffffff' : item.color == '#ffffff' ? '' : item.color
            }
            style={{
              background: item.added ? item.color : '#ffffff',
              borderRadius: '4px', width: 'auto',
              padding: '3px 8px',
              border: item.added ? 'none' : item.color == '#ffffff' ? '#000 1px solid' : `${item.color} 1px solid`,
              overflow: 'hidden',
              height: '24px'
            }}
            fontSize={'12px'} lineHeight={'150%'}>{item.name}</Text>
        </div>
      </Tooltip>
    )
  }
  return (
    <StyledTags>
      {
        tagsCustomer.listOrigin.length > 0 &&
        <div>
          <Tooltip title={'Thêm nhãn khách hàng'}>
            <div className={'tags__add-icon'} onClick={methods.onShowCreateSticker}>
              {ICON_CONVERSATION.plusTag}
            </div>
          </Tooltip>
          <div className={'tags__container'}
               ref={containerSlide}
               onMouseEnter={() => setIsHover(true)}
               onMouseLeave={() => setIsHover(false)}
          >
            <Slider {...settings} ref={sliderRef}>
              {showFallBack()}
            </Slider>
            {openBomModal == true && <ReportCustomerModal data={data.detail.customerInfor.list} openModal={openBomModal} closeModal={()=> setOpenBomModal(false)} tags={tagBom}/>}
          </div>
        </div>
      }
      <CreateStickers/>
    </StyledTags>
  )
}
const StyledTags = styled.div`
  padding: 12px 16px;
  .tags{
    &__container{
      margin-left: 36px;
      cursor: pointer;
    }
    &__add-icon{
      margin-right: 6px;
      position: absolute;
      cursor: pointer;
    }
  }
  
  
  .slick-disabled{
    display: none!important;
  }
  .tags__item{
    padding-right: 6px;
  }
  .slick-next{
    background: #00081D;
    opacity: 0.4;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 60px 0px 0px 60px;
    height: 24px;
    width: 24px;
    right: -16px;
    top: 12px;
  }
  .slick-prev{
    background: #00081D;
    opacity: 0.4;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0px 60px 60px 0px;
    height: 24px;
    width: 24px;
    left: 0;
    top: 12px;
    z-index: 100;
  }
`