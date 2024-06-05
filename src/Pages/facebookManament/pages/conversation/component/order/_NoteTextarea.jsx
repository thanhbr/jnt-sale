import { Textarea } from 'common/form/textarea'
import { Popper } from 'common/popper'
import { FACEBOOK_ICONS } from 'Pages/facebookManament/interfaces/_icons'
import useFacebookConversationOrder from '../../hooks/useFacebookConversationOrder'
import { NoteList } from './_NoteList'
import React, { useContext } from 'react'
import { FacebookConversationContext } from '../../provider/_context'
import { OrderFacebookDeliveryNoteList } from './deliveryNotePopper'
import styled from 'styled-components'

export const OrderNote = ({ props }) => {
  const { state, dispatch } = useContext(FacebookConversationContext)
  const { data, shippingMethods, properties } = useFacebookConversationOrder()
  const { note } = data.shippingInfo

  const handleChange = content => {
    shippingMethods.onNote.onDeliveryNoteChange(content)
  }

  return (
    <Styled>
      {/* <Textarea*/}
      {/*  label="Ghi chú giao hàng"*/}
      {/*  labelTooltip={*/}
      {/*    'Bạn có thể nhập theo cú pháp "/Nội dung ghi chú" để hệ thống đề xuất nhanh mẫu ghi chú giao hàng.'*/}
      {/*  }*/}
      {/*  placeholder='Nhập ghi chú hoặc sử dụng cú pháp: "/Nội dung ghi chú" để chọn nhanh mẫu ghi chú'*/}
      {/*  value={note.keyword}*/}
      {/*  onChange={e => shippingMethods.onNote.keywordChange(e.target.value)}*/}
      {/*  onIconClick={() => {}}*/}
      {/*  icon={*/}
      {/*    <Popper*/}
      {/*      placement="top-end"*/}
      {/*      renderPopper={({onClose}) => (*/}
      {/*        <NoteList*/}
      {/*          list={note.list}*/}
      {/*          activeValue={note.value?.value}*/}
      {/*          canLoadMore={!note.loadingMore}*/}
      {/*          onClose={onClose}*/}
      {/*          onLoadMore={shippingMethods.onNote.loadMore}*/}
      {/*          onItemClick={shippingMethods.onNote.change}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    >*/}
      {/*      {FACEBOOK_ICONS.note}*/}
      {/*    </Popper>*/}
      {/*  }*/}
      {/*/>*/}
      <Textarea
        className={'textarea-delivery__note'}
        label={'Ghi chú giao hàng'}
        labelTooltip={
          'Bạn có thể nhập theo cú pháp "/Nội dung ghi chú" để hệ thống đề xuất nhanh mẫu ghi chú giao hàng.'
        }
        placeholder='Nhập ghi chú hoặc sử dụng cú pháp: "/Nội dung ghi chú" để chọn nhanh mẫu ghi chú'
        {...props}
        dropdown={
          state.deliveryNote.length > 0
            ? ({ onClose }) => (
              <>
                <OrderFacebookDeliveryNoteList
                  data={state.deliveryNote}
                  value={note.keyword}
                  onClose={onClose}
                  onSelect={handleChange}
                />
              </>
            )
            : undefined
        }
        value={note.keyword}
        // onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value)}
        icon={FACEBOOK_ICONS.note}
        onIconClick={_ => handleChange(note.keyword)}
        validateText={properties.errorDeliveryNote ? 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự!' : ''}
        validateType={'danger'}
        maxLength={256}
      />
    </Styled>
  )
}
const Styled = styled.div`
  textarea{
    resize: none!important;
  }
`