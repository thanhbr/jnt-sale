import styled from 'styled-components'
import { ICON_CONVERSATION } from '../../../interface/icon'
import { Text } from '../../../../../../../common/text'
import React, { useEffect, useRef, useState } from 'react'
import useFacebookConversationTyping from '../../../hooks/useFacebookConversationTyping'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Tooltip as TooltipCore } from '../../../../../../../common/tooltip'
import { ICONS } from '../../../../autoResponses/interface/_constants'
import { StyledFacebookResponseContentScriptDetailDrawer } from './_styled'
import useAutosizeTextArea from './useAutosizeTextArea'
import {
  CarouselModal,
} from '../../../../responseContentScript/components/detailDrawer'

export const InputTyping = () => {
  const wrapperRef = useRef(null)
  const wrapperRef2 = useRef(null)
  const { data, typing, methods } = useFacebookConversationTyping()
  const { scriptResponse } = typing
  const { media } = typing
  const isActionActive = typing.text.search
  const hoverInputRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (scriptResponse.list.length == 0) {
      methods.getScripts()
    }
  }, [])

  useEffect(() => {
    function handleClickOutside (event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !wrapperRef2.current.contains(event.target)
      ) {
        // setIsActionActive(false)
        methods.handleDisplayModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [wrapperRef])

  const handleActiveItem = (n, isUp) => {
    const menuListItem = menuRef.current.querySelectorAll(
      '.filter__content-items',
    )

    if (isUp) menuRef.current.scrollTop -= 25
    else if (isUp === false) menuRef.current.scrollTop += 30

    menuListItem.forEach(item => item.setAttribute('data-hover', 'false'))

    const findItem = menuListItem[n] || null
    if (!!findItem) findItem.setAttribute('data-hover', 'true')

    if (hoverInputRef?.current)
      hoverInputRef.current.value = Math.max(
        0,
        Math.min(n, menuListItem.length),
      )
  }

  const handleSelectItem = () => {
    const findItem = menuRef.current.querySelector(
      '.filter__content-items[data-hover="true"]',
    )

    const currentHover = Number(hoverInputRef.current.value)

    if (findItem) findItem.click()

    handleActiveItem(currentHover)

    methods.handleDisplayModal(false)
  }
  const handleWindowBtnClick = e => {
    const hoverValue = hoverInputRef?.current
      ? hoverInputRef.current.value
      : null

    if (hoverValue === null) return

    if (e.keyCode === 13) handleSelectItem()
    if (e.keyCode === 38) handleActiveItem(Number(hoverValue) - 1, true)
    if (e.keyCode === 40) handleActiveItem(Number(hoverValue) + 1, false)
  }

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (wrapper) {
      if (isActionActive) wrapper.classList.add('--overflow-hidden')
      else wrapper.classList.remove('--overflow-hidden')
    }

    if (!!!menuRef?.current) return
    const items = menuRef.current.querySelectorAll('.filter__content-items')
    const activeIndex = [...items].findIndex(
      item =>
        item.getAttribute('data-active') === 'true' ||
        !!item.querySelector('[data-checked="true"]'),
    )

    handleActiveItem(activeIndex !== -1 ? activeIndex : 0)

    items.forEach((item, i) =>
      item.addEventListener('mouseenter', () => handleActiveItem(i)),
    )
    window.addEventListener('keyup', handleWindowBtnClick)

    return () => {
      window.removeEventListener('keyup', handleWindowBtnClick)
      items.forEach((item, i) =>
        item.removeEventListener('mouseenter', () => handleActiveItem(i)),
      )
    }
  }, [isActionActive])

  const inputRef = useRef(null)
  useEffect(() => {
    if (inputRef.current && media.imageTemp.length > 0) {
      inputRef.current.focus()
    }
  }, [media.imageTemp])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [typing.text.commentType])

  useAutosizeTextArea(inputRef.current, typing?.text?.value)
  return (
    <Styled
      ref={wrapperRef2}>
      <div className={'conversation-typing'}>
        <StyledFacebookResponseContentScriptDetailDrawer>
          <Galleries
            type={data.detail.conversation?.type}
            data={media?.imageTemp}
            onChange={methods.handleImageFileChange}
            onCreateClick={() => ''
            }
            onImageClick={index => methods?.handleSetShowCarouselMedia({ defaultIndex: index })}
            onImageDelete={imageId => methods.handleImageDelete(imageId)}
            onDeleteAllClick={_ => methods.handleImageDeleteAll()}
          />
        </StyledFacebookResponseContentScriptDetailDrawer>
        {!!media?.carousel && (
          <CarouselModal
            config={{defaultIndex: media?.carousel.defaultIndex, backdrop: true }}
            data={media?.imageTemp.map((item, i) => ({ id: `image-${i}`, name: i, url: item.url }))}
            onClose={() => methods.handleSetShowCarouselMedia(false)}
          />
        )}
        <textarea
          id="review-text"
          onChange={e => methods.handleChangeInputTyping(e.target.value)}
          placeholder="Nhập nội dung phản hồi, /trả lời nhanh, nhấn Shift + Enter để xuống dòng, Enter để gửi"
          ref={inputRef}
          rows={1}
          value={typing?.text?.value}
          onKeyDown={e => methods.handleSubmit(e)}
        />
      </div>
      {isActionActive && (
        <StyledRowMenuPopover>
          <div className={'filter-content'} ref={wrapperRef}>
            <div className={'filter__content common-scrollbar'} ref={menuRef}>
              <input ref={hoverInputRef} type="hidden"/>
              {
                scriptResponse?.list.length > 0 ?
                  scriptResponse?.list.map(item => {
                    return (
                      <div className={'filter__content-items'} onClick={() => {
                        methods.handleSelectItem(item, { fast: '/' })
                        // setIsActionActive(false)
                      }}>
                        <div style={{ width: '100%', cursor: 'pointer',display:'flex',justifyContent:"space-between" }}>
                          <div style={{maxWidth:'569px'}}>
                            <Tooltip className={'filter__content-tooltip'}
                                    title={item?.message}
                                    baseOn={'width'}>
                              <Text as={'p'} fontSize={13} lineHeight={'140%'} color={'#00081D'}>
                                {item?.message}
                              </Text>
                            </Tooltip>
                            <Tooltip className={'filter__content-tooltip'}
                                    title={item?.keyword}
                                    baseOn={'width'}>
                              <Text as={'p'} fontSize={10} lineHeight={'140%'} color={'#7C88A6'}>
                                /{item?.keyword}
                              </Text>
                            </Tooltip>
                          </div>
                          {item.image &&
                              <div style={{position: 'relative'}}>
                              <div
                                className={'filter__content-images'}
                                style={{
                                  backgroundImage: JSON.parse(item.image).length > 1 ? `linear-gradient(0deg, rgba(30, 154, 152, 0.7), rgba(30, 154, 152, 0.7)), url(${JSON.parse(item.image)[0]})` : `url(${JSON.parse(item.image)[0]})`, 
                                  backgroundSize:JSON.parse(item.image).length > 1 ? 'cover' :'i'}}
                              ></div>
                              {JSON.parse(item.image).length > 1 && 
                                <Text as={'p'} fontSize={13} lineHeight={'140%'} color={'#FFFFFF'} fontWeight={600} style={{position:'absolute', top:'10px', right: '16px'}}>
                                  + {JSON.parse(item.image).length}
                                </Text>
                              }
                            </div>
                          }
                        </div>
                      </div>
                    )
                  })
                  :
                  <div className="post-modal__empty"
                       style={{ textAlign: 'center', paddingTop: '30px', paddingBottom: '24px' }}>
                    {ICONS.noPost}
                    {
                      !!typing?.text?.value ?
                        <Text as={'p'} fontSize={13} lineHeight={'140%'} style={{ width: 'auto', justifyContent: 'center'}}>
                          Không tìm thấy mẫu nội dung phản hồi
                        </Text>
                        :
                        <Text as={'p'} fontSize={13} lineHeight={'140%'} style={{ width: 'auto',justifyContent: 'center' }}>
                          Dường như trang của bạn chưa có mẫu nội dung phản hồi nào.
                        </Text>
                    }
                  </div>
              }
            </div>
            <div className="filter__footer"
                 onClick={() => {
                   methods.handleDetailChange({ type: 'create' })
                   // setIsActionActive(false)
                 }}>
              <Text color={'#00081D'}
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
              >
                Di chuyển lên/xuống {ICON_CONVERSATION.arrowCircleUp} {ICON_CONVERSATION.arrowCircleDown} và nhấn
                Enter {ICON_CONVERSATION.keyEnter} để sử dụng</Text>
            </div>
          </div>
        </StyledRowMenuPopover>
      )}
    </Styled>
  )
}

