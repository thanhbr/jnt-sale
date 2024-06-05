import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import {ICON_CONVERSATION} from '../../interface/icon'
import styled from 'styled-components'

export const ConversationSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(10).keys())
  return (
    <>
     <StyledItemInfo>
        {
          SkelentonRows.map(item =>
            <div className={'item-content'} key={item}>
               <div className="item-content__post-content">
                <Skeleton height={84} width={79} style={{ marginRight: '12px' }}/>
                <div className="type">
                  <Skeleton variant="text" height={'35'} width={'30%'} style={{ display: 'block'}}/>
                  <Skeleton variant="text" height={'35'} width={'30%'} style={{ display: 'block', marginBottom: 1, marginTop: 1}}/>
                  <Skeleton variant="text" height={'35'} width={'30%'}/>
                </div>
              </div>
              <div className="item-content__avatar">
                <Skeleton variant="circular" height={32} width={38} style={{ marginRight: '12px' }}/>
                <div className="type">
                  <Skeleton variant="text" height={'100%'} width={'100%'} style={{ marginRight: '12px' }}/>
                </div>
              </div>
              <div className="item-content__short-content">
                <Skeleton variant="text" width={'100%'} height={24}/>
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
  .item-content {
    padding: 14px 8px;
    display: flex;
    align-items: center;
    :hover {
      cursor: pointer;
    }
    &[data-active='true'] {
      background: #eff3fb;
      border-radius: 6px;
    }
    &__tag {
      display: flex;
      align-items: center;
      p {
        display: flex;
        align-items: center;
      }
      margin-top: 8.5px;
    }
    &__post-content{
      width: 70%;
      height: 100%;
      display: flex;

      .type{
        width: 100%;
        display: grid;
      }
    }
    &__avatar {
      width: 20%;
      margin-left: 8px;
      // overflow: hidden;
      position: relative;
      display: flex;
      img {
        width: 100%;
        border-radius: 50%;
      }
      .type {
        width: 100%;
      }
      &[data-unread='true'] {
        img {
          border: 2px solid #1a94ff;
        }
      }
    }
    &__short-content {
      width: 40%;
      margin-left: 6rem;
      .snippet {
        width: 100% !important;
        height: 20px;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
      &[data-unread='true'] {
        .snippet {
          color: #1a94ff !important;
        }
        .name {
          font-weight: 600 !important;
        }
      }
    }
    &__action {
      width: 10%;
      margin-left: 6rem;

      p {
        text-align: right !important;
        width: auto !important;
      }
    }
  }
`
