import {Button} from 'common/button'
import useBulkOrderFilter from 'Pages/bulkOrder/hooks/useBulkOrderFilter'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {useEffect, useState} from 'react'
import {BulkOrderFilterDateTime} from './components/bulkOrderFilterDateTime'
import {BulkOrderFilterEmployee} from './components/bulkOrderFilterEmployee'
import {BulkOrderFilterSearch} from './components/bulkOrderFilterSearch'
import {BulkOrderFilterShippingPartner} from './components/bulkOrderFilterShippingPartner'
import {StyledBulkOrderFilter} from './_styled'

export const BulkOrderFilter = ({...props}) => {
  const {properties, methods} = useBulkOrderFilter()

  const [shouldOpenCollapse, setShouldOpenCollapse] = useState(false)

  useEffect(() => {
    methods.fetchOrigin()
  }, [])

  return (
    <StyledBulkOrderFilter {...props}>
      <div className="bulk-order-filter__group">
        <div className="bulk-order-filter__group-item">
          <BulkOrderFilterSearch />
        </div>
        <Button
          className="bulk-order-filter__action-btn"
          appearance="secondary"
          badge={properties.otherFilterBadge}
          badgeType="danger"
          icon={BULK_ORDER_ICONS.filterFunnel02}
          size="md-"
          onClick={() => setShouldOpenCollapse(!shouldOpenCollapse)}
        >
          Bộ lọc khác
        </Button>
        {shouldOpenCollapse && (
          <Button
            className="bulk-order-filter__action-btn"
            appearance="secondary"
            disabled={!properties.canSubmitOtherFilter}
            size="md-"
            style={{minWidth: 98}}
            onClick={() =>
              properties.canSubmitOtherFilter &&
              methods.fetchTableWithOtherFilter()
            }
          >
            Áp dụng
          </Button>
        )}
      </div>
      <div
        className="bulk-order-filter__group"
        data-collapse={shouldOpenCollapse}
      >
        {/*<div className="bulk-order-filter__group-item">*/}
        {/*  <BulkOrderFilterShippingPartner />*/}
        {/*</div>*/}
        <div className="bulk-order-filter__group-item">
          <BulkOrderFilterEmployee />
        </div>
        <div className="bulk-order-filter__group-item">
          <BulkOrderFilterDateTime />
        </div>
      </div>
    </StyledBulkOrderFilter>
  )
}
