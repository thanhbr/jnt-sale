import styled from 'styled-components'
import { ICON_CONVERSATION } from '../../../interface/icon'
import { Text } from '../../../../../../../common/text'
import React, { useEffect, useRef, useState } from 'react'
import { ORDER_ICONS } from '../../../../../../refactorOrder/interfaces/_icons'
import { Input } from '../../../../../../../common/form/input'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { Tooltip as TooltipCore } from '../../../../../../../common/tooltip'
import { ICONS } from '../../../../autoResponses/interface/_constants'

export const ResponseContentModal = ({typing,methods,onSelect,addScript=true,...props}) => {
  const [isActionActive, setIsActionActive] = useState(false)
  const wrapperRef = useRef(null)
  const wrapperRef2 = useRef(null)
  const { scriptResponse } = typing

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
        setIsActionActive(false)
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

  return (
    <Styled
      ref={wrapperRef2}>
      <div className={`respon-content ${props?.className || ''}`}>
        <div className="content-modal">
          <div
            className={'response-content__icon'}
            onClick={() => {
              setIsActionActive(prev => !prev)
              methods.getScripts()
            }}
          >
            <TooltipCore title={'Mẫu nội dung phản hồi'}>{props?.icon ? props?.icon : ICON_CONVERSATION.hamburger}</TooltipCore>
          </div>
          {isActionActive && (
            <StyledRowMenuPopover>
              <div className={'filter-content'} ref={wrapperRef}>
                <div className={'filter__title'}>
                  {
                    addScript
                      ?
                      <Text color={'#1A94FF'}
                            style={{cursor: 'pointer'}}
                            onClick={() => {
                              methods.handleDetailChange({ type: 'create' })
                              setIsActionActive(false)
                            }}>Thêm mới</Text>
                      :
                      ''
                  }
                  <Text fontWeight={600}>Mẫu nội dung phản hồi</Text>
                  <Text as={'a'} href={'/facebook/response-content-scripts'} target={'_blank'} color={'#1A94FF'}>Quản
                    lý</Text>
                </div>
                <Input
                  className="filter__input-wide"
                  icon={ORDER_ICONS.searchMd}
                  placeholder="Tìm mẫu nội dung phản hồi"
                  value={scriptResponse?.keyword}
                  onChange={e => methods.handleSearchChange(e.target.value)}
                />
                <div className={'filter__content common-scrollbar'} ref={menuRef}>

                  <input ref={hoverInputRef} type="hidden"/>
                  {
                    scriptResponse?.list.length > 0 ?
                      scriptResponse?.list.map(item => {
                        return (
                          <div className={'filter__content-items'} onClick={() => {
                            onSelect(item)
                            setIsActionActive(false)
                          }}>
                            <div style={{ width: '100%', cursor: 'pointer',display:'flex',justifyContent:"space-between" }}>
                              <div style={{maxWidth:'395px'}}>
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
                                      backgroundSize:'cover'}}
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
                          !!scriptResponse?.keyword ?
                            <Text as={'p'} fontSize={13} lineHeight={'140%'} style={{ width: 'auto', justifyContent: 'center' }}>
                              Không tìm thấy mẫu nội dung phản hồi
                            </Text>
                            :
                            <Text as={'p'} fontSize={13} lineHeight={'140%'} style={{ width: 'auto',justifyContent: 'center' }}>
                              Dường như trang của bạn chưa có mẫu nội dung phản hồi nào. <br/>
                              Vui lòng thêm mới nội dung phản hồi để sử dụng tính năng
                            </Text>
                        }
                      </div>
                  }
                </div>
                <div className="filter__footer"
                    onClick={() => {
                      methods.handleDetailChange({type: 'create'})
                      // setIsActionActive(false)
                    }}>
                  <Text color={'#00081D'}
                        style={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                  >
                    Di chuyển lên/xuống  {ICON_CONVERSATION.arrowCircleUp} {ICON_CONVERSATION.arrowCircleDown} và nhấn
                    Enter {ICON_CONVERSATION.keyEnter} để sử dụng</Text>
                </div>
              </div>
            </StyledRowMenuPopover>
          )}
        </div>
      </div>
    </Styled>
  )
}
const Styled = styled.div`

  .respon-content{
    position: absolute;
    bottom: 32px;
    right: 60px;
  }
  
  .response-content__icon{
    padding: 4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    :hover{
      background: #DEE7F7;
      cursor: pointer;
    }
  }
  
  .content-modal{
    position: relative;
  }
  .response-content{
    &__icon{
      cursor: pointer;
    }
  }
`

const StyledRowMenuPopover = styled.div`
  background: #ffffff;
  padding: 16px 24px;
  min-width: 500px;
  position: absolute;
  top: -428px;
  right: 0;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  height: 412px;
  z-index: 1000;
  .filter{
    &__title{
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &__input-wide{
      margin-bottom: 12px;
    }
    &__content {
      height: 278px;
      overflow: auto;
      position: relative;
      margin-left: -12px;
      &-items {
        margin-left: -12px;
        padding: 3px 0 3px 24px;
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
      padding-left: 24px;
      cursor: pointer;
      border-top: 1px solid #EBEEF5;
    }  
  }

`
