import React, { useContext, useEffect, useState, useRef } from 'react'
import { Text } from 'common/text'
import useFacebookDetailConversation from '../../../hooks/useFacebookDetailConversation'
import { ConfirmModal } from '../../../../../../../layouts/rightSightPopup/confirm'
import "./index.scss"
import { ICON_CONVERSATION } from '../../../interface/icon'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {Input} from 'common/form/input'
import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete'
import {CategoryDateTimeRangePicker} from 'common/form/datePicker/_categoryDateTimeRangePicker'
import { convertDateTimeToApiFormat } from 'common/form/datePicker/_functions'
import { Button } from 'common/button'
import { FacebookConversationContext } from '../../../provider/_context'
import ReactImageFallback from 'react-image-fallback'
import { fDateTimeSuffix } from '../../../../../../../util/formatTime'
import {fNumber, objectToArrayKeyValue, convertQuery,getRangeTime} from '../../../utils/format'
import StringUtils from '../../../utils/string'
import { Option } from 'common/form/autoComplete/_option'
import { sendRequestAuth } from 'api/api'
import config from '../../../../../../../../src/config'
import useAlert from 'hook/useAlert'
import { DateRangePicker } from 'rsuite'
import {Tooltip} from "common/tooltip";
import { PostListSkeleton } from './skeleton'


