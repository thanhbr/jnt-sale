import { ICON_CONVERSATION } from '../../../interface/icon'

import styled from 'styled-components'
import { Input } from '../../../../../../../common/form/input'
import { ResponseContentModal } from '../responContentModal'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { FacebookResponseContentScriptDetailDrawer } from '../../../../responseContentScript/components/detailDrawer'
import React, {useRef} from 'react'
import { Drawer } from '@mui/material'
import useFacebookConversationTyping from '../../../hooks/useFacebookConversationTyping'
import { InputTyping } from './inputTyping'
import { Tooltip } from '../../../../../../../common/tooltip'

export const TypingCustomer = () => {

  const {data, typing, methods } = useFacebookConversationTyping()
  const { scriptResponse } = typing
  const {detail} = scriptResponse
  const inputFileRef = useRef()
  return (
    <StyledTyping>
      <div style={{cursor: 'pointer'}}
           onClick={() => {
             if (inputFileRef?.current) {
               inputFileRef.current.value = ''
               inputFileRef.current.click()
             }
           }}
           className={'media-upload'}
      ><Tooltip title={'Tải ảnh lên'}>{ICON_CONVERSATION.image}</Tooltip></div>
      <div
           onClick={e => (!!typing?.text?.value || typing.media?.imageTemp.length > 0) ? methods.handleSubmit(e) : ''}
           data-active={!!typing?.text?.value || typing.media?.imageTemp.length > 0}
           className={'send-message'}
           ><Tooltip title={'Gửi phản hồi'}>{ICON_CONVERSATION.sendMess}</Tooltip></div>
      <input
        ref={inputFileRef}
        accept="image/png, image/jpeg, image/jpg"
        type="file"
        multiple={data.detail.conversation?.type == 1 ? true : false}
        style={{display: 'none'}}
        onChange={methods.handleImageFileChange}
      />
      <InputTyping/>
      <ResponseContentModal
        typing={typing}
        methods={methods}
        onSelect={methods?.handleSelectItem}
      />
      <StyledRightDrawer
        anchor="right"
        open={!!detail?.type}
        onClose={() =>
          detail?.data?.modifiled
            ? methods.handleDetailConfirmToggle(true)
            : methods.handleDetailChange(null)
        }
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: -24,
            width: 24,
            height: 24,
            cursor: 'pointer',
          }}
          onClick={e => {
            e.stopPropagation()
            detail?.data?.modifiled
              ? methods.handleDetailConfirmToggle(true)
              : methods.handleDetailChange(null)
          }}
        >
          {FACEBOOK_ICONS.x01}
        </div>
        <FacebookResponseContentScriptDetailDrawer
          detail={detail}
          exit={detail?.data?.confirm}
          loading={detail?.data?.loading}
          modifiled={detail?.data?.modifiled}
          onClose={() => methods.handleDetailChange(null)}
          onExitToggle={methods.handleDetailConfirmToggle}
          onLoadingToggle={methods.handleDetailLoadingToggle}
          onModifiledToggle={methods.handleDetailModifiledToggle}
          onRefetch={() => methods.handleSearchChange('', {notLoading: true})}
        />
      </StyledRightDrawer>
    </StyledTyping>
  )
}
const StyledTyping = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px 24px 16px;
  margin-bottom: 24px;
  position: relative;
  .media-upload{
    position: absolute;
    z-index: 2;
    right: 92px;
    bottom: 32px;
    padding: 4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    :hover{
      background: #DEE7F7;
    }
  }
  .send-message{
    position: absolute;
    z-index: 2;
    right: 28px;
    bottom: 32px;
    padding: 4px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    :hover{
      cursor: not-allowed;
    }
    &[data-active='true']{
      svg{
        g{
          opacity: 1;
        }
        path{
          stroke: rgb(30, 154, 152);
        }
      }
      :hover{
        background: #DEE7F7;
        cursor: pointer;
      }
    }
  }
  .conversation-typing{
    width: 100%;
  }
`

const StyledRightDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    height: calc(100% - 3.5rem);
    margin-top: 3.5rem;

    overflow: unset;
  }
`
