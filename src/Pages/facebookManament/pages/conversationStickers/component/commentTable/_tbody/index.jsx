import { FACEBOOK_ICONS } from 'Pages/facebookManament/interfaces/_icons'
import { StyledFacebookResponseContentScript_Tbody } from './_styled'
import { Tooltip } from '../../../../../../../common/tooltip'
import React, { useState } from 'react'
import { CellColor } from '../_cellColor'
import { fDateTimeSuffix } from '../../../../../../../util/formatTime'
import useFacebookConversationStickers from '../../../hooks/useFacebookConversationStickers'
import { RowMenuPopover } from '../_rowMenuPopover'

export const FacebookResponseContentScript_Tbody = ({ data, ...props }) => {
  const { methods } = useFacebookConversationStickers()
  const arrFunction = [() => methods.onShowEditSticker(data), () => methods.onShowConfirmDelete(data)]
  const handleItemClick = (key, data) => {
    (arrFunction[key])(data)
  }
  return (
    <StyledFacebookResponseContentScript_Tbody {...props}>
      <div className="facebook-response-content-script-tbody__td">
        <Tooltip title={'Kéo thả để thay đổi vị trí nhãn.'}
                 placement={'bottom-start'}>{FACEBOOK_ICONS.threeDotsVertical}</Tooltip>
      </div>
      <div className="facebook-response-content-script-tbody__td">
        {data?.name || '---'}
      </div>
      <div className="facebook-response-content-script-tbody__td">
        <CellColor data={data}/>
      </div>
      <div className="facebook-response-content-script-tbody__td">
        {!!data?.created_at && fDateTimeSuffix(data?.created_at)}
      </div>
      <div className="facebook-response-content-script-tbody__td">
        {!Number(data?.is_bom) && <RowMenuPopover item={data} onActionClick={handleItemClick}/>}
      </div>
    </StyledFacebookResponseContentScript_Tbody>
  )
}
