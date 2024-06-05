import { StyledLeftContent } from './styledLeftContent'
import { HeaderLeftContent } from '../../header/headerLeftContent'
import { LeftFilterConverSation } from '../../filter'

import styled from 'styled-components'
import { ICON_CONVERSATION, ICON_FILTER } from '../../../interface/icon'
import { Text } from '../../../../../../../common/text'
import React, { useContext,useRef } from 'react'
import { format } from 'date-fns'
import { EmptyConversation } from '../../empty'
import { ConversationSkeleton } from '../../skeleton'
import useFacebookConversation from '../../../hooks/useFacebookConversation'
import useFacebookDetailConversation from '../../../hooks/useFacebookDetailConversation'
import useFilterFacebookConversation from '../../../hooks/useFilterFacebookConversation'
import ReactImageFallback from 'react-image-fallback'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Tooltip as TooltipV1 } from '../../../../../../../common/tooltip'
import { Loading } from '../../../../../../../common/loading'

export const LeftContent = () => {

  const { data, methods } = useFacebookConversation()
  const { functions } = useFilterFacebookConversation()
  const { conversation } = data
  const menuRef = useRef(null)
  const handleMenuScroll = () => {
    const clientHeight = menuRef.current.clientHeight
    const scrollHeight = menuRef.current.scrollHeight
    const scrollTop = menuRef.current.scrollTop

    if (clientHeight + scrollTop > scrollHeight - 200) {
      if (functions.onLoadMore) {
        functions.onLoadMore()
      }
    }
  }
  return (
    <StyledLeftContent>
      <HeaderLeftContent/>
      <LeftFilterConverSation/>
      <div ref={menuRef} className={'common-scrollbar'} style={{ height: 'calc(100vh - 206px', overflow: conversation?.display?.list.length <= 0 ? 'hidden' : 'auto' }} onScroll={handleMenuScroll}>
        {
          conversation?.display?.list.length && !conversation?.loading > 0
            ?
            conversation?.display?.list?.map((item, index) => {
              return (
                <ItemInfo item={item} key={index}/>
              )
            })
            :
            !conversation?.loading
              ?
              <EmptyConversation/>
              :
              <ConversationSkeleton />
        }
      </div>
      {!!data.loading && <Loading/>}
    </StyledLeftContent>
  )
}
const ItemInfo = ({ item, ...props }) => {
  const conversation = useFacebookConversation()
  const { data, methods } = useFacebookDetailConversation()
  return (
    <StyledItemInfo>
      <div className={'item-content'}
           onClick={() => {
             data?.detail?.conversation?.customer?.code !== item?.code ? methods.handleGetDetail(item) : ''
           }} data-active={data?.detail?.conversation?.customer?.code == item?.code}>
        <div
          className={'item-content__star'}
          onClick={e => {
            e.stopPropagation()
            methods?.handleStarStatusConversation({ code: item.code, 'is_done': item?.is_done == 1 ? 2 : 1 })
          }}>
          {item?.is_done == 2 ? ICON_CONVERSATION.star_yellow : ICON_CONVERSATION.star}
        </div>
        <div className="item-content__avatar" data-unread={item?.is_read == 1 ? true : false}>
          <ReactImageFallback
            src={item?.avatar}
            fallbackImage="/img/facebook/fb_avatar.jpg"
            alt={item?.name}
          />
          {item.type == 1 ? ICON_CONVERSATION.messageCircle : ICON_CONVERSATION.commentCircle}
        </div>
        <div className="item-content__short-content" data-unread={item?.is_read == 1 ? true : false}>
          <div className={'item-content__name-container'}>
            <Text className={'name'} as={'p'} fontWeight={500}>{item?.name} </Text>
            {ICON_FILTER.arrowRight}
            <img src={item?.page_avatar} alt=""/>
          </div>
          <div className={'item-content__mess-content'}>
            {item?.is_reply == 1 && <div className={'mess-content__reply'}>{ICON_CONVERSATION.replyed}</div>}
            <Text className={'snippet mess-content__snippet'} as={'p'} fontSize={'13px'} color={'#7C88A6'} fontWeight={400}>
              {item?.snippet}
            </Text>
            {item?.is_read == 1 && <div
              style={{
                background: '#1A94FF',
                height: '12px',
                width: '12px',
                borderRadius: '50%',
                marginLeft: '4px'
              }}>&ensp;</div>}
          </div>
          {
            item?.tags?.length > 0 && (
              <div className="item-content__tag">
                {
                  item.tags.map((tag, index) => {
                      if (index < 2)
                        return (
                          <Tooltip className={'tags__tooltip-name'} placement="top" title={tag.name} baseOn="width">
                            <Text color={'#ffffff'} key={index} fontSize={10} lineHeight={'150%'}
                                  fontWeight={500}
                                  style={{
                                    padding: '3.5px 4px', background: `${tag.color}`,
                                    borderRadius: '2px',
                                  }}>{tag.name}</Text>
                          </Tooltip>
                        )
                    }
                  )
                }
                {
                  item.tags.length > 2 &&
                  <div className={'show-more__tags'}>
                    <Text
                      className={'tag-name'}
                      fontSize={10} lineHeight={'150%'}
                      fontWeight={500}
                      style={{
                        padding: '3.5px 4px', background: `#EBEEF5`,
                        borderRadius: '2px',
                      }}>
                      +{item.tags.length - 2} nhãn
                    </Text>
                    <div className={'show-more__tags-content'}>
                      {
                        item.tags.map((tag, index) => {
                            if (index >= 2)
                              return (
                                <div className={'show-more__tags-items'}>
                                  <div>
                                    <Text as={'p'} color={'#ffffff'} key={index} fontSize={10} lineHeight={'150%'}
                                          fontWeight={500}
                                          style={{
                                            padding: '3.5px 4px', background: `${tag.color}`,
                                            borderRadius: '2px',
                                            width: 'auto'
                                          }}>{tag.name}</Text>
                                  </div>
                                </div>
                              )
                          }
                        )
                      }
                    </div>
                  </div>
                }
              </div>
            )
          }
        </div>
        <div className={'item-content__action'}>
          <Text color={'#7C88A6'} fontSize={'12px'}
                as={'p'}>{item?.time ? format(new Date(item?.time), 'dd/MM/yy HH:mm') : '---'}</Text>
          <Text as={'p'} style={{ display: 'flex' }}>
            <div style={{
              borderRight: (!!item?.is_address || !!item?.is_phone) && item?.type == 2 ? '1px solid #EBEEF5' : '', paddingRight: '12px', marginRight: '12px', display:'flex'
            }}>
              <div style={{width:'24px'}}>
              {!!item?.is_address &&
              <TooltipV1 title={'Có thông tin địa chỉ'} placement={'bottom'}>
                {ICON_CONVERSATION.location}
              </TooltipV1>
              }</div><div style={{width:'24px'}}>
              {(!!item?.is_phone || !!item?.phones) &&
              <TooltipV1 title={'Có thông tin SĐT'} placement={'bottom'}>
                {ICON_CONVERSATION.phone}
              </TooltipV1>
              }</div>
            </div>
            {item?.type == 2 &&
            <TooltipV1 title={'In bình luận'} placement={'bottom'}>
              <div onClick={e => {
                e.stopPropagation()
                conversation.methods.handlePrintComment(item)
              }}>{ICON_CONVERSATION.print}</div>
            </TooltipV1>
            }
          </Text>
        </div>
      </div>
    </StyledItemInfo>
  )
}

