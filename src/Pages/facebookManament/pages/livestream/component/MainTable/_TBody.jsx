import {Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Text} from 'common/text'
import config from 'config'
import useAlert from 'hook/useAlert'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import useOrderRow from '../../hooks/useOrderRow'
import {useContext, useState} from 'react'
import {OrderEmpty} from '../orderEmpty'
import {RowOrderExtra} from './_rowOrderExtra'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import toast from 'Component/Toast'
import {useEffect} from 'react'
import {FacebookLivestreamContext} from '../../provider/_context'
import useFacebookFilterForm from '../../hooks/useFacebookFilterForm'
import './index.scss'
import {ICON_CONVERSATION} from '../../interface/icon'
import {Tooltip} from 'common/tooltip'
import {fDateTimeSuffix} from 'util/formatTime'
import ReactImageFallback from 'react-image-fallback'
import {LIVESTREAM_STATUS} from '../../interface/_const'
import {ConversationSkeleton} from '../skeleton'

export const TBody = () => {
  const {pageState} = useContext(FacebookLivestreamContext)
  const {table} = pageState

  const displayList = table.display.list
  const displayLoading = table.display.loading
  const paginationAmount = table.pagination.amount
  const paginationTotalItems = table.pagination?.totalItems
  return (
    <>
      {displayLoading ? (
        Array.from(Array(paginationAmount), (e, i) => (
          <OrderPlaceholder key={i} />
        ))
      ) : paginationTotalItems > 0 ? (
        displayList.map(item => <OrderTr key={item.video_id} data={item} />)
      ) : (
        <OrderEmpty />
      )}
    </>
  )
}
const OrderPlaceholder = ({...props}) => {
  return (
    // <Tr {...props} className="livestream-table-facebook__row">
    //   {Array.from(Array(9), (e, i) => (
    //     <Td key={i} className="livestream-table-facebook__cell" data-type="td">
    //       <Skeleton
    //         sx={{
    //           width: '100%',
    //           height: 33,
    //           background:
    //             'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
    //         }}
    //       />
    //     </Td>
    //   ))}
    // </Tr>
    <ConversationSkeleton />
  )
}

