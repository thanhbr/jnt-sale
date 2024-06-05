import {Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Checkbox} from 'common/form/checkbox'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import useVirtualize from 'layouts/tableLayout/useVirtualize'
import {Td} from 'layouts/tableLayout/_td'
import useBulkOrderCreate from 'Pages/bulkOrder/hooks/useBulkOrderCreate'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {useContext, useEffect} from 'react'
import {useMemo, useState} from 'react'
import {formatMoney} from 'util/functionUtil'
import {BulkOrderCreateConfirmModal} from '../../bulkOrderCreateConfirmModal'
import {BulkOrderEmpty} from '../../bulkOrderEmpty'
import {BulkOrderCreateTableTbodyEditModal} from './components/bulkOrderCreateTableTbodyEditModal'
import {BulkOrderCreateTableTbodyReportModal} from './components/bulkOrderCreateTableTbodyReportModal'
import {StyledBulkOrderCreateTableTbodyTr} from './_styled'
import {BulkOrderFailStatus} from './components/bulkOrderFailStatus'
import {bulkOrderCreateActions} from '../../../provider/_actions'
import {BulkOrderCreateContext} from '../../../provider/_context'
import {CustomToolTip} from 'Component/tooltip/CustomTooltip'
import {Tooltip} from 'common/tooltipv2'

const rowHeight = 66

export const BulkOrderCreateTableTbody = () => {
  const {table} = useBulkOrderCreate()

  const {viewport} = useVirtualize({height: rowHeight})

  const displayList = useMemo(
    () => table.data.display.list,
    [table.data.display.list],
  )

  if (table.data.display.loading)
    return (
      <>
        {Array.from(Array(20), (e, i) => (
          <Placeholder key={i} />
        ))}
      </>
    )

  if (table.data.display.list.length <= 0)
    return (
      <BulkOrderEmpty>
        <Text as="b" color="#7C88A6">
          Không tìm thấy dữ liệu phù hợp
        </Text>
      </BulkOrderEmpty>
    )

  return (
    <>
      {displayList.map((item, i) => {
        return (
          <Row
            key={item?.id}
            data={item}
            hidden={
              i * rowHeight < viewport.top || i * rowHeight > viewport.bottom
            }
          />
        )
      })}
    </>
  )
}