const StyledItemInfo = styled.div`
 .item-content{
  padding: 14px 8px;
  display: flex;
  align-items: center;
  :hover{
    cursor: pointer;
    background: #EFF3FB;
    border-radius: 6px;
  }
  &__mess-content{
    width: 100%;
    display: flex;
    align-items: center;
    .mess-content__reply{
      margin-right: 2px;
    }
    .mess-content__snippet{
      max-width: calc(100% - 24px);
      height: 20px;
      margin-top: 2px;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &__name-container{
    display: flex;
    align-items: center;
    .name{
      margin-right: 4px;
    }
    img{
      max-width: 16px;
      max-height: 16px;
      border-radius: 50%;
      margin-left: 4px;
    }
  }
  &[data-active='true']{
    background: #EFF3FB;
    border-radius: 6px;
  }
  &__tag{
    display: flex;
    align-items: center;
    margin-top: 6px;
    p{
      display: flex;
      align-items: center;
    }
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
    svg{
      position: absolute;
      bottom: 0;
      right: 0;
    }
    &[data-unread='true']{
      img{
        border: 2px solid #1A94FF;
      }
    }
  }
  &__short-content{
    width: 62%;
    margin-left: 12px;
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
    width: 22%;
    p{
      text-align: right!important;
      width: auto!important;
    }
  }
 } 
 .tags__tooltip-name{
     max-width: 38%;
     padding-right: 4px;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-text-decoration: none;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ffffff;
    margin-right: 4px;
    height: 24px;
 }
 .show-more{
    &__tags{
      height: 24px;
      position: relative;
      :hover{
        .tag-name{
          color: #1E9A98!important;
        }
        .show-more__tags-content{
          display: block;
        }
      }
    }
    &__tags-content{
      position: absolute;
      top: 26px;
      left: 0;
      z-index: 2;
      background: #FFFFFF;
      box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.16);
      border-radius: 4px;
      padding: 8px 8px 4px 8px;
      display: none;
    }
    &__tags-items{
      margin-bottom: 4px;
      display: flex;
      width: max-content;
      height: 24px;
    }
 }
`