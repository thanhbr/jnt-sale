import { THEME_SEMANTICS } from '../../../../../../../common/theme/_semantics'
import { Text } from '../../../../../../../common/text'
import { Option } from '../../../../../../../common/form/select/_option'
import { Radio } from '../../../../../../../common/form/radio'
import styled from 'styled-components'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'
import { PostEmpty, StyledEmpty } from '../../pageEmpty/emptyPost'
import { NotificationInside } from '../../../../../layouts/general/notificationInside'
import { Tr } from '../../../../../../../layouts/tableLayout/_tr'
import { Th } from '../../../../../../../layouts/tableLayout/_th'
import { Checkbox } from '../../../../../../../common/form/checkbox'
import { Spinner } from '../../../../../../../common/spinner'
import React from 'react'
import { Button } from '../../../../../../../common/button'
import { ORDER_ICONS } from '../../../../../../refactorOrder/interfaces/_icons'
import { Td } from '../../../../../../../layouts/tableLayout/_td'
import ReactImageFallback from 'react-image-fallback'
import { fDateTimeSuffix } from '../../../../../../../util/formatTime'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { THEME_COLORS } from '../../../../../../../common/theme/_colors'

export default () => {

  const {data, methods} = useCreateFacebookAutoResponses()
  const post = data?.postAndComment?.post || {}
  const {validate} = data
  return (
    <StyledPost>
      <Text as={'label'}>Chọn bài viết <Text color={THEME_SEMANTICS.failed}>*</Text></Text>
      <div className="option-content">
        <div className="radio-item" onClick={() => methods.onChangeTypePost(1)}>
          <Radio
            checked={post?.type == 1 ? true : false}
            name="post-info"
            style={{transform: 'translateY(2px)'}}
          />
          <Text >Tất cả bài viết</Text>
        </div>
        <div className="radio-item" onClick={() => methods.onChangeTypePost(2)}>
          <Radio
            checked={post?.type == 2 ? true : false}
            name="post-info"
            style={{transform: 'translateY(2px)'}}
          />
          <Text>Lựa chọn bài viết</Text>
        </div>
      </div>
      <NotificationInside content={
        post?.type == 1 ?
          'Với lựa chọn trên, hệ thống sẽ tự động phản hồi bình luận của khách hàng khi khách hàng bình luận vào bất kỳ bài viết nào của trang.'
          :
          'Với lựa chọn trên, hệ thống sẽ ưu tiên phản hồi tự động bình luận của khách hàng theo thiết lập của kịch bản này khi khách hàng bình luận vào các bài viết được chọn bên dưới.'
      }/>
      {post?.type == 2 &&
        <div className={'post-list'} data-validate={!!validate?.postAndComment?.post}>
          {post?.value?.length > 0 ?
            <div className={'post-list__content'}>
              <div className={'post-list__content-title flex'}>
                <Text fontWeight={600} fontSize={'16px'}>Danh sách bài viết đã chọn</Text>
                <Button size={'sm'} onClick={methods?.onShowListPost} icon={ORDER_ICONS.plus}>
                  Thêm bài viết
                </Button>
              </div>
              <div className={'post-table'}>
                <Tr type="tHead" className={'post-table__thead'}>
                  <Th className={'post-table__cell'}>Bài viết</Th>
                  <Th className={'post-table__cell'}>Thời gian bài đăng</Th>
                  <Th className={'post-table__cell'}></Th>
                </Tr>
                <div className="content-table common-scrollbar">
                  {post?.value.map((item,index) => (
                    <Tr
                      className="post-table__row"
                      key={index}
                    >
                      <Td className="post-table__cell" data-type="td">
                        <div
                          key={item?.data?.page_id}
                          className="post-modal__item"
                        >
                          <div className="post-modal__avatar">
                            <ReactImageFallback
                              src={item?.data?.post_image}
                              alt={item?.data?.page_name}
                              className="post-image"
                              fallbackImage="/img/iconMenu/defaultAccount.png"
                              style={{width: '39px',height: '26px',}}
                            />
                          </div>
                          <div className="post-modal__info">
                            <Text className="post-modal__name-content">
                              {!!item?.data?.post_content ?
                                <Text style={{display:'flex'}}>
                                  <Tooltip className={"post-modal__tooltip-name"} placement="top" title={item?.data?.post_content}
                                          baseOn="width">
                                    <Text
                                      className="post-modal__name"
                                      color={THEME_COLORS.secondary_100}
                                      fontSize={13}
                                      fontWeight={600}
                                      lineHeight={20}
                                    >
                                      {item?.data?.post_content || '---'}
                                    </Text>
                                  </Tooltip>
                                  {!!item?.data?.post_link && <Text as={'a'} href={item?.data?.post_link || '#'} target={'_blank'} color="#7C88A6">
                                        {FACEBOOK_ICONS.link}
                                  </Text>}
                                </Text>
                                :
                                <Text
                                  className="post-modal__noname"
                                  color={THEME_COLORS.secondary_100}
                                  fontSize={13}
                                  fontWeight={600}
                                  lineHeight={20}
                                >
                                  ---
                                  { !!item?.data?.post_link && <Text as={'a'} href={item?.data?.post_link || '#'} target={'_blank'} color="#7C88A6">
                                    {FACEBOOK_ICONS.link}
                                  </Text>}
                                </Text>
                              }
                            </Text>
                            {!!item?.data?.script_name_active && +data?.idAutoResponse !== +item?.data?.script_id_active && <Text className="post-modal__name-warning" color={'#FF424E'}>
                              Đang áp dụng riêng kịch bản &#160;
                              <Tooltip className={"post-modal__tooltip-script-name"} placement="top" title={item?.data?.script_name_active}
                                       baseOn="width">
                                <Text as={'a'} href={`/facebook/auto-responses/edit/${item?.data?.script_id_active}`} target={'_blank'} color={'#1A94FF'}>
                                 {item?.data?.script_name_active}</Text>
                              </Tooltip>
                            </Text>}
                          </div>
                        </div>
                      </Td>
                      <Td className="post-table__cell" data-type="td">
                        <Text as={'span'}>{fDateTimeSuffix(item?.data?.time)}</Text>
                      </Td>
                      <Td className="post-table__cell" data-type="td">
                        <div className="post-table__cell-close" onClick={() => methods?.onRemovePost(item)}>
                          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.25 5.25L5.75 12.75M5.75 5.25L13.25 12.75" stroke="#7C88A6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </div>
              </div>
            </div>
            :
            <PostEmpty/>
          }
        </div>
      }
    </StyledPost>
  )
}
const StyledPost = styled.div`
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
  .post-notification{
    min-height: 51px;
    display: flex;
    align-items: center;
    background: rgba(26, 148, 255, 0.1);
    border: 1px solid #1A94FF;
    border-radius: 6px;
    padding: 5px 12px;
    &__icon{
      margin-right: 8px;
    }
  }
  .post-list{
    border: 1px solid #EBEEF5;
    border-radius: 8px;
    margin-top: 16px;
    &[data-validate='true']{
      border: 1px solid #FF424E !important;
    }
    &__content{
      padding: 12px;
      &-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
    }
  }
  .post-modal{
    &__name-warning{
      display: flex;
    }
    &__avatar {
      width: 32px;
      height: 32px;
      margin: 4px 12px 0 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__tooltip-script-name {
      max-width: 150px;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #1A94FF;
      }
    &__tooltip-name {
      max-width: 275px;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-decoration: none;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 4px;
      .post-modal__name{
        position: relative;
      }
      a{
        margin-left: 6px;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        right: -24px;
      }
    }
    &__noname{
      display: flex;
      a{
          margin-left: 6px;
          display: flex;
          align-items: center;
        }
    }
  }
  .post-modal__item{
    display: flex;
    align-items: center;
  
  }
  .post-table{
      //margin: 16px -16px 0 -8px;
      
      border: 1px solid #E2EAF8;
      border-radius: 8px;
      margin-top: 12px;
      &__cell{
        &-close{
          :hover{
            cursor: pointer;
          }
        }
       &:nth-child(1) {
        width: 68%;
       }
       &:nth-child(2) {
        width: 24%;
       }
       &:nth-child(3) {
        width: 8%;
       }
      }
      &__thead{
        border: none;
        .tr__container{
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
        
        }
      }
      .tr__container{
        border: none;
      
      }
  }
  .content-table{
     max-height: 267px;
     overflow: auto;
  }

`