import { ICON_FILTER } from '../../../interface/icon'
import { Tooltip } from '../../../../../../../common/tooltip'
import React, { useEffect, useRef, useState } from 'react'
import { Text } from '../../../../../../../common/text'
import styled from 'styled-components'
import { Radio } from '../../../../../../../common/form/radio'
import { Button } from '../../../../../../../common/button'
import useFilterFacebookLiveStreamDetail from '../../../hooks/useFilterFacebookLiveStreamDetail'

export const OrderStatus = ({ ...props }) => {
  const { data, methods } = useFilterFacebookLiveStreamDetail()
  const orderStatus = data.filter?.liveStream?.orderStatus
  const [over, setOver] = useState(false)
  const [isActionActive, setIsActionActive] = useState(false)
  const wrapperRef = useRef(null)
  const wrapperRef2 = useRef(null)
  useEffect(() => {
    function handleClickOutside (event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !wrapperRef2.current.contains(event.target)
      ) {
        setIsActionActive(false)
        methods.closeFilter()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  const handleItemClick = (data) => {
    methods?.handleOrderStatus(data)
  }
  const orderStatusList = [
    { id: 1, name: 'Đã chốt đơn' },
    { id: 0, name: 'Chưa chốt đơn' },
  ]
  const resetFilter = _ => {
    methods.clearFilterOrderStatus()
    setIsActionActive(false)
  }
  return (
    <div style={{ position: 'relative' }}>
      <div
        className={'filter-content__item'}
        ref={wrapperRef2}
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        data-show={!!isActionActive}
        data-filter={orderStatus?.active !==''}
      >
        {
          !isActionActive
            ?
            <Tooltip placement="right" title={'Lọc theo trạng thái chốt đơn'}>
              <div
                className={'filter-content__item-icon'}
                onClick={e => {
                  setIsActionActive(prev => !prev)
                  e.stopPropagation()
                }}>
                {ICON_FILTER.orderStatus}
              </div>
            </Tooltip>
            :
            <div
              className={'filter-content__item-icon'}
              onClick={e => {
                setIsActionActive(prev => !prev)
                e.stopPropagation()
              }}>
              {ICON_FILTER.orderStatus}
            </div>
        }
        {orderStatus?.active !== ''
        &&
        <div className={'close-filter'} onClick={resetFilter}>
          <Tooltip placement="right" title={'Bỏ lọc'}>{ICON_FILTER.close}</Tooltip>
        </div>
        }
      </div>
      {isActionActive && (
        <StyledRowMenuPopover>
          <div className={'filter-content'} ref={wrapperRef}>
            <div className={'filter__title'}>
              <Text fontWeight={600}>Trạng thái chốt đơn</Text>
            </div>
            {orderStatusList.map((item, key) => (
              <li
                key={item.id}
                className="filter__content-item"
                data-danger={item?.isDanger}
                onClick={() => handleItemClick(item)}
              >
                <Radio checked={item.id === orderStatus.id} className={'filter__content-radio'}/> <span>{item.name}</span>
              </li>
            ))}
            <div className="filter__footer">
              <Text className={'reset'}
                    color={'#1e9a98'}
                    style={{
                      opacity: orderStatus.id !== '' ? 1 : 0.6,
                      cursor: orderStatus.id !== '' ? 'pointer' : 'not-allowed',
                    }}
                    onClick={() => {
                      if(orderStatus.id !== ''){
                        methods.clearFilterOrderStatus()
                        setIsActionActive(false)
                      }
                    }}>Đặt lại</Text>
              <Button size={'sm'} style={{ width: '88px' }}
                      onClick={() => {
                        methods.approveFilter()
                        setIsActionActive(false)
                      }}>Lọc</Button>
            </div>
          </div>
        </StyledRowMenuPopover>
      )}
    </div>
  )
}

const StyledRowMenuPopover = styled.div`
  background: #ffffff;
  padding: 16px 24px;
  min-width: 224px;
  position: absolute;
  top: 0;
  left: 65px;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  .filter{
    &__title{
      margin-bottom: 24px;
      text-align: left;
    }
    &__content {
      &-radio{
        margin-right: 8px;
      }
      &-item {
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        color: #00081d;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
  
        transition: color 0.25s;
  
        cursor: pointer;
  
        svg {
          width: 18px;
          height: 18px;
  
          margin-right: 10px;
        }
      }
    }
    &__footer{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .reset{
        :hover{
          cursor: pointer;
        }
      }
    }  
  }

`