const Galleries = ({
  data,
  validate,
  onChange,
  onCreateClick,
  onImageClick,
  onImageDelete,
  type,
  onDeleteAllClick,
  ...props
}) => {
  const inputFileRef = useRef(null)
  const MAX_NUMBER_OF_IMAGES = type == 2 ? 1 : 15
  return (
    <div
      {...props}
      className={`facebook-response-content-script-detail-drawer__galleries ${
        props?.className || ''
      }`}
    >
      {data.length > 0 &&
      <div className="facebook-response-content-script-detail-drawer__galleries-list">
        {data.length < MAX_NUMBER_OF_IMAGES && (
          <>
            <div
              className="facebook-response-content-script-detail-drawer__galleries-deleteall"
              onDrop={e => {
                e.preventDefault()
                onChange(e)
              }}
              onClick={() => {
                if (onDeleteAllClick) onDeleteAllClick()
              }}
            >
              <TooltipCore
                title={'Xóa tất cả'}>
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="1" width="20" height="20" rx="10" fill="white"/>
                  <path
                    d="M10 10.371L13.2411 7.13092C13.2823 7.08962 13.3313 7.05684 13.3852 7.03447C13.4391 7.01209 13.4969 7.00055 13.5552 7.0005C13.6136 7.00045 13.6714 7.0119 13.7253 7.03419C13.7793 7.05649 13.8283 7.08918 13.8696 7.13042C13.9109 7.17166 13.9437 7.22062 13.966 7.27452C13.9884 7.32843 14 7.38621 14 7.44457C14 7.50294 13.9886 7.56074 13.9663 7.61467C13.944 7.66861 13.9113 7.71763 13.8701 7.75893L10.629 11L13.8691 14.2411C13.9104 14.2823 13.9432 14.3313 13.9655 14.3852C13.9879 14.4391 13.9995 14.4969 13.9995 14.5552C13.9995 14.6136 13.9881 14.6714 13.9658 14.7253C13.9435 14.7793 13.9108 14.8283 13.8696 14.8696C13.8283 14.9109 13.7794 14.9437 13.7255 14.966C13.6716 14.9884 13.6138 15 13.5554 15C13.4971 15 13.4393 14.9886 13.3853 14.9663C13.3314 14.944 13.2824 14.9113 13.2411 14.8701L10 11.629L6.75893 14.8691C6.7177 14.9104 6.66873 14.9432 6.61483 14.9655C6.56092 14.9879 6.50314 14.9995 6.44478 14.9995C6.38642 14.9995 6.32862 14.9881 6.27468 14.9658C6.22074 14.9435 6.17172 14.9108 6.13042 14.8696C6.08912 14.8283 6.05634 14.7794 6.03397 14.7255C6.01159 14.6716 6.00005 14.6138 6 14.5554C5.99995 14.4971 6.0114 14.4393 6.03369 14.3853C6.05599 14.3314 6.08868 14.2824 6.12992 14.2411L9.37099 11L6.13092 7.75893C6.04751 7.67565 6.00059 7.56265 6.0005 7.44478C6.00041 7.32691 6.04714 7.21383 6.13042 7.13042C6.2137 7.04701 6.3267 7.00009 6.44457 7C6.56244 6.99991 6.67552 7.04664 6.75893 7.12992L10 10.371Z"
                    fill="#FF424E" stroke="#FF424E" strokeWidth="0.5"/>
                  <rect y="1" width="20" height="20" rx="10" stroke="#EFF3FB" strokeWidth="1.5"/>
                </svg>
              </TooltipCore>
            </div>
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
        {data.map((item, i) => (
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
              {ICON_CONVERSATION.closeCircle}
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  )
}

const Styled = styled.div`

  textarea {
    resize: none;
    overflow: auto;
    min-height: 20px;
    max-height: 80px;
    background: transparent;
    width: 100%;
    border: 0;
    padding: 12px 16px;
    font-size: 13px;
    line-height: 140%;
    padding-right: 110px;
  }
  width: 100%;
  position: relative;
  .response-content{
    &__icon{
      cursor: pointer;
    }
  }
  .conversation-typing{
    background: #EFF3FB;
    border-radius: 6px;
    border: 1px solid transparent;
    :hover{
      border: 1px solid #2BB8A9;
    }
    &__input{
      background: transparent;
      border: none;
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 13px;
      color: #00081D;
      user-select: text;
      white-space: pre-wrap;
      word-break: break-word;
      :before{
        content: attr(placeholder);
        cursor: text;
        background: none;
        color: #7C88A6;
        display: block;
        position: absolute;
        left: 18px;
        right: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        pointer-events: none;
      }
    }
  }
`

const StyledRowMenuPopover = styled.div`
  background: #ffffff;
  padding: 16px 8px 16px 16px;
  width: 100%;
  position: absolute;
  top: -310px;
  left: 0;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  .filter{
    &__title{
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &__input-wide{
      margin-bottom: 16px;
    }
    &__content {
      height: 260px;
      overflow: auto;
      position: relative;
      margin-left: -8px;
      margin-bottom: 16px;
      &-items {
        margin-left: -8px;
        padding: 3px 0 3px 18px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        color: #00081d;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        transition: color 0.25s;
        :hover{
          background: #F3F6FC;
          border-radius: 4px;
        }
        &[data-hover='true']{
          background: #F3F6FC;
          border-radius: 4px;
        }
      }
      &-images{
        width: 36px;
        height: 36px;
        border-radius: 4px;
        margin-right: 8px;
      }
      &-tooltip{
          display: -webkit-box !important;
          max-width: 100%;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
      }
    }
    &__footer{
      height: 48px;
      width: 100%;
      background: #FFFFFF;
      border-radius: 0px 0px 8px 8px;
      display: flex;
      align-items: center;
      position:absolute;
      bottom: 0;
      left: 0;
      padding-left: 20px;
      border-top: 1px solid #EBEEF5;
    }  
  }

`
