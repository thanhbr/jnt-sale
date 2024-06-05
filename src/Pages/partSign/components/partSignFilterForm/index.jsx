import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import config from 'config'
import partSignFilterForm from 'Pages/partSign/hooks/usePartSignFilterForm'
import {DELIVERY_ICONS} from 'Pages/partSign/interfaces/_icons'
import {DeliveryContext} from 'Pages/partSign/provider/_context'
import {orderActions} from 'Pages/partSign/provider/_reducer'
import {transformOriginData} from 'Pages/partSign/utils/transform'
import {memo, useContext, useEffect, useState} from 'react'
import {PartSignAdvancedSearch} from './PartSignAdvancedSearch'
import {PartSignDateTime} from './_partSignDateTime'
import {PartSignOrderOrigin} from './_partSignOrderOrigin'
import {PartSignSearch} from './_partSignSearch'
import {PartSignShippingPartner} from './_partSignShippingPartner'
import {StyledOrderFilterForm} from './_styled'
import {PartSignAdminUser} from './_partSignAdminUser'
import { PartSignTags } from '../partSignTags'
import {useTranslation} from "react-i18next";

export const PartSignFilterForm = memo(({...props}) => {
  const {badge, canSubmitOtherFilter, functions} = partSignFilterForm()
  const { t } = useTranslation()

  const {pageState, pageDispatch} = useContext(DeliveryContext)

  const [shouldCollapse, setShouldCollapse] = useState(false)

  const collectOriginData = data => {
    const fields = [
      'adminUserList',
      'shippingPartnerListData',
      'orderOriginList',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = {...collections, ...obj}
    })
    
    pageDispatch({
      type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/users`),
        sendRequestAuth('get', `${config.API}/order/shipping/partner`),
        sendRequestAuth('get', `${config.API}/order/origins?status=1`),
      ])

      collectOriginData(response)
    }

    fetchData()
  }, [])

  return (
    <StyledOrderFilterForm {...props}>
      <div className="order-filter-form__group">
        <PartSignSearch />
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
          icon={DELIVERY_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
          {t("other_filters")}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter}
            onClick={() =>
              canSubmitOtherFilter && functions.applyDeliveryOtherFilter()
            }
          >
            {t("apply")}
          </Button>
        )}
      </div>
      <div
        className="order-filter-form__group order-filter-form__collapse"
        data-collapse={shouldCollapse}
      >
        <PartSignDateTime />
        <PartSignAdminUser />
        {/*<PartSignShippingPartner />*/}
        <PartSignOrderOrigin />
      </div>
      <div className="order-filter-form__group" style={{marginBottom: 4}}>
        <PartSignTags />
      </div>
    </StyledOrderFilterForm>
  )
})
