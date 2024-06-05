import React, { useEffect, useRef } from 'react'
import { Text } from 'common/text'
import '../index.scss'
import useFacebookDetailLiveStreamDetail from '../../../hooks/useFacebookDetailComment'
import { ConfirmModal } from '../../../../../../../layouts/rightSightPopup/confirm'
import styled from 'styled-components'
import ReactImageFallback from 'react-image-fallback'
import { ICON_CONVERSATION } from '../../../interface/icon'
import { useOtherLiveStream } from '../../../hooks/useOtherLiveStream'
import { Input } from '../../../../../../../common/form/input'
import { ORDER_ICONS } from '../../../../../../refactorOrder/interfaces/_icons'
import { TableLayout } from '../../../../../../../layouts/tableLayout'
import OtherTbody from './_otherTbody'
import OthderThead from './_otherThead'
import Skelton from './_skeleton'
import { Tooltip } from '../../../../../../../common/tooltip'
import { ICONS } from '../../../../autoResponses/interface/_constants'
import useFacebookLiveStreamDetail from '../../../hooks/useFacebookLiveStreamDetail'

const OtherLiveStream = () => {
  const { func, other } = useOtherLiveStream()
  return (
    <>
      <ConfirmModal
        openModal={other.show}
        body={<Body/>}
        stylePopup={'other-live-stream-modal_confirm'}
        closeBackdropClick={true}
        footer={
          {
            cancel: {
              width: 110,
              title: 'Đóng',

            },
            acceptance: {
              width: 110,
              title: 'Chọn'
            },
          }
        }
        footerProps={
          { className: 'product-group-modal_dismiss' }
        }
        submitProps={{ disabled: !other?.data?.video_id }}
        closeModal={() => func.handleClose()}
        acceptance={() => other?.data?.video_id ? func.submit() : ''}
      />
    </>

  )
}
export default OtherLiveStream
const Body = () => {
  const { data } = useFacebookDetailLiveStreamDetail()
  const { func, other } = useOtherLiveStream()
  const inputRef = useRef()
  const message = data.detail?.liveStream?.message
  const facebookLiveStreamDetail = useFacebookLiveStreamDetail()
  useEffect(() => {
    if (inputRef.current && message.media.imageTemp.length > 0) {
      inputRef.current.focus()
    }
  }, [message.media.imageTemp])
  return (
    <Styled>
      <div className={'message-modal__header'}>
        <Text
          fontSize={19}
          fontWeight={600}
        >Danh sách bài đăng của</Text>
        <div className="message-modal__header-avatar">
          <ReactImageFallback
            src={facebookLiveStreamDetail.data.page.detail?.page_avatar}
            fallbackImage="/img/facebook/fb_avatar.jpg"
            alt={facebookLiveStreamDetail?.data.page.detail?.page_name}
            className="product-image"
          />
          <img className={'message-modal__icon-facebook'} src="/img/facebook/fb.png" alt="icon facebook"/>
        </div>

        <Text lineHeight={'140%'}>
          {facebookLiveStreamDetail?.data.page.detail?.page_name || ''}
        </Text>
      </div>
      <div className={'message-modal_search'}>
        <div style={{ width: '100%' }}>
          <Input
            placeholder="Tìm kiếm theo tên/ ID bài viết"
            icon={ORDER_ICONS.searchMd}
            style={{ width: '100%' }}
            value={other?.search}
            onChange={(e) => func.search(e)}
          />
        </div>
        <div onClick={func.refesh}>
          <Tooltip title={'Làm mới danh sách livestream'}>
            <Text style={{ cursor: 'pointer' }}>
              {ICON_CONVERSATION.reload}
            </Text>
          </Tooltip>

        </div>
      </div>
      {other.display?.list.length > 0 ?
        <div className={'message-modal_list-live-stream'}>
          <TableLayout
            table={{
              tHead: <OthderThead/>,
              tBody: other.display?.loading ? <OtherTbody list={other.display?.list}/> : <Skelton/>,
            }}
          />
        </div>
        :
        <div className={'empty-livestream'}>
          <div className="empty-livestream__content">
            {ICONS.noPost}
            <Text as={'p'} style={{ width: '100%!important' }}>Không tìm thấy bài viết</Text>
          </div>
        </div>
      }
      {/*{other.display?.loading && <div>*/}
      {/*    123*/}
      {/*</div>}*/}
    </Styled>
  )
}

const Styled = styled.div`
  .empty-livestream{
    height: 430px;
    display: flex;
    align-items: center;
    justify-content: center;
    &__content{
      text-align: center;
    }
  }
  textarea {
      resize: none;
      overflow: auto;
      height: 88px;
      background: transparent;
      width: 100%;
      border: 0;
      padding: 12px 16px;
      font-size: 13px;
    }
   .message-modal{
    &__icon-facebook{
      position:absolute;
      bottom: -2px;
      right: -3px;
      width: 12px;
      height: 12px;
    }
    &__header{
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      &-avatar{
      
        position: relative;
        width: 28px;
        height: 28px;
        border: 1.5px solid #2374E1;
        border-radius: 60px;
        //overflow: hidden;
        margin: 0 8px 0 16px;
        padding: 2px;
        
        background: #ffffff;
        
        img{
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
        }
      }
    }
    &_search{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &_list-live-stream{
      
    }
    &__content{
      padding: 8px 12px;
      gap: 4px;
      background: #EFF3FB;
      border-radius: 6px;
      &-mess{
        display: -webkit-box;
        max-width: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &__typing{
      margin-top: 16px;
      background: #FFFFFF;
      border: 1px solid #EBEEF5;
      border-radius: 6px;
      &-footer{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 8px 6px 16px;
        border-top: 1px solid #EBEEF5;
        border-radius: 0px 0px 6px 6px;
        p{
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .icon-send-modal-message {
          position: relative;
          right: 0px;
          bottom: 0px;
        }
      }
    }
    &__media{
      padding-top: 16px;
      padding-bottom: 8px;
      &-option{
        display: flex;
        align-items: center;
        &__content{
          display: flex;
          align-items: center;
          margin-right: 100px;
          cursor: pointer;
          .media-radio{
            margin-right: 8px;
          }
        }
      }
    }
   }

  .message-modal_list-live-stream {
    .table-layout__table-t-body{
      border: 1px solid #E2EAF8;
      border-width: 0 1px 1px 1px;
    }
  }
`