const Row = ({data, hidden, ...props}) => {
  const {showAlert} = useAlert()
  const {dispatch} = useContext(BulkOrderCreateContext)
  const {table} = useBulkOrderCreate()
  const errList = table.data.error.list
  const reportList = table.data.report.list

  const findReport = reportList.find(item => item?.phone === data?.phone)

  const [confirmModalData, setConfirmModalData] = useState(null)
  const [editModalData, setEditModalData] = useState(null)
  const [reportCustomerModalData, setReportCustomerModalData] = useState(null)
  const [isHoverTooltip, setIsHoverTooltip] = useState(false)
  const [isWrapperScrolling, setIsWrapperScrolling] = useState(false)

  const findErr = errList.find(item => item?.detail_id === data?.id)
  const isDisabled = [
    !!data?.name,
    !!data?.phone,
    data?.address,
    !!data?.city_id && data.city_id !== '0',
    !!data?.district_id && data.district_id !== '0',
    !!data?.ward_id && data.ward_id !== '0',
    !!data?.number_pack,
    !!data?.weight,
    !!data?.item_name,
  ].includes(false)
  const isFailedOrder = isDisabled
  const isFailedOrderApi = data.status == 3 || !!findErr

  const isOrverWeight = Number(data?.weight || 0) > 20

  const handleDeleteBulkOrder = () => {
    setConfirmModalData({
      onClose: () => setConfirmModalData(null),
      onSubmit: () => table.methods.onDeleteOrder(data?.id),
    })
  }

  const handleEditModalSubmit = async opt => {
    dispatch({
      type: bulkOrderCreateActions.TABLE_ERROR_UPDATE,
      payload: {
        error: {
          list: errList.filter(item => item?.detail_id !== opt?.detail_id),
        },
      },
    })
    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/bulks/save`,
      JSON.stringify(opt),
    )

    if (!!response?.data?.success) {
      showAlert({
        type: 'success',
        content: 'Cập nhật thông tin đơn hàng thành công',
      })
      table.methods.onFecthFile(data?.file_id, {notLoading: true})
      setEditModalData(null)
    } else
      showAlert({
        type: 'danger',
        content: 'Cập nhật thông tin đơn hàng thất bại',
      })
  }

  const handleOpenReportModal = () =>
    setReportCustomerModalData({
      customer: {
        name: findReport?.name,
        phone: findReport?.phone,
      },
      onClose: () => {
        setReportCustomerModalData(null)
        setIsHoverTooltip(true)
      },
    })

  const handleOpenEditModal = () => {
    setEditModalData({
      data,
      onClose: () => {
        setEditModalData(null)
        setIsHoverTooltip(true)
      },
      onSubmit: handleEditModalSubmit,
    })
  }

  const validatePhone = phone => {
    if (
      (phone.length === 10 && phone.startsWith('00')) ||
      !phone.startsWith('0')
    )
      return 'SĐT sai thực tế'
    return ''
  }

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (!wrapper) return

    wrapper.addEventListener(
      'scroll',
      () => !isWrapperScrolling && setIsWrapperScrolling(true),
    )

    return () =>
      wrapper.removeEventListener(
        'scroll',
        () => !isWrapperScrolling && setIsWrapperScrolling(true),
      )
  }, [])

  if (hidden) return <div style={{height: 66}}></div>
  const errorTooltip = isFailedOrder
    ? [
        data?.phone
          ? validatePhone(data.phone)
          : 'Số điện thoại không được để trống',
        !data?.address ? 'Địa chỉ không được để trống' : '',
        !data?.city_name || !data?.district_name || !data?.ward_name
          ? 'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã chưa đầy đủ'
          : '',
        !data?.item_name ? 'Nội dung hàng hóa không được để trống' : '',
        isOrverWeight
          ? 'Đơn hàng có trọng lượng lớn'
          : !data?.weight
          ? 'Trọng lượng không được để trống'
          : '',
        !data?.number_pack ? 'Số kiện không được để trống' : '',
      ]
    : []
  return (
    <>
      <CustomToolTip followCursor={true} title={''}>
        <StyledBulkOrderCreateTableTbodyTr
          {...props}
          data-status={
            isFailedOrder
              ? 'failed'
              : isFailedOrderApi
              ? 'failedApi'
              : 'success'
          }
          style={{width: 3000}}
          onMouseEnter={() => setIsHoverTooltip(false)}
          onMouseMove={() => isWrapperScrolling && setIsWrapperScrolling(false)}
        >
          <Td className="bulk-order-create-table-tbody-tr__td">
            <Checkbox
              checked={table.methods.onCheckSelected(data?.id)}
              // disabled={isDisabled}
              // onClick={() => !isDisabled && table.methods.onSelected(data)}
              onClick={() => table.methods.onSelected(data)}
              onMouseEnter={() => setIsHoverTooltip(true)}
              onMouseLeave={() => setIsHoverTooltip(false)}
            />
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {data?.file_row || '---'}
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div>{data?.order_code || '---'}</div>
            <BulkOrderFailStatus
              type={isFailedOrder ? 1 : isFailedOrderApi ? 2 : 3}
              tooltip={errorTooltip}
              tooltipApi={findErr?.message || data?.failed_reason || ''}
            />
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div data-error={!data.name}>
              {data?.name || (
                <ErrTooltip
                  title="Tên người nhận không được để trống"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}{' '}
              {!!findReport && (
                <CustomToolTip
                  placement="bottom-end"
                  title={`Đã bị báo xấu ${findReport?.totals} lần`}
                >
                  <span
                    style={{
                      marginLeft: 4,
                      display: 'inline-block',
                      transform: 'translateY(2px)',
                      cursor: 'pointer',
                    }}
                    onClick={handleOpenReportModal}
                    onMouseEnter={() => setIsHoverTooltip(true)}
                    onMouseLeave={() => setIsHoverTooltip(false)}
                  >
                    {BULK_ORDER_ICONS.alertTriangle}
                  </span>
                </CustomToolTip>
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div
              data-error={
                !data.phone ? true : validatePhone(data.phone) ? true : false
              }
            >
              {data?.phone ? (
                validatePhone(data.phone) ? (
                  <ErrTooltip
                    title={validatePhone(data.phone)}
                    textProps={{
                      onMouseEnter: () => setIsHoverTooltip(true),
                      onMouseLeave: () => setIsHoverTooltip(false),
                    }}
                  >
                    {data.phone}
                  </ErrTooltip>
                ) : (
                  data.phone
                )
              ) : (
                <ErrTooltip
                  title="Số điện thoại không được để trống"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div data-error={!data.address}>
              {data?.address || (
                <ErrTooltip
                  title="Địa chỉ không được để trống"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div data-error={!data.city_name}>
              {data?.city_name || (
                <ErrTooltip
                  className="alert-address"
                  title="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã chưa đầy đủ"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div data-error={!data.district_name}>
              {data?.district_name || (
                <ErrTooltip
                  className="alert-address"
                  title="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã chưa đầy đủ"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div data-error={!data.ward_name}>
              {data?.ward_name || (
                <ErrTooltip
                  className="alert-address"
                  title="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã chưa đầy đủ"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td ">
            <div data-error={!data.item_name}>
              {data?.item_name ? (
                <div className="common-ellipsis --multiple">
                  <CustomToolTip title={data.item_name}>
                    <div
                      onMouseEnter={() => setIsHoverTooltip(true)}
                      onMouseLeave={() => setIsHoverTooltip(false)}
                    >
                      {data.item_name}
                    </div>
                  </CustomToolTip>
                </div>
              ) : (
                <ErrTooltip
                  title="Nội dung hàng hóa không được để trống"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {data?.insurrance ? formatMoney(data.insurrance) : '---'}
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {data?.cod ? formatMoney(data.cod) : '---'}
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div data-error={!data.weight}>
              {data?.weight || (
                <ErrTooltip
                  title="Trọng lượng không được để trống"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}{' '}
              {isOrverWeight && (
                <CustomToolTip
                  placement="bottom"
                  title="Đơn hàng trọng lượng lớn"
                >
                  <span
                    style={{
                      marginLeft: 4,
                      display: 'inline-block',
                      transform: 'translateY(2px)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={() => setIsHoverTooltip(true)}
                    onMouseLeave={() => setIsHoverTooltip(false)}
                  >
                    {BULK_ORDER_ICONS.warningTriangle}
                  </span>
                </CustomToolTip>
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {data?.lengh || '---'}
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {data?.width || '---'}
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {data?.height || '---'}
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <div data-error={!data.number_pack}>
              {data?.number_pack || (
                <ErrTooltip
                  title="Số kiện không được để trống"
                  textProps={{
                    onMouseEnter: () => setIsHoverTooltip(true),
                    onMouseLeave: () => setIsHoverTooltip(false),
                  }}
                />
              )}
            </div>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {data?.ship_fee_custom ? formatMoney(data.ship_fee_custom) : '---'}
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            <Tooltip
              className="tooltipv2-note"
              title={data?.note}
              baseOn="height"
            >
              <Text>{data?.note || '---'}</Text>{' '}
            </Tooltip>
          </Td>
          <Td className="bulk-order-create-table-tbody-tr__td">
            {BULK_ORDER_ICONS.manipulation}
            <div className="__hover-container">
              <CustomToolTip placement="bottom-end" title="Chỉnh sửa">
                <span
                  style={{cursor: 'pointer'}}
                  onClick={handleOpenEditModal}
                  onMouseEnter={() => setIsHoverTooltip(true)}
                  onMouseLeave={() => setIsHoverTooltip(false)}
                >
                  {BULK_ORDER_ICONS.edit05}
                </span>
              </CustomToolTip>
              <span style={{width: 16, display: 'inline-block'}}></span>
              <CustomToolTip placement="bottom" title="xóa">
                <span
                  style={{cursor: 'pointer'}}
                  onClick={handleDeleteBulkOrder}
                  onMouseEnter={() => setIsHoverTooltip(true)}
                  onMouseLeave={() => setIsHoverTooltip(false)}
                >
                  {BULK_ORDER_ICONS.trash}
                </span>
              </CustomToolTip>
            </div>
          </Td>
        </StyledBulkOrderCreateTableTbodyTr>
      </CustomToolTip>
      {!!confirmModalData && (
        <BulkOrderCreateConfirmModal data={confirmModalData} />
      )}
      {!!editModalData && (
        <BulkOrderCreateTableTbodyEditModal data={editModalData} />
      )}
      {!!reportCustomerModalData && (
        <BulkOrderCreateTableTbodyReportModal data={reportCustomerModalData} />
      )}
    </>
  )
}

const ErrTooltip = ({textProps, ...props}) => {
  return (
    <CustomToolTip {...props} placement="bottom-start" title={props?.title}>
      <Text
        {...textProps}
        color={THEME_SEMANTICS.failed}
        style={{cursor: 'pointer'}}
      >
        {props?.children || '---'}
      </Text>
    </CustomToolTip>
  )
}

const Placeholder = ({...props}) => {
  return (
    <StyledBulkOrderCreateTableTbodyTr {...props} style={{width: 3000}}>
      {Array.from(Array(19), (e, i) => (
        <Td key={i} className="bulk-order-create-table-tbody-tr__td">
          <Skeleton
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </Td>
      ))}
    </StyledBulkOrderCreateTableTbodyTr>
  )
}
