import React, { useEffect, useRef } from 'react'
import { Text } from 'common/text'
import '../index.scss'
import useFacebookDetailLiveStreamDetail from '../../../hooks/useFacebookDetailComment'
import { ConfirmModal } from '../../../../../../../layouts/rightSightPopup/confirm'
import styled from 'styled-components'
import ReactImageFallback from 'react-image-fallback'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { ICON_CONVERSATION } from '../../../interface/icon'
import { InputTyping } from '../../chatAction/typing/inputTyping'
import { ResponseContentModal } from '../../chatAction/responContentModal'
import useFacebookLiveStreamDetailTyping from '../../../hooks/useFacebookConversationTyping'
import { Radio } from '../../../../../../../common/form/radio'
import { StyledFacebookResponseContentScriptDetailDrawer } from './_styled'
import { THEME_COLORS } from '../../../../../../../common/theme/_colors'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { CarouselModal } from '../../../../responseContentScript/components/detailDrawer'
import { Loading } from '../../../../../../../common/loading'

const SendMessage = ({ ...props }) => {
  const { comment } = useFacebookDetailLiveStreamDetail()
  return (
    <>
      <ConfirmModal
        openModal={!!comment.message?.show}
        body={<Body/>}
        stylePopup={'send-message-modal_confirm'}
        closeBackdropClick={true}
        footer={
          {
            cancel: {
              width: 110,
              title: 'Hủy',

            },
            acceptance: {
              width: 110,
              title: 'Gửi (Enter)'
            },
          }
        }
        footerProps={
          { className: 'product-group-modal_dismiss' }
        }
        closeModal={() => comment.func?.handleCloseMessageModal()}
        acceptance={(e) => comment.func.handleSubmitMessage(e)}
      />
    </>

  )
}
export default SendMessage
const Body = () => {
  const { data, comment } = useFacebookDetailLiveStreamDetail()
  const { typing, methods } = useFacebookLiveStreamDetailTyping()
  const inputRef = useRef()
  const message = data.detail?.liveStream?.message

  useEffect(() => {
    if (inputRef.current && message.media.imageTemp.length > 0) {
      inputRef.current.focus();
    }
  }, [message.media.imageTemp]);
  return (
    <Styled>
      <div className={'message-modal__header'}>
        <Text
          fontSize={19}
          fontWeight={600}
        >Gửi tin nhắn tới</Text>
        <div className="message-modal__header-avatar">
          <ReactImageFallback
            src={data.detail?.liveStream?.customer?.sender_avatar}
            fallbackImage="/img/facebook/fb_avatar.jpg"
            alt={data.detail?.liveStream?.customer?.sender_name}
            className="product-image"
          />
        </div>

        <Text
          fontSize={13}
        >{data.detail?.liveStream?.customer?.sender_name}</Text>
      </div>
      <div className="message-modal__content">
        <Text
          as={'p'}
          fontSize={13}
          fontWeight={500}
        >{data.detail?.conversation?.customer?.name}</Text>
        <Tooltip className={'message-modal__content-mess'}
                 tittle={comment?.message?.data?.snippet ? JSON.parse(comment?.message?.data?.snippet) : '---'}
                 baseOn={'width'}>
          <Text
            as={'p'}
            fontSize={13}
            fontWeight={400}
          >{comment?.message?.data?.snippet ? JSON.parse(comment.message?.data?.snippet) : '---'}</Text>
        </Tooltip>
      </div>
      <div className="message-modal__typing">
        <textarea
          id="review-text"
          onChange={e => comment.func.handleChangeInputTyping(e.target.value)}
          placeholder="Nhập nội dung phản hồi, nhấn Shift + Enter để xuống dòng, Enter để gửi"
          ref={inputRef}
          rows={1}
          value={message?.value}
          onKeyDown={e =>  comment.func.handleSubmitMessage(e)}
        />
        <div className={'message-modal__typing-footer'}>
          <Text as={'p'} color={'#1A94FF'} onClick={comment.func.handleAddNameTag}>{ICON_CONVERSATION.plus} Thêm tên khách hàng </Text>
          <ResponseContentModal
            className={'icon-send-modal-message'}
            typing={typing}
            methods={methods}
            icon={(ICON_CONVERSATION.note)}
            onSelect={(e)=> {comment.func.handleSelectScriptMessage(e);comment.func.handleSetTypeMedia(true,3)}}
            addScript={false}
          />
        </div>
      </div>
      <div className="message-modal__media">
        <div className="message-modal__media-option">
          <div className="message-modal__media-option__content" onClick={() => {comment.func.handleSetTypeMedia(false,1)}}>
            <Radio className={'media-radio'} checked={!message?.media?.type && message?.media?.typeValue == 1} disabled={false}/>
            <Text>Không đính kèm ảnh</Text>
          </div>

          <div className="message-modal__media-option__content" onClick={() => {comment.func.handleSetTypeMedia(true,2)}}>
            <Radio className={'media-radio'} checked={!!message?.media?.type  && message?.media?.typeValue == 2} disabled={false}/>
            <Text>Gửi ảnh bài viết</Text>
          </div>

          <div className="message-modal__media-option__content" onClick={() => {comment.func.handleSetTypeMedia(true,3)}}>
            <Radio className={'media-radio'} checked={!!message?.media?.type  && message?.media?.typeValue == 3} disabled={false} />
            <Text> Tải lên ảnh khác</Text>
          </div>
        </div>
        <div className="message-modal__media-gallery">
          <StyledFacebookResponseContentScriptDetailDrawer>
            <Galleries
              type={message?.media?.type}
              value={message?.media?.typeValue}
              data={message?.media?.imageTemp}
              onChange={comment.func.handleImageFileChange}
              onCreateClick={() => ''
              }
              onImageClick={index => comment.func.handleSetShowCarouselMedia({ defaultIndex: index })}
              onImageDelete={imageId => comment.func.handleImageDelete(imageId)}
            />
          </StyledFacebookResponseContentScriptDetailDrawer>
        </div>
      </div>
      {!!message?.media?.carousel && (
        <CarouselModal
          config={{defaultIndex: message?.media?.carousel.defaultIndex,backdrop: true}}
          data={message?.media?.imageTemp.map((item, i) => ({id: `image-${i}`, name: i, url: item.url}))}
          onClose={() => comment.func.handleSetShowCarouselMedia(false)}
        />
      )}
      {message.loading && <Loading/>}
    </Styled>
  )
}

