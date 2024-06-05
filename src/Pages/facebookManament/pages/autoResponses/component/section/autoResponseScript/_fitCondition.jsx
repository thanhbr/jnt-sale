import { Text } from 'common/text'
import styled from 'styled-components'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'
import { Switch } from '../../../../../../customer/components/switch'
import { Textarea } from '../../../../../../../common/form/textarea'
import React from 'react'
import { NotificationInside } from '../../../../../layouts/general/notificationInside'

export const FitCondition = ({ comment,...props }) => {
  const { data, methods } = useCreateFacebookAutoResponses()
  const { autoResponse } = data
  const { validate } = data

  return (
    <StyledAutoResponse {...props}>
      <Text as={'p'} className={'auto-response__title'}>{ comment?.type == 1 ? 'Kịch bản phản hồi tự động tất cả bình luận' : 'Kịch bản phản hồi tự động khi thỏa mãn điều kiện'}</Text>
      <div className={'auto-response__comment flex'}>
        <Switch checked={autoResponse?.fitCondition?.commentResponse?.status}
                style={{ marginRight: '8px' }}
                onChange={methods.onChangeFitConditionCommentStatus}
                disabled={!autoResponse?.fitCondition?.messageResponse?.status}
        />
        <Text>Phản hồi bình luận</Text>
      </div>
      {!!autoResponse?.fitCondition?.commentResponse?.status &&
      <div className={'auto-response__comment-content'}>
        <Textarea placeHolder={'Nhập nội dung phản hồi, /trả lời nhanh, nhấn Shift + Enter để xuống dòng, Enter để gửi'}
                  value={autoResponse?.fitCondition?.commentResponse?.value}
                  onBlur={_ => methods.onValidateFitConditionCommentValidate(autoResponse?.fitCondition?.commentResponse?.value !== '' ? true : false)}
                  onChange={(e) => methods.onChangeFitConditionCommentValue(e.target.value)}
          // onIconClick={handleChange}
                  maxLength="500"
                  className={'auto-response__comment-area'}
                  validateType={'danger'}
                  validateText={validate?.autoResponse?.fitCondition?.commentResponse}
        ></Textarea>
        <div className='auto-response__comment-line-content'>
        <Text color={'#1A94FF'} fontSize={'14px'} data-disable={!autoResponse?.fitCondition?.commentResponse?.status}
              onClick={() => {
                autoResponse?.fitCondition?.commentResponse?.status ? methods.onChangeFitConditionCommentValue(autoResponse?.fitCondition?.commentResponse?.value, true) : ''
              }
              } className={'auto-response__comment-addname'}>
                <div style={{float:'left'}}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16M4 10H16" stroke="#1A94FF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                {'Thêm thẻ {{Name}}'}
        </Text>
        <Text color={'#C8CBD4'} fontSize={'14px'} className={'auto-response__comment-length'}>{500-autoResponse?.fitCondition?.commentResponse?.value?.length}/500</Text>
        </div>
      </div>
      }
      <div className={'auto-response__comment flex'}>
        <Switch checked={autoResponse?.fitCondition?.messageResponse?.status}
                style={{ marginRight: '8px' }}
                onChange={methods.onChangeFitConditionMessage}
                disabled={!autoResponse?.fitCondition?.commentResponse?.status}
        />
        <Text>Phản hồi tin nhắn</Text>
      </div>
      {!!autoResponse?.fitCondition?.messageResponse?.status &&
      <div className={'auto-response__comment-content'}>
        <Textarea placeHolder={'Nhập nội dung phản hồi, /trả lời nhanh, nhấn Shift + Enter để xuống dòng, Enter để gửi'}
                  value={autoResponse?.fitCondition?.messageResponse?.value}
                  onBlur={_ => methods.onValidateFitConditionMessageValidate(autoResponse?.fitCondition?.messageResponse?.value !== '' ? true : false)}
                  onChange={(e) => methods.onChangeFitConditionMessageValue(e.target.value)}
          // onIconClick={handleChange}
                  maxLength="500"
                  className={'auto-response__comment-area'}
                  validateType={'danger'}
                  validateText={validate?.autoResponse?.fitCondition?.messageResponse}
        ></Textarea>
        <div className='auto-response__comment-line-content'>
          <Text color={'#1A94FF'} fontSize={'14px'} data-disable={!autoResponse?.fitCondition?.messageResponse?.status}
                onClick={() => {
                  autoResponse?.fitCondition?.messageResponse?.status ? methods.onChangeFitConditionMessageValue(autoResponse?.fitCondition?.messageResponse?.value, true) : ''
                }
                } className={'auto-response__comment-addname'}>
                <div style={{float:'left'}}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16M4 10H16" stroke="#1A94FF" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                {'Thêm thẻ {{Name}}'}
          </Text>
          <Text color={'#C8CBD4'} fontSize={'14px'} className={'auto-response__comment-length'}>{500-autoResponse?.fitCondition?.messageResponse?.value?.length}/500</Text>
        </div>
      </div>
      }
      {(!!autoResponse?.fitCondition?.messageResponse?.status || !!autoResponse?.fitCondition?.commentResponse?.status)
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
    &__comment-line-content{
      position: absolute;
      bottom: 6px;
      min-height: 32px;
      padding: 7px 15px;
      width: 99%;
      border-top: 1px solid #EBEEF5;
      margin: 0px 3px;
      background: white;
    }
    &__comment-addname{
      :hover{
        cursor: pointer;
      }
    }
    &__comment-length{
      float: right;
      :hover{
        cursor: pointer;
      }
    }
    &__comment-area textarea {
      min-height: 120px;
      padding: 10px 16px 37px;
    }
  }
`
