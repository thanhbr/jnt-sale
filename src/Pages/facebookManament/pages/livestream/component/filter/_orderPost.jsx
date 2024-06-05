import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";
import {Text} from "../../../../../../common/text";
import {fDateTimeSuffix} from "../../../../../../util/formatTime";
import React from "react";
import useFacebookPost from "../../hooks/useFacebookPost";
import styled from "styled-components";
import {FanPageAutoComplete} from "../../../../../../common/form/autoComplete/_fanpageFBAutoComplete";
import ReactImageFallback from "react-image-fallback";

export const OrderPost = () => {
    const {source} = useFacebookFilterForm()
    const { post, methods } = useFacebookPost()
    return (
        <AlternativeAutoComplete
            className="livestream-filter-facebook-form__input-wide"
            // main input
            inputProps={{
                categoryList: [], // menu list in category dropdown
                categoryValue: {name: 'Bài viết', value: ''}, // if not exist this value -> default category: categoryList[0]
                categoryWidth: 70,
                placeholder: 'Chọn bài viết',
                readOnly: true,
                value:  post.value.length > 0
                    ? `Đã chọn (${post.value.length})`
                    : '',
                onIconClick: post.onInputReset,
            }}
            // menu
            menuProps={{
                empty:
                    post.list.length <= 0
                        ? post.tab === 'all'
                        ? 'Không tìm thấy bài viết'
                        : 'Bạn chưa chọn bài viết'
                        : '',
                multipleChoices: true,
                onReset: post.onInputReset, // only use this prop for multiple choice
            }}
            // search input in dropdown menu
            searchInputProps={{
                placeholder: 'Tìm kiếm bài viết theo tên',
                value: post.keyword,
                onChange: post.onKeywordChange,
            }}
            tabProps={{
                active: post.tab,
                checkedNumber: post.value.length,
                onChange: post.onTabChange,
            }}
            // submitProps={{
            //     onSubmit: methods.approveFilter,
            //     closeFilter: methods.closeFilter
            // }}
        >
            <StylePost>
                {post.list.length > 0 &&
                post.list.map(item => (
                    <Option
                        key={item.post_id}
                        className="response-filter-form__option-text"
                        checked={
                            !!post.value.find(find => find.value === item.post_id)
                        }
                        multipleChoices={true}
                        onClick={() => post.onChange({
                            id: item.post_id,
                            category:[],
                            value: item.post_content,
                        })}
                    >
                        <div className={'post-filter-form__option-value'}>
                            <div className="post-avatar">
                                <ReactImageFallback
                                    src={item?.post_image}
                                    alt={item?.post_content}
                                    fallbackImage='/img/facebook/no-post.png'
                                />
                                {/*<img src={item?.post_image || ''} alt={!!item?.post_image && JSON.parse(item?.post_content)}/>*/}
                            </div>
                            <div className={'post-content'}>
                                <Text as={'p'} className={'post-name'}>{!!item?.post_content ? JSON.parse(item?.post_content) : '---'}</Text>
                                <Text as={'p'} className={'post-name'} color={'#7C88A6'} fontSize={'10px'} lineHeight={'140%'}>{!!item?.time ? fDateTimeSuffix(item?.time) : '---'}</Text>
                            </div>
                        </div>
                    </Option>
                ))}
            </StylePost>
        </AlternativeAutoComplete>
    )
}
const StylePost = styled.div`
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
      //width: 48.81px;
      width: auto;
      border-radius: 4px;
      //background: #1E1E1E;
      margin-right: 8px;
      img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`