const OrderTr = ({data, ...props}) => {
  const {showAlert} = useAlert()
  const {pageState} = useContext(FacebookLivestreamContext)
  const {functions} = useFacebookFilterForm()
  const orderRow = useOrderRow(data)
  const {cell, detail, row} = orderRow
  const {codeOrder, payment} = cell

  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(null)
  const [reportCustomerModalData, setReportCustomerModalData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleEditOrder = _ => navigate(`/order/edit/${data.id}`)
  const handleCopyOrder = async _ => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/copy/${data.id}`,
    )
    if (response?.data?.success) {
      navigate(`/order/copy/${response?.data?.meta?.insert_id}`)
      toast.success(`Sao chép từ đơn hàng [${data.id}] thành công.`)
    } else toast.error(`Sao chép từ đơn hàng [${data.id}] thất bại!`)
  }

  const handleShippingStatusUpdate = async status => {
    if ([7, 15].includes(status)) setConfirmDeleteModalData(null)

    setIsLoading(true)

    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/update_status`,
      JSON.stringify({
        order_ids: [data.id],
        status,
      }),
    )

    if (response?.data?.success) {
      showAlert({content: 'Cập nhật trạng thái thành công', type: 'success'})
      functions.fetchUpdateData()
    } else {
      showAlert({
        content:
          response?.data?.errors?.details[0]?.message ||
          'Cập nhật trạng thái thất bại',
        type: 'danger',
      })
    }

    setIsLoading(false)
  }

  const handleActionApply = action => {
    switch (action) {
      case 'edit':
        handleEditOrder()
        break
      case 'shipping':
        handleShippingStatusUpdate(1)
        break
      case 'copy':
        handleCopyOrder()
        break
      case 'cancel-shipping':
        setConfirmDeleteModalData({
          content: 'Bạn có chắc chắn muốn hủy giao hàng đã chọn?',
          title: 'Hủy giao hàng',
          onClose: () => setConfirmDeleteModalData(null),
          onSubmit: () => handleShippingStatusUpdate(7),
        })
        break

      case 'cancel-order':
        setConfirmDeleteModalData({
          content: 'Bạn có chắc chắn muốn hủy đơn hàng đã chọn?',
          title: 'Hủy đơn hàng',
          onClose: () => setConfirmDeleteModalData(null),
          onSubmit: () => handleShippingStatusUpdate(15),
        })
        break

      case 'report':
        setReportCustomerModalData({
          customer: {
            name: data?.customer_name,
            phone: data?.customer_mobile,
          },
          onClose: () => setReportCustomerModalData(null),
        })
        break

      default:
        break
    }
  }

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch && pageState?.table?.display?.list?.length === 1)
      row.onToggleDetail()
  }, [])

  const openInNewTab = url => {
    // 👇️ setting target to _blank with window.open
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {isLoading && (
        <div className="livestream-table-facebook__loading">
          <img src="/img/loading.gif" />
        </div>
      )}
      <Tr
        {...props}
        className="livestream-table-facebook__row"
        extra={
          <RowOrderExtra
            id={detail?.id}
            active={row.shouldOpenDetail}
            data={detail?.active}
            rowData={orderRow}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={() =>
          navigate(`/facebook/${data.page_id}/livestream/${data.video_id}`)
        }
        style={{cursor: 'pointer'}}
      >
        <Td className="livestream-table-facebook__cell" data-type="td">
          {/* <Text>{data.page_name}</Text> */}

          <div className="livestream-table-facebook__LIVE">
            <ReactImageFallback
              src={data.thumbnails}
              fallbackImage={'/img/facebook/no-post.png'}
              alt="img bottm img"
              className="product-image"
            />
            <span
              className={`${
                data.status == 'LIVE'
                  ? 'livestream-active'
                  : 'livestream-unactive'
              }`}
            >
              LIVE
            </span>
          </div>
          <div style={{display: 'block', marginLeft: '1rem'}}>
            <Text
              as={'p'}
              onClick={e => {
                e.stopPropagation()
                openInNewTab(data.link)
              }}
            >
              <Tooltip title={'Xem bài viết gốc'} placement="top">
                <Text color="#1A94FF">{data?.title || '---'}</Text>
              </Tooltip>{' '}
            </Text>
            <Text color="#7C88A6" fontSize={12} style={{display: 'flex'}}>
              ID livestream: {data.video_id}
              {!!data?.video_id && (
                <i
                  style={{
                    display: 'flex',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }}
                  onClick={row.onCopyOrderCode}
                >
                  {ICON_CONVERSATION.copy}
                </i>
              )}
            </Text>
            <Tooltip title={''} placement="bottom">
              <Text fontSize={12}>
                Đăng lúc: {fDateTimeSuffix(data.created_time)}
              </Text>
            </Tooltip>
          </div>
        </Td>
        <Td
          className="livestream-table-facebook__cell page-avt"
          data-type="td"
          
        >
          <ReactImageFallback
            src={data.page_avatar}
            fallbackImage={'/img/facebook/fb_avatar.jpg'}
            alt="img bottm img"
            className="page-avt"
            onClick={e => {
              e.stopPropagation()
              openInNewTab(
                `https://www.facebook.com/profile.php?id=${data?.page_id}`,
              )
            }}
          />
          <Text style={{marginLeft: 12}} onClick={e => {
            e.stopPropagation()
            openInNewTab(
              `https://www.facebook.com/profile.php?id=${data?.page_id}`,
            )
          }}>{data.page_name}</Text>
        </Td>
        <Td className="livestream-table-facebook__cell" data-type="td">
          {/* <Text>{formatMoney(data?.total_amount)}</Text> */}

          <div className="livestream-table-facebook__statistical">
            <Tooltip title={'Bình luận'} placement="top">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                  src="/img/livestream/icon_mess.svg"
                  alt="icon-mess"
                  style={{marginRight: 4}}
                />{' '}
                {data?.total_comment || '0'}
              </div>
            </Tooltip>
          </div>

          <div className="livestream-table-facebook__statistical">
            <Tooltip
              title={'Khách hàng bình luận có số điện thoại'}
              placement="top"
            >
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                  src="/img/livestream/icon_phone.svg"
                  alt="icon-phone"
                  style={{marginRight: 4}}
                />{' '}
                {data?.total_phone || '0'}
              </div>
            </Tooltip>
          </div>

          <div className="livestream-table-facebook__statistical">
            <Tooltip title={'Lượt chia sẻ'} placement="top">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                  src="/img/livestream/back.svg"
                  alt="icon-back"
                  style={{marginRight: 4}}
                />{' '}
                {data?.share_count || '0'}
              </div>
            </Tooltip>
          </div>

          <div
            className="livestream-table-facebook__statistical"
            onClick={e => {
              e.stopPropagation()
              openInNewTab(
                `${config.HREF}/facebook/orders?page_id=${data?.page_id}&post_id=${data?.video_id}&start_date=&end_date=`,
              )
            }}
          >
            <Tooltip title={'Đơn hàng tạo trong livestream'} placement="top">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <img
                  src="/img/livestream/document.svg"
                  alt="icon-document"
                  style={{marginRight: 4}}
                />{' '}
                {data?.total_order || '0'}
              </div>
            </Tooltip>
          </div>
        </Td>
        <Td
          className={`livestream-table-facebook__cell ${
            data.active == 1
              ? 'livestream-table-facebook__cell--active'
              : 'livestream-table-facebook__cell--inActive'
          }`}
          data-type="td"
        >
          <Text>
            {LIVESTREAM_STATUS.find(status => status.value == data.active)
              ?.name || ''}
          </Text>
        </Td>
        {/* <Td
          className="livestream-table-facebook__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        > 
          <button
            className="livestream-table-facebook__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {ORDER_ICONS.up}
          </button>
          <RowMenuPopover
            id={data.id}
            inventory={codeOrder.haveInventory}
            shippingStatus={row.data.shipping_status_id}
            dataOrder={data}
            onActionClick={handleActionApply}
          /> 
        </Td>
        */}
      </Tr>
      {/*
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal {...confirmDeleteModalData} />
      )}
      {!!reportCustomerModalData && (
        <ReportCustomerModal data={reportCustomerModalData} />
      )}*/}
    </>
  )
}
