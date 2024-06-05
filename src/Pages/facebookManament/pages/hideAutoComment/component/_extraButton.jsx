import { Switch } from '../../../../customer/components/switch'
import React  from 'react'
import { Text } from '../../../../../common/text'
import useFacebookHideAutoComment from '../hooks/useFacebookHideAutoComment'

export default () => {

  const {data,methods} = useFacebookHideAutoComment()
  return (
    <div className={'extra-button'} style={{display: 'flex',marginBottom: '24px',justifyContent:'flex-end'}}>
      <div className={'extra-button__content'} style={{display: 'flex',marginRight:'4.25rem'}}>
        <Switch disabled={false}
                onChange={methods.onChangeHiddenAllCommentStatus}
                checked={data.extra.hiddenAllComment}
                style={{marginRight: '0.5rem'}}
        />
        <Text>Ẩn bình luận toàn bộ trang</Text>
      </div>
      <div className={'extra-button__content'} style={{display: 'flex',}}>
        <Switch disabled={false}
                onChange={methods.onChangeHiddenAllCommentHasPhone}
                style={{marginRight: '0.5rem'}}
                checked={data.extra.hiddenAllCommentHasPhone}
        />
        <Text>Ẩn bình luận chứa SĐT toàn bộ trang</Text>
      </div>
    </div>
  )
}