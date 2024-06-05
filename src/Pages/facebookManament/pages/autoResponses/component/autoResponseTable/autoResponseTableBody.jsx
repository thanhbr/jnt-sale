import React, { useContext, useState } from 'react'
import { FacebookAutoResponsesContext } from '../../provider/_context'
import { Tr } from '../../../../../../layouts/tableLayout/_tr'
import { Td } from '../../../../../../layouts/tableLayout/_td'
import { Text } from '../../../../../../common/text'
import { THEME_COLORS } from '../../../../../../common/theme/_colors'
import { CommentSkeleton } from '../skeleton'
import useFacebookAutoResponses from '../../hooks/useFacebookAutoResponses'
import { Switch } from '../../../../../customer/components/switch'
import { RowMenuPopover } from '../../../conversationStickers/component/commentTable/_rowMenuPopover'
import { PageEmpty } from '../pageEmpty/index'
import { OBJ_APPLY } from '../../interface/_constants'
import ReactImageFallback from 'react-image-fallback'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '../../../../../../common/tooltipv2'

export const AutoResponseTableBody = () => {
  const { methods } = useFacebookAutoResponses()
  const { state, dispatch } = useContext(FacebookAutoResponsesContext)
  const displayList = state.table.display.updateList
  const loading = state.table.loading
  return (
    <div className={'common-scrollbar'} style={{
      height: 'calc(100vh - 342px)',
      overflow: 'auto',
      background: 'rgb(255, 255, 255)'
    }}
      // onScroll={methods.onSroll()}
    >
      {displayList.length > 0 && !loading ? (
        displayList.map((item, index) => <OrderTr key={index} data={item}/>)
      ) : (
        !loading ? <PageEmpty/> : <CommentSkeleton rows={7}/>
      )}
    </div>
  )
}

const OrderTr = ({ data, arr_detail, ...props }) => {
  const { methods } = useFacebookAutoResponses()
  const navigate = useNavigate()
  const arrFunction = [() => navigate(`/facebook/auto-responses/edit/${data?.id}`), () => methods?.onClickDeleteConfirm(data?.id)]
  const handleItemClick = (key, data) => {
    (arrFunction[key])(data)
  }
  return (
    <>
      <Tr
        {...props}
        className="auto-response-table__row"
      >
        <Td className="auto-response-table__cell" data-type="td">
          <Tooltip className={'auto-response-table__tooltip-name'} placement="top" title={data?.script_name} baseOn="height">
          <Text as={'span'}>{data?.script_name}</Text>
          </Tooltip>
        </Td>
        <Td className="auto-response-table__cell" data-type="td">
          <div className={'auto-response-table__cell-page-content'}>
            <ReactImageFallback
              src={data.page_avatar}
              fallbackImage="/img/facebook.png"
              alt={data.page_name}
              className="page-image"
            />
            <Text
              color={THEME_COLORS.secondary_100}
              fontSize={13}
              fontWeight={400}
              lineHeight={20}
            >
              {data.page_name}
            </Text>
          </div>
        </Td>
        <Td className="auto-response-table__cell" data-type="td">
          <ul>
            <li style={{ marginBottom: '4px' }}>
              <Text>&bull; {OBJ_APPLY.post_type[data?.post_type || 1]}</Text>
            </li>
            <li>
              <Text>
                &bull; {OBJ_APPLY.comment_type[data?.comment_type || 1]}
              </Text>
            </li>
          </ul>
        </Td>
        <Td className="auto-response-table__cell" data-type="td">
          <Switch disabled={false}
                  onChange={_ => methods?.onClickStatusConfirm(data)}
                  checked={data?.status == 1 ? true : false}
          />
        </Td>
        <Td className="auto-response-table__cell" data-type="td">
          <RowMenuPopover item={data} onActionClick={handleItemClick}/>
        </Td>
      </Tr>
    </>
  )
}