export const PostCommentModal = ({ ...props }) => {
  const { data, comment } = useFacebookDetailConversation()
  const confirm = data?.detail?.conversation?.confirm?.delete
  return (
    <>
      <ConfirmModal
        openModal={!!props.open}
        body={<Body/>}
        stylePopup={'popup-post-comment-export_confirm'}
        footer={
          {
            cancel: {
              width: 110,
              title: 'Đóng',

            }
          }
        }
        submitProps={
          {
            appearance: 'danger'
          }
        }
        footerProps={
          { className: 'post-cmt-group-modal_dismiss' }
        }
        closeModal={props.close}
      />
    </>

  )
}
const Body = () => {
  const { state, dispatch } = useContext(FacebookConversationContext)

  const [postKeyword, setPostKeyword] = useState('')
  const [typeComment, setTypeComment] = useState([{id: 0,name: 'Tất cả bình luận'}])
  const [loading, setLoading] = useState(false)
  const [postList, setPostList] = useState(state.filter.conversation.post.list)
  const [pageLoad, setPageLoad] = useState(0)
  const [pageKeyword, setPageKeyword] = useState('')
  const [pageList, setPageList] = useState(state.page.list)
  const [pageTab, setPageTab] = useState('all')
  const [pageValue, setPageValue] = useState(state.page.active)
  const [shouldOpenRangeTime, setShouldOpenRangeTime] =useState({status: false, key:-1})
  const [dateTime, setDateTime] = useState({start_date:'', end_date:''})
  const [loadingMore, setLoadingMore] = useState(false)
  const {showAlert} = useAlert()

  useEffect(() => {
    getFilterPost();
  }, []);
  
  //DATA PAGE
  const onTabChange =(tab) =>{
    const formatDataValue = pageKeyword
      ? StringUtils.removeAcent(pageKeyword?.toLowerCase())
      : ''

    const pageList = state.page.list.filter(item => {
      const formatNameItem = item?.page_name
        ? StringUtils.removeAcent(item.page_name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })
    const pageListChecked = state.page.list.filter(item => {
        return pageValue.find(find => find == item?.page_id)
    })
    setPageList(tab == 'checked' ? pageListChecked : pageList)
    setPageTab(tab)  
  }
  const getFilterPost = async (opt = {}) => { 
    const queries_post = {
      page_id: pageValue,
      keyword: postKeyword,
      start: pageLoad,
    } 
    const response = await sendRequestAuth('get',
      `${config.API}/fb/post/list${convertQuery({...queries_post, ...opt})}`
    ) 
    if (!!response?.data?.success) {
      setPostList(
        opt.start == 0
        ? response.data.data
        : [...postList, ...response.data.data]
      )
    }
    setLoadingMore(false)
  }
  const handlePageChange = (e,data) => {
    setPageLoad(0)
    const find = pageValue.find(item => item == data.page_id)
    const pageValueCheck = find
      ? pageValue.filter(item => item != data.page_id)
      : [...pageValue, data.page_id]
    if(pageValueCheck.length >= 1){
      setPageValue(pageValueCheck)
      getFilterPost({page_id: pageValueCheck.toString(),start:0})
    }
  }
  const handlePageKeywordChange = data => {
    const formatDataValue = data?.value.trim()
      ? StringUtils.removeAcent(data?.value.trim()?.toLowerCase())
      : ''

    const pageListSearch = state.page.list.filter(item => {
      const formatNameItem = item?.page_name
        ? StringUtils.removeAcent(item.page_name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })
    setPageKeyword(data?.value)
    setPageLoad(0)
    setPageList(pageListSearch)
  }
  ///DATA POST
  let typeCommentPost = [
    {id: 0,name: 'Tất cả bình luận'},
    {id: 2,name: 'Bình luận có số điện thoại'}
  ]
  const handlePostKeywordChange = key =>{ 
    setPostKeyword(key.trim())
    setPageLoad(0)
    getFilterPost({keyword:key.trim(), start: 0})
  }
  const handleTypeCommentChange = (data,item) => {
    setTypeComment({ ...typeComment,
      [item]: data
    })
  }
  // Date Time 
  const {before} = DateRangePicker
  const handleDateTimeChange = (data) =>{
    setDateTime({
      start_date: convertDateTimeToApiFormat(data.formatValue.split(' - ')[0]),
      end_date: convertDateTimeToApiFormat(data.formatValue.split(' - ')[1])
    })
  }
  //Export excel 
  const linkRef = useRef(null)
  const handleExport = async (post_id,key) => {
    let is_phone = typeComment[key] ? typeComment[key].id : typeComment[0].id;
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/post/export-comment/${post_id}?is_phone=${is_phone}&start_date=${dateTime.start_date}&end_date=${dateTime.end_date}`,
      null,
    )

    if (response?.data?.success) {
      linkRef.current.href = response?.data?.data?.url
      linkRef.current.download = response?.data?.data?.url.substr(
        response?.data?.data?.url.lastIndexOf('/') + 1,
      )
      linkRef.current.click()
      showAlert({
        type: 'success',
        content: 'Xuất Excel thành công',
        duration: 3000,
      })
    } else {
      showAlert({
        type: 'danger',
        content: response?.data?.code == 104 ? 'Bài viết mới, bạn cần nhấn nút đồng bộ rồi mới xuất excel' : response?.data?.message,
        duration: 3000,
      })
    }
  }
  //Sync comment 
  const handleSyncComment = async (page_id,post_id) => {
    // setLoading(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/post/sync-comment`,
      {
        page_id: page_id,
        post_id: post_id
      },
    )
    // setLoading(false)
    if (response?.data?.success) {
      showAlert({
        type: 'success',
        content: 'Đã cập nhật các bình luận mới',
        duration: 3000,
      })
    } else {
      showAlert({
        type: 'danger',
        content: response?.data?.errors?.message,
        duration: 3000,
      })
    }
    
  }
  //Sync comment 
  const handleSyncPost = async () => {
    setPostKeyword('')
    setLoading(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/post/sync`,
      {
        page_id: pageValue
      },
    )
    setLoading(false)
    if (response?.data?.success) {
      showAlert({
        type: 'success',
        content: 'Đã cập nhật mới danh sách bài viết',
        duration: 3000,
      })
      getFilterPost({keyword:'',start: 0});
    } else {
      showAlert({
        type: 'danger',
        content: response?.data?.message,
        duration: 3000,
      })
    }
    
  }
  // Load more 
  const menuRef = useRef(null)
  const handlePostScroll = () => {
    const clientHeight = menuRef.current.clientHeight
    const scrollHeight = menuRef.current.scrollHeight
    const scrollTop = menuRef.current.scrollTop

    if (clientHeight + scrollTop > scrollHeight - 200) {
      if(loadingMore) return
      const page_load = pageLoad+1;
      setLoadingMore(true)
      getFilterPost({
        start: page_load*20,
      });
      setPageLoad(page_load)
    }
  }

  return (
    <>
      <div className={'popup-post-comment-export__header'}>
        <div className={'popup-post-comment-export__header_content_f'}>Xuất Excel danh sách bình luận theo bài viết</div>
        <div className='popup-post-comment-export__header_content_s'>
          {ICON_CONVERSATION.questionmark}<b style={{marginRight: '5px'}}>Ghi chú:</b> Hình ảnh bài viết có thể bị mất sau một khoảng thời gian.
        </div>
      </div> 
      <div className="popup-post-comment-export__content">
        <div className='popup-post-comment-export__content_filter'>
          <div className='popup-post-comment-export__content_filter_f'>
            <Input
              className="post-filter-post-form__input-wide"
              icon={ORDER_ICONS.searchMd}
              placeholder="Tìm kiếm theo tên/ ID bài viết"
              value={postKeyword}
              onChange={(e) => handlePostKeywordChange(e.target.value)}
            />
          </div>
          <div className='popup-post-comment-export__content_filter_s'>
          <AlternativeAutoComplete
              className="post-filter-page-form__input-wide"
              inputProps={{
                categoryList: [{name: 'Trang', value: '1'}], // menu list in category dropdown
                categoryWidth: 70,
                placeholder: 'Chọn trang',
                readOnly: true,
                value:
                  pageValue.length > 0
                    ? `Đã chọn ${pageValue.length} trang`
                    : '',
              }}
              // menu
              menuProps={{
                empty:
                  pageList.length <= 0
                    ? pageTab === 'all'
                      ? 'Không tìm thấy trang'
                      : 'Bạn chưa chọn trang nào'
                    : '',
                multipleChoices: true,
              }}
              searchInputProps={{
                placeholder: 'Tìm trang',
                value: pageKeyword,
                onChange: handlePageKeywordChange,
              }}
              tabProps={{
                active: pageTab,
                checkedNumber: pageValue.length,
                onChange: onTabChange,
              }}
            >
              {pageList.length > 0 &&
                pageList.map(item => (
                  <Option
                    key={item.page_id}
                    className="order-filter-form__option-text"
                    checked={ 
                      !!pageValue.find(find => find === item.page_id)
                    }
                    multipleChoices={true}
                    onClick={(e) => handlePageChange(e,item)}
                  >
                    <div style={{display:'flex', alignItems: 'center'}}>
                      <div className='popup-post-comment-export__content_filter_s_avatar'>
                      <ReactImageFallback
                            src={item?.page_avatar}
                            fallbackImage="/img/facebook/no-post.png"
                            alt={!!item?.page_avatar && item?.page_avatar}
                          />
                      </div>
                      <div className='popup-post-comment-export__content_filter_s_name'>
                        {item.page_name}
                      </div>
                    </div>
                  </Option>
                ))}
            </AlternativeAutoComplete>
          </div>
          <div className='popup-post-comment-export__content_filter_re'>
            <div style={{display: 'flex',justifyContent: 'end'}}>
            <Tooltip
              className={'tooltipv2-sync-post'}
              placement="bottom-end"
              title={'Làm mới bài viết có thể tải lại tối đa 100 bài viết gần nhất.'}
            >
              <Text onClick={()=>{handleSyncPost()}}>{ICON_CONVERSATION.reload}</Text>
            </Tooltip></div>
          </div>
        </div>
        <div className='popup-post-comment-export__content_main' >
           <div className='popup-post-comment-export__content_main_th'>
              <div className='popup-post-comment-export__content_main-thead-post'>
                Bài viết
              </div>
              <div className='popup-post-comment-export__content_main-thead-page'>
                Trang phát
              </div>
              <div className='popup-post-comment-export__content_main-thead'>
                Thiết lập phạm vi dữ liệu xuất excel
              </div>
           </div>
           <div ref={menuRef} className='popup-post-comment-export__content_main_body common-scrollbar' onScroll={handlePostScroll}>
            {
              postList.length > 0 && !loading > 0 ?
              postList.map((item,key) => (
                <div className='popup-post-comment-export__content_main-body-td'>
                  <div className='popup-post-comment-export__content_main-body-td-post'>
                      <div className='popup-post-comment-export__content_main-body-td-post-img'>
                      <ReactImageFallback
                        src={item?.post_image}
                        fallbackImage="/img/facebook/no-post.png"
                        alt={!!item?.post_image && item?.post_content}
                      />
                      </div>
                      <div className='popup-post-comment-export__content_main-body-td-post-title'>
                        <p>
                          <Tooltip
                              className={'tooltipv2-title-cmt'}
                              placement="bottom"
                              title={'Xem bài viết gốc'}
                            >
                            <a href={`http://facebook.com/${item.post_id}`} target="_blank" style={{color:'#1A94FF',fontSize:'14px'}}>
                              {item?.post_content ?
                              item?.post_content.length > 30 ? 
                              item?.post_content.substring(0, 30)+' ...' : 
                                item?.post_content
                              :'---'} 
                            </a>
                          </Tooltip>
                        </p>
                        <p className='post-date'>Thời gian đăng: {!!item?.time ? fDateTimeSuffix(item?.time) : '---'}</p>
                        
                        <p className='post-emoji'> 
                          {JSON.parse(item?.reactions) && objectToArrayKeyValue(JSON.parse(item?.reactions)).map((react) => {
                            if (react.value > 0)
                              return (
                                
                                <Tooltip
                                  className={'tooltipv2-title-cmt'}
                                  placement="bottom"
                                  title={item.page_name}
                                >
                                  <Text>
                                    {ICON_CONVERSATION[react.name] ? ICON_CONVERSATION[react.name] : ICON_CONVERSATION[react.name]}&nbsp;{fNumber(react.value)} 
                                  </Text>
                                </Tooltip>
                              )
                          })} 
                        </p>
                      </div>
                  </div>
                  <div className='popup-post-comment-export__content_main-body-td-page'>
                  <ReactImageFallback
                        src={`https://graph.facebook.com/${item.page_id}/picture?with=28&height=28`}
                        fallbackImage="/img/facebook/no-post.png"
                        alt={!!item?.page_avatar && item?.page_avatar}
                      />
                  </div>
                  <div className='popup-post-comment-export__content_main-body-td-area'>
                    <div className="popup-post-comment-export__content_main-body-td-area-time">
                      <AlternativeAutoComplete
                        // main input
                        inputProps={{
                          categoryList: [],
                          categoryValue: {name: 'Loại bình luận', value: '0'},
                          categoryWidth: 111,
                          placeholder: 'Chọn loại bình luận',
                          readOnly: true,
                          value:  typeComment[key] ?  typeComment[key].name :  'Tất cả bình luận'
                        }}
                        menuProps={{
                          multipleChoices: false
                        }}
                        searchInputProps={{
                          className: 'dp-hidden-search-type-comment'
                        }}
                      >
                          <>
                          {
                            typeCommentPost.map(type=> (
                              <Option
                                key={type.id}
                                className="post-type-cmt-filter-form__option-text"
                                onClick={(e) => {handleTypeCommentChange(type,key)}}
                              >
                                <div style={{display:'flex', alignItems: 'center'}}>
                                  <div className='popup-post-comment-export__content_filter_s_name' style={{color:typeComment?.id == type.id && "#1E9A98"}}>
                                    {type.name}
                                  </div>
                                </div>
                              </Option>
                            ))
                          }
                          </>
                      </AlternativeAutoComplete>
                      {shouldOpenRangeTime.status && shouldOpenRangeTime.key == key && (
                      <CategoryDateTimeRangePicker
                        className="popup-post-comment-export__content_main-body-td-datetime"
                        categoryList={[{id: 1, name: 'Thời gian', value: 'time'}]}
                        categoryWidth={90}
                        value={item.time}
                        triggerDefault={item.time}
                        onChange={(e) =>handleDateTimeChange(e)}
                        datePickerProps={{
                          defaultValue:  [
                            getRangeTime(item.time, 0, {type: 'start'}),
                            getRangeTime(item.time, +7, {type: 'end'}),
                          ],
                          disabledDate: before(item.time),
                          placeholder: 'dd/mm/yyyy hh:mm ~ dd/mm/yyyy hh:mm',
                        }}
                      />)
                      }
                    </div>
                    <div className="popup-post-comment-export__content_main-body-td-area-setting">
                        <Tooltip
                          className={'tooltipv2-sync-cmt'}
                          placement="bottom"
                          title={'Cập nhật các bình luận mới'}
                        >
                          <Text className="td-area-setting-reload-exp" onClick={(e)=>{handleSyncComment(item.page_id,item.post_id)}}>{ICON_CONVERSATION.reloadDisable}</Text>
                        </Tooltip>
                        
                          <Text className="td-area-setting-time-exp"
                          data-expand={shouldOpenRangeTime.key == key ? shouldOpenRangeTime.status : false}
                          onClick={(e) => {
                              let date = getRangeTime(item.time, +7, {type: 'end'});
                              let end_date = date.toJSON().slice(0, 10) + ' 23:59:59';
                              shouldOpenRangeTime.status == true ? setDateTime({start_date: '',end_date: ''}) : setDateTime({start_date: item.time,end_date: end_date})
                              setShouldOpenRangeTime({status: shouldOpenRangeTime.key == key ? !shouldOpenRangeTime.status : true, key:key})
                            }
                          }
                          >
                            <Tooltip
                              className={'tooltipv2-sync-cmt'}
                              placement="bottom-end"
                              title={'Thiết lập phạm vi thời gian xuất danh sách bình luận'}
                            >{ICON_CONVERSATION.settingDisable}
                            </Tooltip>
                        </Text>
                    </div>
                    <div className="popup-post-comment-export__content_main-body-td-btn-export">
                    <Button
                      className="address-separate-tool-header__action-btn"
                      appearance="primary"
                      onClick={(e) =>handleExport(item.post_id,key)}
                    >
                      Xuất Excel
                    </Button>
                    </div>
                  </div>
                </div>
              )) :
              !loading
              ?
              (
                <div className="popup-post-comment-export__content_main_body_empty">
                <img
                  src="/img/facebook/empty-cmt-post.svg"
                  alt="empty"
                  width={160}
                  height={160}
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
                <p>
                <Text fontSize={13} lineHeight={18} color="#7C88A6">
                    Không tìm thấy dữ liệu phù hợp
                </Text>
                </p>
              </div>
              )
              :
              <PostListSkeleton />
            }
           </div>
        </div>
        <a ref={linkRef} style={{display: 'none'}}></a>
      </div>
    </>
  )
}