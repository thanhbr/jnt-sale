import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {transformOriginData} from '../../utils/transform'
import {memo, useContext, useEffect, useReducer, useState} from 'react'
import {OrderTags} from '../tags'
import {OrderDateTime} from './_orderDateTime'
import {OrderEmployee} from './_orderEmployee'
import {OrderSearch} from './_orderSearch'
import {OrderShippingStatus} from './_orderShippingStatus'
import {OrderWarehouse} from './_orderWarehouse'
import {StyledOrderFilterForm} from './_styled'
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";
import {InventoryContext} from "../../provider/_context";
import {InventoryAction} from "../../provider/_action";

export const InventoryFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = useInventoryFilterForm()

  const {pageDispatch} = useContext(InventoryContext)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'employeeGroupData',
      'employeeListData',
      'warehouseListData',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = {...collections, ...obj}
    })
    pageDispatch({
      type: InventoryAction.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/employee/groups`),
        sendRequestAuth('get', `${config.API}/admin/employees?keyword=&group=&status=&per_page=100&start`),
        sendRequestAuth('get', `${config.API}/warehouse/warehouses`),
      ])

      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <OrderSearch />
        <Button
          appearance="secondary"
          badge={
            badge.others > 0
              ? badge.others > 9
                ? '9+'
                : badge.others
              : undefined
          }
          badgeType="danger"
          icon={ORDER_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          Bộ lọc khác
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            disabled={!canSubmitOtherFilter}
            size="md-"
            onClick={() =>
              canSubmitOtherFilter && functions.applyOrderOtherFilter()
            }
          >
            Áp dụng
          </Button>
        )}
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <OrderDateTime />
        <OrderWarehouse />
        <OrderShippingStatus />
        <OrderEmployee />
      </div>
      <div className="order-filter-form__group" style={{marginBottom: 4}}>
        <OrderTags />
      </div>
    </StyledOrderFilterForm>
  )
})
