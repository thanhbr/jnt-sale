import { Input } from 'common/form/input'
import { Modal } from 'common/modal'
import { Spinner } from 'common/spinner'
import { Text } from 'common/text'
import { ORDER_SINGLE_ICONS } from 'Pages/orderSingle/interface/_icons'
import StringUtils from 'Pages/orderSingle/utils/string'
import React, { useRef } from 'react'
import { StyledPostPageModal } from './_styled'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { Th } from '../../../../../../../layouts/tableLayout/_th'
import { Tr } from '../../../../../../../layouts/tableLayout/_tr'
import { Td } from '../../../../../../../layouts/tableLayout/_td'
import { Checkbox } from '../../../../../../../common/form/checkbox'
import { fDateTimeSuffix } from '../../../../../../../util/formatTime'
import ReactImageFallback from 'react-image-fallback'
import { Button } from '../../../../../../../common/button'
import useCreateFacebookAutoResponses from '../../../hooks/useCreateFacebookAutoResponses'
import { Tooltip } from '../../../../../../../common/tooltipv2'
import { THEME_COLORS } from '../../../../../../../common/theme/_colors'
import { ICONS } from '../../../interface/_constants'

export const PostModal = ({
  fetching,
  list = [],
  loading,
  onClose,
  onLoadMore,
  onSelect,
  inputProps,
  ...props
}) => {

  const { data, checkbox, methods } = useCreateFacebookAutoResponses()
  const selectedList = data.postAndComment.post.listSelected
  const menu = useRef(null)
  const handleMenuScroll = () => {
    if (loading) return

    const clientHeight = menu.current.clientHeight
    const scrollHeight = menu.current.scrollHeight
    const scrollTop = menu.current.scrollTop

    if (clientHeight + scrollTop > scrollHeight - 100) {
      if (onLoadMore) onLoadMore()
    }
  }
  const onSelectPost = () => {
    methods?.onApprovePostListSelected()
    onClose()
  }
  const checkFullPageChecked = () => {
    let checkFullPage = true
    list.forEach(item => {
      const findItem = data?.postAndComment?.post?.listSelected.find(find => find.data?.post_id === item.data?.post_id)
      if (!!!findItem) checkFullPage = false
    })
    return checkFullPage
  }
  return (
    <Modal title="Chọn bài viết áp dụng kịch bản phản hồi" width={640} onClose={onClose}>
      <StyledPostPageModal {...props}>
        {/*<i className="post-modal__close" onClick={onClose}>*/}
        {/*  {ORDER_SINGLE_ICONS.x}*/}
        {/*</i>*/}
        <div className="post-modal__search">
          <Input
            className={'post-modal___input-search'}
            {...inputProps}
            icon={inputProps?.icon || ORDER_SINGLE_ICONS.searchMd}
            placeholder={
              inputProps?.placeholder ||
              'Tìm kiếm theo link hoặc ID bài viết'
            }
          />
          <i className="post-modal__reload" onClick={methods?.onReloadPost}>
            {FACEBOOK_ICONS.reload}
          </i>
        </div>
        {list.length > 0 && <div className={'post-modal__selected'}>
          <Text>Đã chọn <Text
            color={'#1A94FF'}>{data?.postAndComment?.post?.listSelected?.length}/{data?.postAndComment?.post?.list?.length}</Text> bài
            viết</Text>
        </div>}
        {fetching ? (
          <div className="post-modal__fetching">
            <Spinner size={54} thickness={5}/>
            <Text style={{ marginTop: 5 }}>Loading...</Text>
          </div>
        ) : (

          list.length <= 0 && !loading ?
            (
              <div className="post-modal__empty"
                   style={{ textAlign: 'center', paddingTop: '30px', paddingBottom: '24px' }}>
                {ICONS.noPost}
                {
                  !!inputProps.value ?
                    <Text fontSize={13} lineHeight={'140%'} style={{ marginTop: '20px' }}>
                      Không tìm thấy bài viết.
                    </Text>
                    :
                    <Text fontSize={13} lineHeight={'140%'} style={{ marginTop: '20px' }}>
                      Dường như trang của bạn chưa có bài viết nào,<br/>
                      hãy kiểm tra lại fanpage hoặc làm mới lại danh sách bạn nhé!
                    </Text>
                }
              </div>
            )
            :
            <div className={'post-table'}>
              <Tr {...props} type="tHead" className={'post-table__thead'}>
                <Th className={'post-table__cell'}>
                  <Checkbox
                    checked={checkbox.checked}
                    indeterminate={!checkFullPageChecked()}
                    onClick={e => {
                      e.stopPropagation()
                      checkbox.onClick()
                    }}
                  />
                </Th>
                <Th className={'post-table__cell'}>Bài viết</Th>
                <Th className={'post-table__cell'}>Thời gian bài đăng</Th>
              </Tr>
              <div
                ref={menu}
                className="post-modal__list common-scrollbar"
                style={{ overflow: list.length <= 0 ? 'hidden' : 'auto' }}
                onScroll={handleMenuScroll}
              >
                {list.map((item, index) => (
                  <PostTr key={index} onSelect={onSelect} onClose={onClose} data={item}/>
                ))}
                {!!loading && (
                  <div style={{ textAlign: 'center', padding: '48px 0', minHeight: '351px' }}>
                    <div className="post-modal__loading">
                      <Spinner size={48} thickness={4}/>
                    </div>
                    <Text>Đang tải danh sách bài viết....</Text>
                  </div>
                )
                }
              </div>
            </div>
        )}
        <div className="post-footer">
          <Button size={'sm'} appearance={'ghost'} style={{ marginRight: '8px' }} onClick={onClose}> Hủy </Button>
          {(list.length > 0 || (list.length <= 0 && !loading && !!inputProps.value)) && <Button size={'sm'}
                                                                                                disabled={selectedList.length == 0}
                                                                                                onClick={() => {
                                                                                                  selectedList.length > 0 ? onSelectPost() : ''
                                                                                                }}> Chọn </Button>}
        </div>
      </StyledPostPageModal>
    </Modal>
  )
}

