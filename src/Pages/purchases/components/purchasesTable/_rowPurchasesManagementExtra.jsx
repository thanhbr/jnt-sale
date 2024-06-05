import {THEME_COLORS} from 'common/theme/_colors'
import {PURCHASES_TABLE_ROW_EXTRA_TABS} from 'Pages/purchases/interfaces/_constants'
import {useState} from 'react'
import styled from 'styled-components'
import {RowTabDetailPurchases} from './_rowTabDetailPurchases'
import {RowTabReturn} from './_rowTabReturn'
import {RowTabPayment} from './_rowTabPayment'
import {RowTabWareHouse} from './_rowTabWareshouse'
import { useTranslation } from 'react-i18next'

export const RowOrderExtra = ({active, data, arrDetail,onActionCancelPurchases, status, ...props}) => {
  const [activeTab, setActiveTab] = useState(
    PURCHASES_TABLE_ROW_EXTRA_TABS[0]?.value,
  )
  const {t} = useTranslation()
  return (
    <StyledRowOrderExtra {...props} data-active={active}>
      {active && (
        <div className="row-purchases-extra__container">
          <div className="row-purchases-extra__tabs">
            {PURCHASES_TABLE_ROW_EXTRA_TABS.map(item => (
              <div
                key={item.id}
                className="row-purchases-extra__tab"
                data-active={item.value === activeTab}
                onClick={() => setActiveTab(item.value)}
              >
                {t(item.name)}
              </div>
            ))}
          </div>
          <div className="row-purchases-extra__content">
            {activeTab === 'detailPurchases' && <RowTabDetailPurchases data={data} status={status} onActionCancelPurchases={onActionCancelPurchases}/>}
            {activeTab === 'payment' && <RowTabPayment data={data} arrDetail={arrDetail}/>}
            {activeTab === 'warehouse' && <RowTabWareHouse data={data} />}
            {activeTab === 'return' && <RowTabReturn data={data} />}
          </div>
        </div>
      )}
    </StyledRowOrderExtra>
  )
}

const StyledRowOrderExtra = styled.div`
  // max-height: 0;

  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    // max-height: 176vh;
    padding: 4px 0 7px 0;
  }

  .row-purchases-extra {
    &__container {
      overflow: hidden;

      border-left: 4px solid #1e9a98;
      border-radius: 0px 8px 8px 8px;
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 4px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #e2eaf8;
      border-radius: 8px 8px 0px 0px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0px 0px;
      }

      &[data-active='true'] {
        background: #fff;
      }
    }

    &__content {
      padding: 24px 36px 32px 36px;

      background: #fff;
      border-radius: 0 8px 0 0;
    }
  }
`
