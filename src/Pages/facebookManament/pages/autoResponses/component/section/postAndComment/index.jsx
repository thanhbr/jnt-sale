import { StyledPostAndComment } from './_styled'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'
import FanPagePost from './_post'
import FanPageComment from './_comment'
import { useState } from 'react'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'
import {PostModal} from "../../modal/postModal";

export const PostAndComment = ({title,...props}) => {

  const {data, methods} = useCreateFacebookAutoResponses()
  const post = data.postAndComment?.post
  const [showContent,setShowContent] = useState(true)
  return (
    <StyledPostAndComment>
      <div className="info-step" data-success={true}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{FACEBOOK_ICONS.check_success}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
          <div onClick={() => setShowContent(!showContent)} data-arrow={!showContent} className={'title-step__arrow'}>{FACEBOOK_ICONS.up_arrow}</div>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className={'form-step__left flex'}>
            <FanPagePost/>
          </div>
          <div className={'form-step__right flex'}>
            <FanPageComment/>
          </div>
        </div>

        {post?.showModal && (
          <PostModal
            fetching={post.fetching}
            list={post.list}
            loading={post.loading}
            onClose={methods?.onPostModalClose}
            onLoadMore={methods.onFetchMorePostList}
            onSelect={methods.onPhoneChange}
            inputProps={{
              value: post.keyword,
              onChange: e => methods.onPostKeywordChange(e.target.value),
            }}
          />
        )}
      </div>
    </StyledPostAndComment>
  )
}