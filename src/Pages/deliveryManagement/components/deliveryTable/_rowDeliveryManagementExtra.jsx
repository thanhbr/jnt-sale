import {THEME_COLORS} from 'common/theme/_colors'
import {ORDER_TABLE_ROW_EXTRA_TABS} from 'Pages/deliveryManagement/interfaces/_constants'
import {useState} from 'react'
import styled from 'styled-components'
import {RowTabDetailDelivery} from './_rowTabDetailDelivery'
import {RowTabHistory} from './_rowTabHistory'
import {RowTabPayment} from './_rowTabPayment'
import {RowTabDetailOrder} from './_rowTabDetailOrder'

export const RowOrderExtra = ({active, data, arrDetail,onActionCancelDelivery, setOpenEditCODModal, status, ...props}) => {
  const [activeTab, setActiveTab] = useState(
    ORDER_TABLE_ROW_EXTRA_TABS[0]?.value,
  )

  return (
    <StyledRowOrderExtra {...props} data-active={active}>
      {active && (
        <div className="row-delivery-extra__container">
          <div className="row-delivery-extra__tabs">
            {ORDER_TABLE_ROW_EXTRA_TABS.map(item => (
              <div
                key={item.id}
                className="row-delivery-extra__tab"
                data-active={item.value === activeTab}
                onClick={() => setActiveTab(item.value)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="row-delivery-extra__content">
          {activeTab === 'detailDelivery' && <RowTabDetailDelivery data={data} status={status} onActionCancelDelivery={onActionCancelDelivery} setOpenEditCODModal={setOpenEditCODModal} />}
            {activeTab === 'detailOrder' && <RowTabDetailOrder data={data} arrDetail={arrDetail}/>}
            {/* {activeTab === 'journey' && <RowTabPayment data={data} />} */}
            {activeTab === 'history' && <RowTabHistory data={data} />}
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

  .row-delivery-extra {
    &__container {
      overflow: hidden;

      border-left: 4px solid #E5101D;
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
