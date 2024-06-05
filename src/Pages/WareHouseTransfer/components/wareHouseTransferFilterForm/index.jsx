import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import config from 'config'
import { WAREHOUSE_TRANSFER_ICONS } from 'Pages/WareHouseTransfer/interfaces/_icons'
import { WareHouseTransferContext } from 'Pages/WareHouseTransfer/provider/_context'
import { warehouseTransferActions } from 'Pages/WareHouseTransfer/provider/_reducer'
import { transformOriginData } from 'Pages/WareHouseTransfer/utils/transform'
import { memo, useContext, useEffect, useReducer, useState } from 'react'
import { WareHouseTransferTags } from '../wareHouseTransferTags'
import { OrderDateTime } from './_dateTime'
import { CreatedUser } from './_createdUser'
import { OrderSearch } from './_search'
import { WarehouseImport } from './_warehouseImport'
import { StyledWarehouseTSFilterForm } from './_styled'
import { WarehouseExport } from './_warehouseExport'
import useWareHouseTransferFilterForm from 'Pages/WareHouseTransfer/hooks/useWareHouseTransferFilterForm'

export const WareHouseFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = useWareHouseTransferFilterForm()

  const { pageState, pageDispatch } = useContext(WareHouseTransferContext)
  const { loading } = pageState.table
  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'warehouse',
      'user',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = { ...collections, ...obj }
    })

    pageDispatch({
      type: warehouseTransferActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/warehouse/warehouses?status=1&per_page=5000&start=`),
        sendRequestAuth('get', `${config.API}/admin/users`),
      ])
      
      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledWarehouseTSFilterForm {...props}>
      <div className="warehouse-ts-filter-form__group">
        <OrderSearch/>
        <Button
          disabled={!loading}
          appearance="secondary"
          badge={
            badge.others > 0
              ? badge.others > 9
              ? '9+'
              : badge.others
              : undefined
          }
          badgeType="danger"
          icon={WAREHOUSE_TRANSFER_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          Bộ lọc khác
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter || !loading}
            onClick={() =>
              canSubmitOtherFilter && functions.applyWareHouseTransferOtherFilter()
            }
          >
            Áp dụng
          </Button>
        )}
      </div>
      <div
        className="warehouse-ts-filter-form__group warehouse-ts-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <OrderDateTime/>
        <WarehouseExport/>
        <WarehouseImport/>
        <CreatedUser/>
      </div>
      <div className="warehouse-ts-filter-form__group" style={{ marginBottom: 4 }}>
        <WareHouseTransferTags/>
      </div>
    </StyledWarehouseTSFilterForm>
  )
})
