import {Textarea} from 'common/form/textarea'
import {Popper} from 'common/popper'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle_OrderRequestSearchList} from '../_orderRequestSearchList'

export const FacebookLivestreamScriptSingle_OrderNote = () => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {note} = data.form

  return (
    <Textarea
      label="Yêu cầu giao hàng"
      placeholder="Nhập yêu cầu giao hàng"
      value={note.keyword}
      onChange={e =>
        shippingInfoMethods.handleNoteKeywordChange(e.target.value)
      }
      onIconClick={() => {}}
      icon={
        <Popper
          placement="top-end"
          renderPopper={({onClose}) => (
            <FacebookLivestreamScriptSingle_OrderRequestSearchList
              list={note.list}
              activeValue={note.value?.value}
              canLoadMore={!note.loadingMore}
              onClose={onClose}
              onLoadMore={shippingInfoMethods.handleNoteLoadMore}
              onItemClick={shippingInfoMethods.handleNoteChange}
            />
          )}
        >
          {FACEBOOK_ICONS.note}
        </Popper>
      }
    />
  )
}
