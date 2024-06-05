import { Text } from 'common/text'
import styled from 'styled-components'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'
import { Switch } from '../../../../../../customer/components/switch'
import { Textarea } from '../../../../../../../common/form/textarea'
import React from 'react'
import { NotificationInside } from '../../../../../layouts/general/notificationInside'

export const UnfitCondition = ({ ...props }) => {
  const { data, methods } = useCreateFacebookAutoResponses()
  const { autoResponse } = data
  const { validate } = data

  return (
    <StyledAutoResponse {...props}>
      <Text as={'p'} className={'auto-response__title'}>Kịch bản phản hồi tự động khi không thỏa mãn điều kiện</Text>
      <div className={'auto-response__comment flex'}>
        <Switch checked={autoResponse?.unfitCondition?.commentResponse?.status}
                style={{marginRight: '8px'}}
                onChange={methods.onChangeUnfitConditionCommentStatus}
        />
        <Text>Phản hồi bình luận</Text>
      </div>
      {!!autoResponse?.unfitCondition?.commentResponse?.status &&
      <div className={'auto-response__comment-content'}>
        <Textarea placeHolder={'Nhập nội dung phản hồi'}
                  value={autoResponse?.unfitCondition?.commentResponse?.value}
                  onBlur={_ => methods.onValidateUnfitConditionCommentValidate(autoResponse?.unfitCondition?.commentResponse?.value !== '' ? true : false )}
                  onChange={(e) => methods.onChangeUnfitConditionCommentValue(e.target.value)}
                  maxLength="255"
                  className={'auto-response__comment-area'}
                  validateType={'danger'}
                  validateText={validate?.autoResponse?.unfitCondition?.commentResponse}
        ></Textarea>
        <Text color={'#1A94FF'} fontSize={'12px'} data-disable={!autoResponse?.unfitCondition?.commentResponse?.status}
              onClick={() => {
                autoResponse?.unfitCondition?.commentResponse?.status ? methods.onChangeUnfitConditionCommentValue(autoResponse?.unfitCondition?.commentResponse?.value, true):''
              }
              } className={'auto-response__comment-addname'}>{'+ Thêm thẻ {{name}}'}</Text>

        <Text color={'#C8CBD4'} fontSize={'12px'} className={'auto-response__comment-length'}>{500-autoResponse?.unfitCondition?.commentResponse?.value?.length}/500</Text>
      </div>
      }
      <div className={'auto-response__comment flex'}>
        <Switch checked={autoResponse?.unfitCondition?.messageResponse?.status}
                style={{marginRight: '8px'}}
                onChange={methods.onChangeUnfitConditionMessage}
        />
        <Text>Phản hồi tin nhắn</Text>
      </div>
      {!!autoResponse?.unfitCondition?.messageResponse?.status &&
        <div className={'auto-response__comment-content'}>
          <Textarea placeHolder={'Nhập nội dung phản hồi'}
                    value={autoResponse?.unfitCondition?.messageResponse?.value}
                    onBlur={_ => methods.onValidateUnfitConditionMessageValidate(autoResponse?.unfitCondition?.messageResponse?.value !== '' ? true : false )}
                    onChange={(e) => methods.onChangeUnfitConditionMessageValue(e.target.value)}
                    maxLength="255"
                    className={'auto-response__comment-area'}
                    validateType={'danger'}
                    validateText={validate?.autoResponse?.unfitCondition?.messageResponse}
          ></Textarea>
          <Text color={'#1A94FF'} data-disable={!autoResponse?.unfitCondition?.messageResponse?.status}
                onClick={() => {
                  autoResponse?.unfitCondition?.messageResponse?.status ? methods.onChangeUnfitConditionMessageValue(autoResponse?.unfitCondition?.messageResponse?.value, true) : ''
                }
                } className={'auto-response__comment-addname'}>{'+ Thêm thẻ {{name}}'}</Text>

          <Text color={'#C8CBD4'} fontSize={'12px'} className={'auto-response__comment-length'}>{500-autoResponse?.unfitCondition?.messageResponse?.value?.length}/500</Text>
        </div>
      }
      {(!!autoResponse?.unfitCondition?.messageResponse?.status || !!autoResponse?.unfitCondition?.commentResponse?.status)
      && <NotificationInside content={<div>
        Bạn có thể thêm thẻ <b>{'{name}'}</b> là Tên khách hàng để tạo ra các mẫu nội dung phản hồi tin nhắn khác nhau
        nhằm tránh bị đánh dấu spam tài khoản Facebook.
      </div>}/>
      }
    </StyledAutoResponse>
  )
}

const StyledAutoResponse = styled.div`
  .auto-response{
    &__title{
      margin-bottom: 16px;
    }
    &__comment{
      margin-bottom: 8px;
    }
    &__comment-content{
      margin-bottom: 24px;
      position: relative;
      textarea {
        resize: none;
      }
    }
    &__comment-addname{
      position: absolute;
      right: 16px;
      bottom: 5px;
      :hover{
        cursor: pointer;
      }
    }
    &__comment-length{
      position: absolute;
      left: 16px;
      bottom: 5px;
      :hover{
        cursor: pointer;
      }
    }
  }
`

