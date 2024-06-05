import React, { useEffect, useState } from 'react'
import { Text } from '../../../../../../common/text'
import ReactImageFallback from 'react-image-fallback'
import styled from 'styled-components'
import { Tooltip } from '../../../../../../common/tooltip'
import { format } from 'date-fns'
import { ICON_CONVERSATION } from '../../interface/icon'
import useFacebookDetailLiveStreamDetail from '../../hooks/useFacebookDetailComment'
import DeleteCommentModal from '../modal/deleteComment/confirmDeleteComment'
import SendMessage from '../modal/sendMessage'
import { Spinner } from '../../../../../../common/spinner'
import useFacebookCustomerInfor from '../../hooks/useFacebookCustomerInfor'

export const CommentDetailConversation = (
  {
    liveStreamRef,
  }
) => {
  const { data, comment, methods } = useFacebookDetailLiveStreamDetail()
  const { functions } = useFacebookCustomerInfor()
  const details = data.detail.liveStream
  const { typing } = details
  const listItems = details.list
  const listLength = details.listOrigin?.length
  return (
    <StyledComment>
      <div className={'content-liveStream__chat-description'}
           style={{
             // height: details?.inMatchTime ? 'calc(100vh - 164px)' : 'calc(100vh - 238px)',
             background: 'linear-gradient(89.91deg, #EFF6FC 0.08%, #E3F0FC 30.62%, #E1EFFC 64.57%, #E5F1FC 88%, #EEF5FC 99.93%)',
             padding: '0 16px'
           }}
           ref={liveStreamRef}>
        <div className="fix-top__liveStream">
          <div className="check-all-content">
            <div className={'ct-c__xyz'}>
              <div className="check-content-left">
                <Text fontWeight={600}>Bình luận đang xem</Text>
              </div>
              <div className="check-content-right">
                <Text onClick={() => {
                  methods.handleGetGroupCommentPerson(1)
                }} as={'a'} color={'#1A94FF'}>Xem tất cả bình luận của khách hàng ({listLength})</Text>
              </div>
            </div>
          </div>
        </div>
        <div className={'common-scrollbar'}>
          <div>
            {listItems.map((item, index) =>
              <div className={'liveStream-comment__content'} key={index}>
                <div className="liveStream-comment__items">
                  {item?.reply && <div className="liveStream-comment__items-xxx"></div>}
                  <div className="liveStream-comment__items-left">
                    <div className="liveStream-comment__items-avatar" style={{opacity : item?.is_hidden == 1 && '0.45'}}>
                      <ReactImageFallback
                        src={details?.customer?.sender_avatar}
                        fallbackImage="/img/facebook/fb_avatar.jpg"
                        alt={'avatar'}
                      />
                    </div>
                  </div>
                  <div className={'liveStream-comment__items-snippet'}>
                    <div className={'liveStream-comment__snippet-container'}>
                          <Tooltip placement="left" arrow={false}
                                   title={item?.time ? format(new Date(item?.time), 'dd/MM/yy HH:mm') : '---'}>
                            <div className={'liveStream-comment__items-content'}
                                 data-edit={item?.comment_id == typing?.text?.comment?.comment_id && typing?.text?.commentType == 'update'}
                                 data-reply={item?.comment_id == typing?.text?.comment?.comment_id && typing?.text?.commentType == 'reply'}
                            >
                              <Text fontWeight={500}
                                    style={{
                                      wordBreak: 'break-all',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    color={item?.is_hidden == 1 && '#7C88A6'}
                              >
                                {details?.customer?.sender_name} &nbsp;
                                {item?.is_done == 1 && ICON_CONVERSATION.star_yellow}
                                {+item?.is_hidden === 1 && ICON_CONVERSATION.hidden_eyes}
                              </Text>
                              <Text as={'p'}
                                    style={{
                                      wordBreak: 'break-all'
                                    }}
                                    color={item?.is_hidden == 1 && '#7C88A6'}
                              >{!!item?.snippet ? JSON.parse(item?.snippet) : '---'}</Text>
                            </div>
                          </Tooltip>

                      {item?.pending ?
                        <div className={'spinner-mess-content'}>
                          <Spinner size={18} thickness={5}/>
                        </div>
                        :
                        <div>
                          <div className={'liveStream-comment__reply-actions'}>
                            <Tooltip placement="bottom"
                                     title={'Chọn thông tin này làm địa chỉ'}>
                              <div as={'p'}
                                   onClick={() => functions.handleAddressSplit(JSON.parse(item?.snippet))}>{ICON_CONVERSATION.commentLocation}</div>
                            </Tooltip>
                          </div>
                        </div>
                      }
                    </div>

                    <div className={'liveStream-comment__items-action'}>
                      <Text fontSize={10} fontWeight={500}
                            onClick={() => comment.func?.handleHiddenComment(item)}
                            style={{ padding: '0px 8px 0px 12px', cursor: 'pointer' }}>
                        {item?.is_hidden == 1 ? 'Hiện bình luận' : 'Ẩn bình luận'}
                      </Text>
                      <Text fontSize={10} color={'#1E9A98'}
                            onClick={_ => comment.func.handleShowMessageModal(item)}
                            style={{ padding: '0px 8px', cursor: 'pointer' }}>Gửi tin nhắn</Text>
                    </div>
                  </div>
                </div>
                {item?.reply &&
                item?.reply.map((reply, l) => {
                  return (
                    <div className="liveStream-comment__reply">
                      <div className={'liveStream-comment__reply-xxx'}></div>
                      {l < item?.reply.length - 1 &&
                      <div className={'liveStream-comment__reply-xxy'}></div>
                      }
                      <div className="liveStream-comment__reply-avatar">
                        <ReactImageFallback
                          src={reply.from == details?.customer?.page_id && details?.customer?.page_avatar}
                          fallbackImage="/img/facebook/fb_avatar.jpg"
                          alt={'avatar'}
                        />
                      </div>
                      <div className={'liveStream-comment__reply-snippet'}>
                        <Tooltip placement="left" arrow={false}
                                 title={reply?.time ? format(new Date(reply?.time), 'dd/MM/yy HH:mm') : '---'}>
                          <div className="xx3ay">
                            <div className={'liveStream-comment__reply-content'}
                                 data-edit={reply?.comment_id == typing?.text?.comment?.comment_id && typing?.text?.commentType == 'update'}>
                              <Text fontWeight={500}>{reply?.sender_name}</Text>
                              <Text
                                as={'p'}>{!!reply?.snippet ? JSON.parse(reply?.snippet) : '---'}</Text>
                            </div>

                            {reply?.pending &&
                            <div className={'spinner-mess-content'}>
                              <Spinner size={18} thickness={5}/>
                            </div>}
                          </div>
                        </Tooltip>
                        {!reply?.pending &&
                        <div className={'liveStream-comment__reply-action'}>
                          {
                            reply.from == details?.customer?.page_id
                              ?
                              <>
                                {reply?.comment_id == typing?.text?.comment?.comment_id && typing?.text?.commentType == 'update'
                                  ?
                                  <Text fontSize={10} fontWeight={500}
                                        color={'#7C88A6'}
                                        style={{
                                          padding: '0px 8px 0px 12px',
                                          cursor: 'pointer'
                                        }}
                                        onClick={
                                          _ => comment.func.handleCancelEditComment()
                                        }
                                  >Nhấn Esc để <Text fontSize={10}
                                                     color={'#1E9A98'}> Hủy</Text></Text>
                                  :
                                  <Text fontSize={10} fontWeight={500}
                                        style={{
                                          padding: '0px 8px 0px 12px',
                                          cursor: 'pointer'
                                        }}
                                        onClick={
                                          _ => comment.func.handleEditComment(reply)
                                        }
                                  >Chỉnh sửa</Text>
                                }
                                <Text fontSize={10} color={'#1E9A98'}
                                      onClick={_ => comment.func.handleDeleteCommentConfirm(reply)}
                                      style={{
                                        padding: '0px 8px',
                                        cursor: 'pointer'
                                      }}>Xóa</Text>
                              </>
                              :
                              <>
                                <Text fontSize={10} fontWeight={500}
                                      style={{
                                        padding: '0px 8px 0px 12px',
                                        cursor: 'pointer'
                                      }}>

                                  {reply?.is_hidden == 1 ? 'Hiện bình luận' : 'Ẩn bình luận'}
                                </Text>
                                <Text fontSize={10} color={'#1E9A98'}
                                      onClick={_ => comment.func.handleShowMessageModal(reply)}
                                      style={{ padding: '0px 8px', cursor: 'pointer' }}>Gửi
                                  tin nhắn</Text>
                              </>
                          }

                        </div>
                        }
                      </div>
                    </div>
                  )
                })
                }
              </div>
            )
            }
          </div>
        </div>
        <DeleteCommentModal/>
        <SendMessage/>
      </div>
    </StyledComment>
  )
}

const StyledComment = styled.div`
  position: relative;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  max-height: 100%;
  min-height: 0;
  position: relative;
  .common-scrollbar{
    overflow: auto;
    margin-bottom: -6px;
  }
  .infor-customer{
     &-child{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
     }
    &-xxx{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      background: linear-gradient(89.91deg, rgb(239, 246, 252) 0.08%, rgb(227, 240, 252) 30.62%, rgb(225, 239, 252) 64.57%, rgb(229, 241, 252) 88%, rgb(238, 245, 252) 99.93%);
    }
  }
  .ct-c__xyz{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
  }
  .content-liveStream__chat-description{
    padding: 9px 16px 0 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .fix-top__liveStream{
      z-index: 1;
      padding-top: 9px;
      background: linear-gradient(89.91deg, #EFF6FC 0.08%, #E3F0FC 30.62%, #E1EFFC 64.57%, #E5F1FC 88%, #EEF5FC 99.93%);
  }
  .check-all-content{
    height: 44px;
    background: linear-gradient(89.91deg, #EFF6FC 0.08%, #E3F0FC 30.62%, #E1EFFC 64.57%, #E5F1FC 88%, #EEF5FC 99.93%);
    width: calc(100% + 16px);
    margin-left: -16px;
    padding-left: 16px;
  }
  .check-content-left{
    display: flex;
    align-items: center;
  }
  .check-content-right{
     display: flex;
     align-items: center;
     p{
      display: flex;
      align-items: center;
     }
  }
  .liveStream-checkbox{
    margin-right: 16px;
  }
  .liveStream-comment{
    &__items{
      :hover{
        .liveStream-comment__reply-actions{
          display: flex;
        }
      }
      &-snippet{
        width: 100%;
      }
    }
    &__snippet-container{
      max-width: calc(100% - 124px);
      display: flex;
      align-items: center;
    }
    &__reply-actions{
      background: rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(219, 235, 250, 0.6);
      border-radius: 6px;
      margin-left: 4px;
      padding: 4px 0 4px 6px;
      display: flex;
      align-items: center;
      display: none;
       div{
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-right: 6px;
        :hover{
          svg{
            path: {
              stroke: rgb(30,154,152);
            }
          }
        }
       }
    }
    &__post{
      max-height: 75px;
      background: #FFFFFF;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      display: flex;
      align-items: center;
      padding: 8px;
      width: 100%;
      &-reaction{
        display: flex;
        align-items: center;
        padding: 1px 0;
      }
      &-avatar{
        width: 79px;
        height: 54px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000000;
        margin-right: 16px;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    &__content{
      padding-bottom: 12px;
    }
    &__items{
      display: flex;
      align-items: flex-start;
      position: relative;
      &-snippet{
        .spinner-mess-content{
          margin-left: 8px;
        }
      }
      &-xxx{
        width: 1px;
        height: calc(100% - 30px);
        position: absolute;
        top: 30px;
        left: 43px;
        background: #C9E1F8;
        
      }
      &-left{
        display: flex;
        align-items: center;
      }
      &-content{
        padding: 8px 12px;
        gap: 4px;
        background: #FFFFFF;
        border-radius: 18px;
        flex: none;
        margin-bottom: 4px;
        max-width: 100%;
       &[data-edit='true']{
        border: 1px #1E9A98 solid;
       }
       &[data-reply='true']{
        border: 1px #1E9A98 solid;
       }
      }
      &-avatar{
        width: 28px;
        height: 28px;
        overflow: hidden;
        position: relative;
        margin-right: 16px;
        img{
          width: 100%;
          border-radius: 50%;
        }
        svg{
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
    &__reply{
      &-snippet{
        max-width: 100%;
        .xx3ay{
          display: flex;
          align-items: center;
        }
        .spinner-mess-content{
          margin-left: 8px;
        }
      }
      padding-left: 80px;
      display: flex;
      align-items: flex-start;
      padding-top: 12px;
      position: relative;
      &-xxx{
        width: 24px;
        border-bottom-width: 1px;
        border-bottom-left-radius: 10px;
        border-left-style: solid;
        height: 26px;
        border-bottom-style: solid;
        border-left-width: 1px;
        position: absolute;
        left: 43px;
        top: 0;
        border-color: #C9E1F8;
        
      }
      &-xxy{
        width: 1px;
        height: 100%;
        position: absolute;
        left: 43px;
        background: #C9E1F8;
        
      }
      &-left{
        display: flex;
        align-items: center;
      }
      &-content{
        padding: 8px 12px;
        gap: 4px;
        background: #FFFFFF;
        border-radius: 18px;
        flex: none;
        margin-bottom: 4px;
        max-width: 90%;
       &[data-edit='true']{
        border: 1px #1E9A98 solid;
       }
      }
      &-avatar{
        width: 24px;
        height: 24px;
        overflow: hidden;
        position: relative;
        margin-right: 16px;
        img{
          width: 100%;
          border-radius: 50%;
        }
        svg{
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }
  }
`
