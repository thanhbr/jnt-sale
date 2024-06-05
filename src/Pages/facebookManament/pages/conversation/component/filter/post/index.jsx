import { ICON_FILTER } from '../../../interface/icon'
import { FanPageAutoComplete } from '../../../../../../../common/form/autoComplete/_fanpageFBAutoComplete'
import { Option } from '../../../../../../../common/form/autoComplete/_option'
import React from 'react'
import useFilterFacebookConversation from '../../../hooks/useFilterFacebookConversation'
import { Text } from '../../../../../../../common/text'
import styled from 'styled-components'
import { fDateTimeSuffix } from '../../../../../../../util/formatTime'
import ReactImageFallback from 'react-image-fallback'
import { Tooltip } from 'common/tooltip'

export const Post = () => {
  const { post, methods } = useFilterFacebookConversation()
  return (
    <StylePost>
    <FanPageAutoComplete
      className="order-filter-form__input-wide"
      // main input
      titleProps={'Lọc theo bài viết'}
      filterProps={
        {
          isActive: post.activeValue.length > 0
        }
      }
      iconProps={
          ICON_FILTER.note
      }
      inputProps={{
        categoryList: [{ name: 'Trang áp dụng', value: '' }], // menu list in category dropdown
        categoryWidth: 140,
        placeholder: 'Chọn trang',
        readOnly: true,
        value:
          post.value.length > 0
            ? `Đã chọn (${post.value.length})`
            : '',
        onIconClick: methods.approveFilter,
      }}
      // menu
      menuProps={{
        className : "fb-post-menu",
        empty:
          post.list.length <= 0
            ? post.tab === 'all'
            ? 'Không tìm thấy dữ liệu phù hợp'
            : 'Bạn chưa chọn bài viết'
            : '',
        multipleChoices: true,
        onReset: post.onInputReset, // only use this prop for multiple choice
        onLoadMore: post.onPostLoadMore,
        canLoadMore: true
      }}
      // search input in dropdown menu
      searchInputProps={{
        className : "fb-post-seach-input",
        placeholder: 'Tìm kiếm bài viết theo tên',
        value: post.keyword,
        onChange: post.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: post.tab,
        checkedNumber: post.value.length,
        onChange: post.onTabChange,
      }}
      submitProps={{
        onSubmit: methods.approveFilter,
        closeFilter: methods.closeFilter
      }}
    >
        {post.list.length > 0 &&
        post.list.map(item => (
          <Option
            key={item.post_id}
            className="response-filter-form__option-text"
            checked={
              !!post.value.find(find => find.post_id === item.post_id)
            }
            multipleChoices={true}
            onClick={() => post.onChange(item)}
          >
            <div className={'post-filter-form__option-value'}>
              <div className="post-avatar">
                <ReactImageFallback
                  src={item?.post_image}
                  fallbackImage="/img/facebook/no-post.png"
                  alt={!!item?.post_image && item?.post_content}
                />
              </div>
              <div className={'post-content'}>
                <Text as={'p'} className={'post-name'}>
                {!!item?.post_content ? item?.post_content.length > 70 ? 
                      <Tooltip placement="top" className="lb_group_name_total_report"
                      title={item?.post_content}
                      baseOn={'width'}>
                      {item?.post_content.substring(0, 70)+'...'} </Tooltip> : 
                      item?.post_content : '---'
                  }</Text>
                <Text as={'p'} className={'post-name'} color={'#7C88A6'} fontSize={'10px'} lineHeight={'140%'}>{!!item?.time ? fDateTimeSuffix(item?.time) : '---'}</Text>
              </div>
            </div>
          </Option>
        ))}
    </FanPageAutoComplete>
    </StylePost>
  )
}

const StylePost = styled.div`
  .fb-post-menu {
    width: 372px !important;
    padding-bottom: 16px;
  }
  .fb-post-seach-input {
    width: 334px;
  }
  .post-filter-form__option-value{
    display: flex;
    align-items: center;
    :hover{
      cursor: pointer;
      .post-name{
        color: #1E9A98!important;
      }
    }
    .post-content{
      width: calc(100% - 48.81px);
      text-align: left;
      .post-name{
        width: 100%!important;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .post-avatar{
      height: 30px;
      width: 47.81px;
      border-radius: 4px;
      background: #1E1E1E;
      margin-right: 8px;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`