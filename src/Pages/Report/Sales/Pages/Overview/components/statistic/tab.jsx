import { Text } from '../../../../../../../common/text'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import styled from 'styled-components'
import { useContext } from 'react'
import { SaleOverviewContext } from '../../provider/_context'
import { actionTypes } from '../../provider/_reducer'
import { useTranslation } from 'react-i18next'

export const StatisticTab = () => {
  const {t} = useTranslation()
  const { pageState, pageDispatch } = useContext(SaleOverviewContext)
  const { statisticTab } = pageState

  const onChangeTabs = tab => {
    pageDispatch(
      {
        type: actionTypes.UPDATE_STATISTIC_TAB,
        payload: tab
      }
    )
  }

  return (
    <StyleTabs>
      <div className={'revenue-tab'}
           data-active={statisticTab == 1}
           onClick={statisticTab != 1 ? () => onChangeTabs(1) : () => {}}>
        {REPORT_SALE_ICONS.ellipse}
        <Text color={statisticTab == 1 ? '#00081D' :'#7C88A6'}>{t('View_by_revenue_and_profit')}</Text>
      </div>
      <div className={'quantity-tab'}
           data-active={statisticTab == 2}
           onClick={statisticTab != 2 ? () => onChangeTabs(2) : () => {}}>
        {REPORT_SALE_ICONS.ellipse}
        <Text color={statisticTab == 2 ? '#00081D' :'#7C88A6'}>{t('product_sold_quantity')}</Text>
      </div>
    </StyleTabs>
  )
}

const StyleTabs = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  .revenue-tab{
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 24px;
    svg{
      margin-right: 4px;
    }
    &[data-active=true]{
      svg{
        circle{
          fill: #2276FC;
        }
      }
    }
  }
  
  .quantity-tab{
    display: flex;
    align-items: center;
    cursor: pointer;
    svg{
      margin-right: 4px;
    }
    &[data-active=true]{
      svg{
        circle{
          fill: #FF9D0B;
        }
      }
    }
  }
`