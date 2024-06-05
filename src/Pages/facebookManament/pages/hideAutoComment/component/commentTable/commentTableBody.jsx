import React, { useContext, useState } from 'react'
import { FacebookHideAutoCommentContext } from '../../provider/_context'
import { Tr } from '../../../../../../layouts/tableLayout/_tr'
import { Td } from '../../../../../../layouts/tableLayout/_td'
import { Text } from '../../../../../../common/text'
import { THEME_COLORS } from '../../../../../../common/theme/_colors'
import { CellStatusComment } from './_cellStatusComment'
import { CommentSkeleton } from '../skeleton'
import { FACEBOOK_ICONS } from '../../../../interfaces/_icons'
import useFacebookHideAutoComment from '../../hooks/useFacebookHideAutoComment'
import { Switch } from '../../../../../customer/components/switch'
import { TagInput } from '../../../../../../common/form/tagInput'
import { PageEmpty } from '../pageEmpty'
import { Tooltip } from '../../../../../../common/tooltip'

export const CommentTableBody = () => {

  const { state, dispatch } = useContext(FacebookHideAutoCommentContext)
  const displayList = state.table.display.updateList
  const loading = state.table.loading
  return (
    <div className={'comment-table common-scrollbar'} style={{height: 'calc(100vh - 328px)',overflow: 'auto',background: 'rgb(255, 255, 255)'}}>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => <OrderTr key={index} data={item}/>)
      ) : (
        loading ? <PageEmpty/> : <CommentSkeleton rows={7}/>
      )}
    </div>
  )
}

const OrderTr = ({ data, arr_detail, ...props }) => {
  const hideAutoComment = useFacebookHideAutoComment()
  const {methods} = hideAutoComment
  const validate = hideAutoComment.data?.validate || {}
  console.log(data.hide_comment)
  return (
    <>
      <Tr
        {...props}
        className="comment-table__row"
      >
        <Td className="comment-table__cell" data-type="td">
          <div className={'comment-table__cell-page-content'}>
            <img src={data.page_avatar} alt={data.page_name} className="page-image"/>
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
        <Td className="comment-table__cell" data-type="td">
          <CellStatusComment id={data.status}>
            {+data.status === 1 ? 'Đã kết nối' : 'Chưa kết nối'}
          </CellStatusComment>
        </Td>
        <Td className="comment-table__cell" data-type="td">
          <Switch disabled={false}
                  onChange={e => {
                    methods?.onChangeHiddenStatus({ id: data?.id, hide_comment: +data.hide_comment !== 1 ? 1 : 0 })
                  }
                  }
                  checked={+data.hide_comment === 1}
          />
        </Td>
        <Td className="comment-table__cell" data-type="td">
          <Switch
                  onChange={e => {
                    methods?.onChangeHiddenStatus({ id: data?.id, hide_comment: +data.hide_comment !== 2 ? 2 : 0 })
                  }
                  }
                  checked={+data.hide_comment === 2}
          />
        </Td>
        <Td className="comment-table__cell" data-type="td">
          <Tooltip
            className="custom-tooltip__input-tag --danger"
            placement="bottom"
            title={data.id == validate?.hide_text?.index ? validate?.hide_text?.text : ''}
          >
            <TagInput
              style={{width: '100%',minHeight: '72px'}}
              defaultValue={data.hide_text}
              disabled={data.hide_comment == 1 ? true : false}
              onChange={(val) => methods.onChangeHiddenCommentHasKeyword(val,data)}
              length={10}
              validate={(data.id == validate?.hide_text?.index && !!validate?.hide_text?.text)}
            />
          </Tooltip>
        </Td>
      </Tr>
    </>
  )
}
