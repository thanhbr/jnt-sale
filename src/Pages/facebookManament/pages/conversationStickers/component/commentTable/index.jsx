import {DndCol} from 'common/dndCol'
import {FacebookResponseContentScript_Tbody} from './_tbody/index'
import {CommentTableHead} from './commentTableHead'
import {StyledFacebookConversationStickersTable} from './_styled'
import React, {useContext} from "react";
import {FacebookConversationStickersContext} from "../../provider/_context";
import {CommentSkeleton} from "../skeleton";
import useFacebookConversationStickers from '../../hooks/useFacebookConversationStickers'

export const FacebookConversationStickersTable = ({rows, ...props}) => {
   const {state,} = useContext(FacebookConversationStickersContext)
   const {methods} = useFacebookConversationStickers()
   const displayList = state.table.display.updateList
   const loading = state.table.loading
   return (
      <StyledFacebookConversationStickersTable {...props}>
         <CommentTableHead/>
         {displayList.length > 0 && loading ? <DndCol
               initial={rows.map(item => ({
                  id: item?.id,
                  content: <FacebookResponseContentScript_Tbody  data={item}/>,
               }))}
               style={{
                  height: 'calc(100vh - 284px)',
                  overflow: 'auto'
               }}
               onChange={methods.handleRowPositionUpdate}
            />
            : (
               loading ? 'rỗng' : <CommentSkeleton rows={7}/>
            )}
      </StyledFacebookConversationStickersTable>
   )
}
