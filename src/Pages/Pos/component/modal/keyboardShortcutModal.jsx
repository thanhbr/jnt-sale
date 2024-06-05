import React from 'react'
import { Box, Modal } from '@mui/material'
import styled from 'styled-components'
import { usePosQuickProduct } from '../../hooks/usePosQuickProduct'
import { Text } from '../../../../common/text'
import { keyboardShortCutLeft, keyboardShortCutRight } from '../../constants/contant'

const KeyboardShortcutModal = () => {
  const { modalShortcut } = usePosQuickProduct()
  return (
    <Modal open={modalShortcut.shortcut} onClose={() => modalShortcut.onClickShortcut(false)}>
      <Box>
        <StyledModalPaymentMethod>
          <div className={'shortcut-container'}>
            <div className={'shortcut-container__header'}>
              <div className={'shortcut-container__header-left'}>
                <Text as={'p'} fontSize={20} fontWeight={600}>Thao tác nhanh với phím tắt</Text>
                <Text as={'p'} color={'#7C88A6'}>Sử dụng phím tắt sẽ giúp thao tác lên đơn và thanh toán nhanh
                  hơn</Text>
              </div>
              <div className={'shortcut-container__header-right'} onClick={() => modalShortcut.onClickShortcut(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.6464 11.41L11.9999 11.7635L12.3535 11.4101L17.2151 6.54999L17.2154 6.54965C17.2309 6.53416 17.2493 6.52187 17.2695 6.51349C17.2897 6.50509 17.3113 6.50077 17.3332 6.50075C17.3551 6.50073 17.3768 6.50503 17.397 6.51338C17.4172 6.52174 17.4356 6.534 17.4511 6.54946C17.4666 6.56492 17.4789 6.58328 17.4873 6.6035C17.4957 6.62371 17.5 6.64538 17.5 6.66726C17.5 6.68914 17.4957 6.71081 17.4874 6.73104C17.479 6.75116 17.4669 6.76945 17.4515 6.78489C17.4514 6.78497 17.4514 6.78505 17.4513 6.78513L12.59 11.6464L12.2365 11.9999L12.5899 12.3535L17.45 17.2151L17.4503 17.2154C17.4658 17.2309 17.4781 17.2493 17.4865 17.2695C17.4949 17.2897 17.4992 17.3113 17.4992 17.3332C17.4993 17.3551 17.495 17.3768 17.4866 17.397C17.4783 17.4172 17.466 17.4356 17.4505 17.4511C17.4351 17.4666 17.4167 17.4789 17.3965 17.4873C17.3763 17.4957 17.3546 17.5 17.3327 17.5C17.3109 17.5 17.2892 17.4957 17.269 17.4874C17.2489 17.4791 17.2306 17.4669 17.2152 17.4516C17.2151 17.4515 17.215 17.4514 17.2149 17.4513L12.3536 12.59L12.0001 12.2365L11.6465 12.5899L6.7849 17.45L6.78456 17.4503C6.7691 17.4658 6.75074 17.4781 6.73053 17.4865C6.71032 17.4949 6.68866 17.4992 6.66677 17.4992C6.64489 17.4993 6.62321 17.495 6.60299 17.4866C6.58277 17.4783 6.56439 17.466 6.5489 17.4505C6.53342 17.4351 6.52113 17.4167 6.51274 17.3965C6.50435 17.3763 6.50002 17.3546 6.5 17.3327C6.49998 17.3109 6.50428 17.2892 6.51263 17.269C6.52096 17.2488 6.53316 17.2305 6.54854 17.215C6.5486 17.215 6.54866 17.2149 6.54871 17.2149L11.41 12.3536L11.7635 12.0001L11.4101 11.6465L6.54999 6.7849L6.54965 6.78456C6.51837 6.75334 6.50078 6.71097 6.50075 6.66677C6.50071 6.62258 6.51824 6.58018 6.54946 6.5489C6.58069 6.51763 6.62306 6.50004 6.66726 6.5C6.71141 6.49996 6.75378 6.51746 6.78505 6.54863C6.78507 6.54866 6.7851 6.54869 6.78513 6.54871L11.6464 11.41Z"
                    fill="#7C8EA0" stroke="#7C8EA0"/>
                  <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#EBEEF5"/>
                </svg>
              </div>
            </div>
            <div className={'shortcut-container__body'}>
              <div className="shortcut-container__body-left">
                {keyboardShortCutLeft.map((keyCode, key) => (
                  <div className="body-group-keyboard" key={key}>
                    <div className="body-title">
                      <Text fontWeight={600}> {keyCode.title} </Text>
                    </div>
                    {keyCode.content.map((item, code) => (
                      <div className="body-keyboard-shortcut" key={code}>
                        <Text className="body-keyboard-shortcut__text">{item.text}</Text>
                        {
                          Array.isArray(item.icon)
                            ? item.icon.map((icon, index) => {
                              return (
                                <>
                                  <div className="body-keyboard-shortcut__icon">
                                    {icon}
                                  </div>
                                  {index < item.icon.length - 1 && <div className="body-keyboard-shortcut__icon-extra">
                                    +
                                  </div>}
                                </>
                              )
                            })
                            :
                            <div className="body-keyboard-shortcut__icon">
                              {item.icon}
                            </div>
                        }
                      </div>
                    ))}
                  </div>))}
              </div>
              <div className="shortcut-container__body-right">
                {keyboardShortCutRight.map((keyCode, key) => (
                  <div className="body-group-keyboard" key={key}>
                    <div className="body-title">
                      <Text fontWeight={600}> {keyCode.title} </Text>
                    </div>
                    {keyCode.content.map((item, code) => (
                      <div className="body-keyboard-shortcut" key={code}>
                        <Text className="body-keyboard-shortcut__text">{item.text}</Text>
                        {
                          Array.isArray(item.icon)
                            ? item.icon.map((icon, index) => {
                              return (
                                <>
                                  <div className="body-keyboard-shortcut__icon">
                                    {icon}
                                  </div>
                                  {index < item.icon.length - 1 && <div className="body-keyboard-shortcut__icon-extra">
                                     +
                                  </div>}
                                </>
                              )
                            })
                            :
                            <div className="body-keyboard-shortcut__icon">
                              {item.icon}
                            </div>
                        }
                      </div>
                    ))}
                  </div>))}
              </div>
            </div>
          </div>
        </StyledModalPaymentMethod>
      </Box>
    </Modal>
  )
}

export default KeyboardShortcutModal

export const StyledModalPaymentMethod = styled.div`
  width: 930px;
  height: 596px;
  background: #fff;
  border-radius: 8px;
  
  margin: auto;
  margin-top: 110px;
  padding: 24px;
  position: relative;
  
  @media screen and (max-height: 700px){
    margin-top: 22px;
  }
  .shortcut-container{
    &__header{
      display: flex;
      align-items: start;
      justify-content: space-between;
      &-right{
        cursor: pointer;
      }
    }
    &__body{
      display: flex;
      justify-content: space-between;
      align-items: start;
      &-left{
        width: 45%;
      }
      &-right{
        width: 45%;
      }
    }
  }
    
  .body-group-keyboard{
    margin-top: 24px;
    .body-title{
      margin-bottom: 14px;
      &:last-child{
        margin-bottom: 0;
      }
    }
    .body-keyboard-shortcut{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      &:last-child{
        margin-bottom: 0;
      }
      &__text{
        width: 80%!important;
      }
      &__icon{
        height: 24px;
        padding: 3px 5px;
        text-align: center;
        background: #F4F6F6;
        border-radius: 4px;
        font-weight: 600!important;
      }
    }
  }
`
