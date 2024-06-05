import { THEME_SEMANTICS } from '../../../../../../../common/theme/_semantics'
import { Text } from '../../../../../../../common/text'
import { Radio } from '../../../../../../../common/form/radio'
import styled from 'styled-components'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'
import { Checkbox } from '../../../../../../../common/form/checkbox'
import { TagInput } from '../../../../../../../common/form/tagInput'
import React from 'react'
import { NotificationInside } from '../../../../../layouts/general/notificationInside'
import { Tooltip } from '../../../../../../../common/tooltip'

export default () => {
  const { data, methods } = useCreateFacebookAutoResponses()
  const comment = data?.postAndComment?.comment || {}
  const {validate} = data
  return (
    <Styledcomment>
      <Text as={'label'}>Chọn bình luận <Text color={THEME_SEMANTICS.failed}>*</Text></Text>
      <div className="option-content">
        <div className="radio-item" onClick={() => methods?.onChangeTypeComment(1)}>
          <Radio
            checked={comment?.type == 1 ? true : false}
            name="comment-info"
            style={{ transform: 'translateY(2px)' }}
          />
          <Text>Tất cả bình luận</Text>
        </div>
        <div className="radio-item" onClick={() => methods?.onChangeTypeComment(2)}>
          <Radio
            checked={comment?.type == 2 ? true : false}
            name="comment-info"
            style={{ transform: 'translateY(2px)' }}
          />
          <Text>Bình luận thỏa điều kiện</Text>
        </div>
      </div>
      <NotificationInside content={
        comment?.type == 1 ?
          'Với lựa chọn trên, hệ thống sẽ phản hồi tự động tất cả các bình luận của khách hàng đến trang.'
          :
          'Với lựa chọn trên, hệ thống sẽ phản hồi tự động những bình luận thỏa mãn điều kiện hoặc không thỏa mãn điều kiện chứa SĐT hoặc chứa từ khóa phụ thuộc vào thiết lập kịch bản của bạn.'
      }/>
      {comment?.type == 2 &&
      <div className={'comment-content'}>
        <Text as={'label'} className={'comment-content__label'}>Chọn điều kiện</Text>
        <div className="comment-content__checkbox">
          <div className="comment-content__phone-checkbox" onClick={ () => {!!comment?.keyword?.status ? methods.onChangeTypePhone() : ''}}>
            <Checkbox disabled={!comment?.keyword?.status}  checked={comment?.phone} className={'comment__checkbox'}/>
            <Text>Chứa SĐT</Text>
          </div>
          <div className="comment-content__keyword-checkbox" onClick={ () => {!!comment?.phone ? methods.onChangeTypeKeyword() : ''}}>
            <Checkbox disabled={!comment?.phone} checked={comment?.keyword?.status} className={'comment__checkbox'}/>
            <Text>Chứa Từ khóa</Text>
          </div>
        </div>
        <Tooltip
          className="custom-tooltip__input-tag --danger"
          placement="bottom"
          title={(!!comment?.keyword?.status && !!validate?.postAndComment?.comment) ? validate?.postAndComment?.comment : ''}
        >
          <TagInput
            style={{width: '100%',marginTop:'16px'}}
            defaultValue={comment?.keyword?.value}
            disabled={!comment?.keyword?.status}
            onChange={(val) => methods.onChangeValueKeyword(val)}
            onBlur={() => methods?.onValidateCommentResponse(!!comment?.keyword?.value ? true : false)}
            validate={!!comment?.keyword?.status && !!validate?.postAndComment?.comment}
          />
        </Tooltip>
      </div>
      }
    </Styledcomment>
  )
}
const Styledcomment = styled.div`
  .option-content{
    display: flex;
    margin-top: 8px;
    margin-bottom: 16px;
    .radio-item{
      display: flex;
      margin-right: 41px;
      >span{
        margin-left: 8px;
      }
    }
  }
  .comment-notification{
    min-height: 51px;
    background: rgba(26, 148, 255, 0.1);
    border: 1px solid #1A94FF;
    border-radius: 6px;
    padding: 5px 12px;
    display: flex;
    &__icon{
      margin-right: 8px;
      display: flex;
      align-items: center;
    }
    p{
      display: flex;
      align-items: center;
    }
  }
  .comment-content{
    margin-top: 16px;
    margin-bottom: 12px;
    &__checkbox{
      display: flex;
      margin-top: 8px;
    }
    &__phone-checkbox{
      display: flex;
      align-items: center;
      margin-right: 41px;
      .comment__checkbox{
        margin-right: 12px;
      }
    }
    &__keyword-checkbox{
      display: flex;
      align-items: center;
      .comment__checkbox{
        margin-right: 12px;
      }
    }
  }

`