const Styled = styled.div`
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
    &__header{
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      &-avatar{
        width: 28px;
        height: 28px;
        border: 1.5px solid #2374E1;
        border-radius: 60px;
        overflow: hidden;
        margin: 0 8px 0 16px;
        image{
          max-width: 100%;
          max-height: 100%;
        }
      }
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
`

const Galleries = ({
  data,
  validate,
  onChange,
  onCreateClick,
  onImageClick,
  onImageDelete,
  type,
  value,
  ...props
}) => {
  const inputFileRef = useRef(null)
  const MAX_NUMBER_OF_IMAGES = 10
  return (
    <div
      {...props}
      className={`facebook-response-content-script-detail-drawer__galleries ${
        props?.className || ''
      }`}
    >
      {!!type && value== 3 &&
      <div className="facebook-response-content-script-detail-drawer__galleries-list">
        <p style={{ width: '100%', marginBottom:"20px" }}>
          <Text color={data.length == 0 || data.length > 10 ? "#FF424E":"#7C88A6"} style={{ display: 'block' }}>
              Tải tối đa 10 ảnh, mỗi ảnh không quá 3MB và chỉ hỗ trợ các định dạng: .jpg, .jpeg, .png.
          </Text>
        </p>
        {data.length > 0 &&
        data.map((item, i) => (
          <div
            key={item?.id}
            className="facebook-response-content-script-detail-drawer__galleries-item"
            onClick={() => onImageClick && onImageClick(i)}
          >
            <img
              className="facebook-response-content-script-detail-drawer__galleries-background"
              src={item?.url}
              alt={item?.name}
            />
            <div
              className="facebook-response-content-script-detail-drawer__galleries-delete"
              onClick={e => {
                e.stopPropagation()
                if (onImageDelete) onImageDelete(item?.id)
              }}
            >
              {FACEBOOK_ICONS.x}
            </div>
          </div>
        ))
        }
        {data.length < MAX_NUMBER_OF_IMAGES && (
          <>
            <div
              className="facebook-response-content-script-detail-drawer__galleries-create"
              onDrop={e => {
                e.preventDefault()
                onChange(e)
              }}
              onClick={() => {
                if (onCreateClick) onCreateClick()
                if (inputFileRef?.current) {
                  inputFileRef.current.value = ''
                  inputFileRef.current.click()
                }
              }}
            >
              {
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 3.74997V14.25"
                    stroke="#C8CBD4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.25 8.99997H14.75"
                    stroke="#C8CBD4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              <Text color={THEME_COLORS.primary_300} style={{ display: 'block' }}>
                Tải ảnh
              </Text>
              <Text color="#c8cbd4" style={{ display: 'block' }}>
                {data.length}/{MAX_NUMBER_OF_IMAGES}
              </Text>
            </div>
            <input
              ref={inputFileRef}
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              multiple={true}
              style={{ display: 'none' }}
              onChange={onChange}
            />
          </>
        )}
      </div>
      }

    </div>
  )
}
