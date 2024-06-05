import { Text } from 'common/text'
import { StyledBulkOrderCreateTableAction } from './_styled'
import useBulkOrderCreate from '../../../hooks/useBulkOrderCreate'
import { Button } from 'common/button'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import { useContext, useState } from 'react'
import { BulkOrderCreatePrintOrder } from '../../bulkOrderCreatePrintModal'
import { BulkOrderCreateConfirmModal } from '../../bulkOrderCreateConfirmModal'
import useBulkOrderCreateForm from 'Pages/bulkOrder/hooks/useBulkOrderCreateForm'
import { BulkOrderCreateSendLoadingModal } from '../../bulkOrderCreateSendLoadingModal'
import { getArrayFromValue } from 'Pages/bulkOrder/utils/array'
import { BulkOrderCreateContext } from '../../../provider/_context'
import { bulkOrderCreateActions } from '../../../provider/_actions'
import { Checkbox } from '../../../../../common/form/checkbox'

export const BulkOrderCreateTableAction = ({ ...props }) => {
  const { table } = useBulkOrderCreate()
  const { shippingPartner, methods } = useBulkOrderCreateForm()
  const { state } = useContext(BulkOrderCreateContext)
  const [percentLoading, setPercentLoading] = useState(0)
  const rows = table.data.total.rows
  const sent = table.data.total.sent

  const canDoActionToBulkOrder = table.data.selected.list.length > 0
  const status =
    sent >= rows
      ? THEME_SEMANTICS.delivered
      : sent > 0
      ? THEME_SEMANTICS.preparing
      : THEME_SEMANTICS.failed

  const [confirmModalData, setConfirmModalData] = useState(null)
  const [printModalData, setPrintModalData] = useState(null)

  const [shouldOpenLoadingModal, setShouldOpenLoadingModal] = useState(false)

  const handleSendBulkOrder = () => {
    setPercentLoading(0)
    if (!canDoActionToBulkOrder) return
    setShouldOpenLoadingModal(true)
    //handle select list
    const selectedList = state.table.selected.list
    const detailList = selectedList.map(item => Number(item.id))
    const numberPackage = Math.ceil(detailList.length / 10)
    const numberPack = Array.from(Array(10).keys())
    let details = []
    if (detailList.length < 10) details = [detailList]
    else {
      numberPack.map((item, index) => {
        details.push(detailList.slice(index * numberPackage, (index + 1) * numberPackage))
      })
    }
    let arrPercent = [false, false, false, false, false, false, false, false, false, false]
    let dataRes = {
      failed: [],
      success: [],
    }
    details.map((item, index) => {
      const response = table.methods.onSendOrder(item)
      response.then(res => {
        if (!!res?.data?.success) {
          if (getArrayFromValue(res?.data?.data?.failed).length > 0)
            methods.onErrorUpdate(getArrayFromValue(res?.data?.data?.failed))
          let failed = res?.data?.data?.failed ?? []
          let success = res?.data?.data?.success ?? []
          dataRes = {
            failed: [...dataRes.failed, ...failed],
            success: [...dataRes.success, ...success],
          }
          setPrintModalData({
            data: {
              ...dataRes,
              shippingPartner: {
                code: shippingPartner.data.value?.data?.print_partner,
              },
            },
            onClose: () => setPrintModalData(null),
          })
        }
        if (res) {
          arrPercent[index] = true
          if (details.length > 1)
            setPercentLoading(arrPercent.filter((item) => item == true).length * 10)
          else
            setPercentLoading(100)
          if (arrPercent.filter((item) => item == true).length == 10 || details.length == 1)
            setShouldOpenLoadingModal(false)
        }
      })
    })
  }

  const handleDeleteBulkOrder = () => {
    if (!canDoActionToBulkOrder) return

    setConfirmModalData({
      onClose: () => setConfirmModalData(null),
      onSubmit: table.methods.onDeleteOrder,
    })
  }

  return (
    <StyledBulkOrderCreateTableAction {...props}>
      <div className="bulk-order-create-table-action__btn-list">
        <Text>Đã chọn: {table.data.selected.list.length}</Text>
        <Button
          appearance="secondary"
          disabled={!canDoActionToBulkOrder || table.data.display.onlyError}
          size="sm"
          style={{ marginLeft: 16 }}
          onClick={handleSendBulkOrder}
        >
          Gửi đơn giao hàng
        </Button>
        <Button
          appearance="secondary"
          disabled={!canDoActionToBulkOrder}
          size="sm"
          style={{ marginLeft: 12 }}
          onClick={handleDeleteBulkOrder}
        >
          Xóa
        </Button>
      </div>
      <div className="bulk-order-create-table-action__figure">
        <div className="bulk-order-create-table-action__figure-checkbox"
             onClick={() => table.methods.onAllFailSelected(!table.data.display.onlyError)}>
          <Checkbox checked={!!table.data.display.onlyError} className={'figure-checkbox'}/>
          <Text style={{ cursor: 'pointer' }}>Chỉ hiển thị các đơn lỗi</Text>
        </div>
        <Text>
          Trình trạng lên đơn:{' '}
          <Text color={status}>
            {sent}/{rows}
          </Text>
        </Text>
      </div>
      {!!confirmModalData && (
        <BulkOrderCreateConfirmModal data={confirmModalData}/>
      )}
      {shouldOpenLoadingModal && <BulkOrderCreateSendLoadingModal percentLoading={percentLoading}/>}
      {!!printModalData && !shouldOpenLoadingModal && <BulkOrderCreatePrintOrder data={printModalData}/>}
    </StyledBulkOrderCreateTableAction>
  )
}
