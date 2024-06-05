import React, { useContext, useState } from 'react'
import { FacebookConversationStickersContext } from '../../provider/_context'
import { Tr } from '../../../../../../layouts/tableLayout/_tr'
import { Td } from '../../../../../../layouts/tableLayout/_td'
import { Text } from '../../../../../../common/text'
import { CommentSkeleton } from '../skeleton'
import useFacebookConversationStickers from '../../hooks/useFacebookConversationStickers'
import {ICONS} from "../../interface/_constants";
import {RowMenuPopover} from "./_rowMenuPopover";
import {Tooltip} from "../../../../../../common/tooltip";
import { fDateTimeSuffix } from '../../../../../../util/formatTime'
import { CellColor } from './_cellColor'

export const CommentTableBody = () => {

  const { state, dispatch } = useContext(FacebookConversationStickersContext)
  const displayList = state.table.display.updateList
  const loading = state.table.loading
  return (
    <div className={"AutoResponses-table"} style={{maxHeight: '636px',background: 'rgb(255, 255, 255)',overflow: 'auto'}}>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => <OrderTr key={index} data={item}/>)
      ) : (
        loading ? 'rỗng' : <CommentSkeleton rows={7}/>
      )}
    </div>
  )
}

const OrderTr = ({ data, arr_detail, ...props }) => {
  const { methods } = useFacebookConversationStickers()
   const arrFunction = [methods.onShowEditSticker, methods.onShowConfirmDelete]
   const handleItemClick = (key, data) => {
      (arrFunction[key])(data)
   }
  return (
    <>
      <Tr
        {...props}
        className="AutoResponses-table__row"
      >
        <Td className="AutoResponses-table__cell" data-type="td">
           <Tooltip title={'Kéo thả để thay đổi vị trí nhãn.'} placement={'bottom-start'}>{ICONS.drag}</Tooltip>
        </Td>
        <Td className="AutoResponses-table__cell" data-type="td">
          {data?.name}
        </Td>
        <Td className="AutoResponses-table__cell" data-type="td">
          <CellColor data={data}/>
        </Td>
        <Td className="AutoResponses-table__cell" data-type="td">
          {!!data?.created_at && fDateTimeSuffix(data?.created_at)}
        </Td>
        <Td className="AutoResponses-table__cell" data-type="td">
           <RowMenuPopover item={data} onActionClick={handleItemClick}/>
        </Td>
      </Tr>
    </>
  )
}
