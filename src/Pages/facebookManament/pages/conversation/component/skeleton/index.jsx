import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import { ICON_CONVERSATION } from '../../interface/icon'
import styled from 'styled-components'

export const ConversationSkeleton = ({ ...props }) => {
  const SkelentonRows =Array.from(Array(10).keys())
  return (
    <>
      <StyledItemInfo>
        {
          SkelentonRows.map(item =>
            <div className={'item-content'} key={item}>
              {ICON_CONVERSATION.star}
              <div className="item-content__avatar">
                <Skeleton variant="circular" height={44} width={44} style={{ marginRight: '12px' }}/>
                <div className="type">
                  <Skeleton variant="circular" height={20} width={20} style={{ marginRight: '12px' }}/>
                </div>
              </div>
              <div className="item-content__short-content">
                <Skeleton variant="text" width={'30%'} height={24}/>
                <Skeleton variant="text" width={'70%'} height={24}/>
              </div>
              <div className={'item-content__action'}>
                <Skeleton variant="text" width={'100%'} height={24}/>
                <Skeleton variant="text" width={'100%'} height={24}/>
              </div>
            </div>
          )
        }
      </StyledItemInfo>
    </>
  )
}

const StyledItemInfo = styled.div`
 .item-content{
  padding: 14px 8px;
  display: flex;
  align-items: center;
  :hover{
    cursor: pointer;
  }
  &[data-active='true']{
    background: #EFF3FB;
    border-radius: 6px;
  }
  &__tag{
    display: flex;
    align-items: center;
    p{
      display: flex;
      align-items: center;
    }
    margin-top: 8.5px;
  }
  &__avatar{
    width: 44px;
    height: 44px;
    margin-left: 8px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      border-radius: 50%;
    }
    .type{
      position: absolute;
      bottom: 0;
      right: -10px;
    }
    &[data-unread='true']{
      img{
        border: 2px solid #1A94FF;
      }
    }
  }
  &__short-content{
    width: 58%;
    margin-left: 12px;
    .snippet{
      width: 100%!important;
      height: 20px;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
    &[data-unread='true']{
      .snippet{
        color: #1A94FF!important;
      }
      .name{
        font-weight: 600!important;
      }
    }
  }
  &__action{
    width: 21%;
    p{
      text-align: right!important;
      width: auto!important;
    }
  }
 } 
`