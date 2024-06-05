import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import {Text} from "../../../../../../common/text";
import {fDateTimeSuffix} from "../../../../../../util/formatTime";
import React, {memo} from "react";
import useFacebookPost from "../../hooks/useFacebookPost";
import styled from "styled-components";
import ReactImageFallback from "react-image-fallback";
import {Tooltip} from "../../../../../../common/tooltipv2";

export const OrderPost = memo(() => {
    const { post } = useFacebookPost()
    const handlePostListScroll = () => {
        if (!post.canLoadMore) return
        post.onPostFetchMoreProductList()
    }
    return (
        <AlternativeAutoComplete
            className="order-filter-facebook-form__input-wide"
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
                        ? 'Không tìm thấy dữ liệu phù hợp'
                        : 'Bạn chưa chọn bài viết'
                        : '',
                multipleChoices: true,
                onReset: post.onInputReset, // only use this prop for multiple choice
                canLoadMore : post.canLoadMore,
                onLoadMore: handlePostListScroll,
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
        >
            <StylePost>
                {post.list.length > 0 &&
                post.list.map(item => (
                    <Option
                        key={item.value}
                        className="response-filter-form__option-text"
                        checked={
                            !!post.value.find(find => find.value === item.value)
                        }
                        multipleChoices={true}
                        onClick={() => post.onChange({
                            id: item.value,
                            category:[],
                            value: item.name,
                            time: item.time,
                            avatar:item.avatar,
                        })}
                    >
                        <div className={'post-filter-form__option-value'}>
                            <div className="post-avatar">
                                <ReactImageFallback
                                    src={item?.avatar}
                                    alt={item?.name}
                                    fallbackImage='/img/facebook/no-post.png'
                                    className={'post-filter-form__image-post'}
                                />
                                {/*<img src={item?.post_image || ''} alt={!!item?.post_image && JSON.parse(item?.post_content)}/>*/}
                            </div>
                            <div className={'post-content'}>
                                <Tooltip  placement='top-center' title={item?.name} baseOn={'height'} className={'post-tooltip'}>
                                    <Text as={'p'} className={'post-name'}>{!!item?.name ? item?.name : '---'}</Text>
                                </Tooltip>
                                <Text as={'p'} className={'post-name'} color={'#7C88A6'} fontSize={'10px'} lineHeight={'140%'}>{!!item?.time ? fDateTimeSuffix(item?.time) : '---'}</Text>
                            </div>
                        </div>
                    </Option>
                ))}
            </StylePost>
        </AlternativeAutoComplete>
    )
})
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
        //width: 100%!important;
        //display: -webkit-box;
        //-webkit-box-orient: vertical;
        //overflow: hidden;
        //text-overflow: ellipsis;
      }
      .post-tooltip{
       display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 18rem;
      }
    }
    .post-filter-form__image-post{
      
    }
    .post-avatar{
      height: 30px;
      //width: 48.81px;
      width: 48px;
      border-radius: 4px;
      //background: #1E1E1E;
      margin-right: 8px;
      img{
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
      }
    }
  }
`