const PostTr = ({ data, onSelect, onClose, ...props }) => {

  const response = useCreateFacebookAutoResponses()
  const selectedList = response.data.postAndComment.post.listSelected
  const { methods } = response
  const isSelected = !!selectedList.find(item => item?.data?.post_id === data?.data?.post_id)
  return (
    <Tr
      {...props}
      className="post-table__row"
      onClick={() => methods?.onCheckboxChange(data, isSelected)}
    >
      <Td className="post-table__cell" data-type="td">
        <Checkbox checked={isSelected} onClick={() => methods?.onCheckboxChange(data, isSelected)}/>
      </Td>
      <Td className="post-table__cell" data-type="td">
        <div
          key={data?.data?.page_id}
          className="post-modal__item"
          style={{ minHeight: '35px' }}
        >
          <div className="post-modal__avatar">
            <ReactImageFallback
              src={data?.data?.post_image}
              alt={data?.data?.page_name}
              className="post-image"
              fallbackImage="/img/facebook/no-post.png"
              style={{ width: 'auto', height: '26px', }}
            />
          </div>
          <div className="post-modal__info">
            <Text className="post-modal__name-content">
              {!!data?.data?.post_content ?
                <Text style={{display:'flex'}}>
                  <Tooltip className={'post-modal__tooltip-name'} placement="top" title={data?.data?.post_content}
                         baseOn="width">
                    <Text
                      className="post-modal__name"
                      color={THEME_COLORS.secondary_100}
                      fontSize={13}
                      fontWeight={600}
                      lineHeight={20}
                    >
                      {data?.data?.post_content || '---'}
                    </Text>
                  </Tooltip>
                  <Text as={'a'} href={data?.data?.post_link || '#'} target={'_blank'} color="#7C88A6">
                    {FACEBOOK_ICONS.link}
                  </Text>
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
                  {
                    !!data?.data?.post_link &&
                    <Text as={'a'} href={data?.data?.post_link || '#'} target={'_blank'} color="#7C88A6">
                      {FACEBOOK_ICONS.link}
                    </Text>
                  }
                </Text>
              }
            </Text>
            {!!data?.data?.script_name_active && +response?.data?.idAutoResponse !== +data?.data?.script_id_active &&
            <Text className="post-modal__name-warning" color={'#FF424E'} fontSize={'12px'} lineHeight={'15px'}>
              Đang áp dụng riêng kịch bản &#160;
              <Tooltip className={'post-modal__tooltip-script-name'} placement="top"
                       title={data?.data?.script_name_active}
                       baseOn="width">
                <Text as={'a'} fontSize={'12px'} href={`/facebook/auto-responses/edit/${data?.data?.script_id_active}`}
                      target={'_blank'} lineHeight={'15px'}
                      color={'#1A94FF'}>
                  {data?.data?.script_name_active}</Text>
              </Tooltip>
            </Text>}
          </div>
        </div>
      </Td>
      <Td className="post-table__cell" data-type="td">
        <Text as={'span'}>{fDateTimeSuffix(data?.data?.time)}</Text>
      </Td>
    </Tr>
  )
}
