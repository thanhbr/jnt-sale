import { Button } from 'common/button'
import forControlCODFilterForm from 'Pages/ForControlCOD/Tab2/hooks/useForControlCODFilterForm'
import { ForControlCOD_ICONS } from 'Pages/ForControlCOD/Tab2/interfaces/_icons'
import { ForControlCODContext } from 'Pages/ForControlCOD/Tab2/provider/_context'
import { orderActions } from 'Pages/ForControlCOD/Tab2/provider/_reducer'
import { transformOriginData } from 'Pages/ForControlCOD/Tab2/utils/transform'
import { memo, useContext, useState } from 'react'
import { ForControlCODTags } from '../Tags'
import { ForControlCODAdvancedSearch } from './ForControlCODAdvancedSearch'
import { ForControlCODDateTime } from './_ForControlCODDateTime'
import { ForControlCODSearch } from './_ForControlCODSearch'
import { StyledForControlCODFilterForm } from './_styled'
import {useTranslation} from "react-i18next";

export const ForControlCODFilterForm = memo(({ ...props }) => {
  const { badge,canSubmitOtherFilter, functions } = forControlCODFilterForm()

  const { pageState, pageDispatch } = useContext(ForControlCODContext)
  const { loading } = pageState.table
  const [shouldCollapse, setShouldCollapse] = useState(false)
  const { t } = useTranslation()

  const collectOriginData = data => {
    const fields = [
      // 'shippingStatusListData',
      'shippingPartnerListData',
      'productListData',
    ]
    let collections = {}

    fields.forEach((item, i) => {
      const obj = {}
      obj[item] = data[i]?.status === 200 ? data[i]?.data?.data : []

      collections = { ...collections, ...obj }
    })

    pageDispatch({
      type: orderActions.FILTER_ORIGIN_DATA_UPDATE,
      payload: transformOriginData(collections),
    })
  }

  return (
    <StyledForControlCODFilterForm {...props}>
      <div className="order-filter-form__group">
        <ForControlCODSearch/>
        <ForControlCODAdvancedSearch/>
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
          icon={ForControlCOD_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldCollapse(!shouldCollapse)}
        >
            {t("general_other_filters")}
        </Button>
        {shouldCollapse && (
          <Button
            appearance="secondary"
            size="md-"
            disabled={!canSubmitOtherFilter || !loading}
            onClick={() =>
              canSubmitOtherFilter && functions.applyForControlCODOtherFilter()
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
        <ForControlCODDateTime/>
        {/* <ForControlCODPrint/> */}
        {/* <ForControlCODShippingPartner/> */}
      </div>
      <div className="order-filter-form__group" style={{ marginBottom: 4 }}>
        <ForControlCODTags/>
      </div>
    </StyledForControlCODFilterForm>
  )
})
