import { THEME_COLORS } from 'common/theme/_colors'
import { ORDER_TABLE_ROW_EXTRA_TABS } from 'Pages/refactorOrder/interfaces/_constants'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RowTabDetail } from './_rowTabDetail'
import { RowTabHistory } from './_rowTabHistory'
import { RowTabPayment } from './_rowTabPayment'
import { RowTabShipping } from './_rowTabShipping'
import { Spinner } from 'common/spinner'

export const RowOrderExtra = ({ id, active, data, rowData, ...props }) => {
  const [activeTab, setActiveTab] = useState(
    ORDER_TABLE_ROW_EXTRA_TABS[0]?.value,
  )
  return (
    <StyledRowOrderExtra {...props} data-active={active}>
      {active && (
        <div className="row-order-extra__container">
          <div className="row-order-extra__tabs">
            {ORDER_TABLE_ROW_EXTRA_TABS.map(item => {
              if (+data?.shipping_status_id != 8 || (data?.shipping_status_id == 8 && item.id != 2))
                return (
                  <div
                    key={item.id}
                    className="row-order-extra__tab"
                    data-active={item.value === activeTab}
                    onClick={() => setActiveTab(item.value)}
                  >
                    {item.name}
                  </div>
                )
            })}
          </div>
          <div className="row-order-extra__content common-scrollbar">
            {id === data?.id ? (
              <>
                {activeTab === 'detail' && (
                  <RowTabDetail data={data} rowData={rowData}/>
                )}
                {activeTab === 'shipping' && +data?.shipping_status_id != 8 && <RowTabShipping data={data}/>}
                {activeTab === 'payment' && (
                  <RowTabPayment data={data} rowData={rowData}/>
                )}
                {activeTab === 'history' && <RowTabHistory data={data}/>}
              </>
            ) : (
              <div className="row-order-extra__loading">
                <Spinner size={48} thickness={4}/>
              </div>
            )}
          </div>
        </div>
      )}
    </StyledRowOrderExtra>
  )
}

const StyledRowOrderExtra = styled.div`
  max-height: 0;

  overflow: hidden;

  transition: all 0.25s;

  &[data-active='true'] {
    max-height: 75vh;
    padding: 4px 0 7px 0;
  }

  .row-order-extra {
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
      max-height: 60vh;
      padding: 24px 36px 32px 36px;

      overflow: auto;

      background: #fff;
      border-radius: 0 8px 0 0;
    }

    &__loading {
      width: 100%;
      height: 200px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
