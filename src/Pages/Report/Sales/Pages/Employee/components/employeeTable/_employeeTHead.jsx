import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { Tooltip } from 'common/tooltip'
import { Text } from '../../../../../../../common/text'
import { StatisticFilterPopover } from './_statisticFilterPopover'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const EmployeeTHead = ({ ...props }) => {

  const {t} = useTranslation()

  return (
    <Tr {...props} type="tHead"
        className={'report-table__employee-row'}
        style={{
          borderLeft: '1px solid #e2eaf8',
          borderRight: '1px solid #e2eaf8',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          overflow: 'hidden',
          width: '1604px'
        }}>
      <Th className="employee-management-table__cell">
        STT
      </Th>
      <>
        <Th className="employee-management-table__cell">{t('employee')}</Th>
        <Th className="employee-management-table__cell">{t('Send_delivery')}</Th>
        <Th className="employee-management-table__cell">{t('successfully_pick_up_goods')}</Th>
        <Th className="employee-management-table__cell">
          <Text fontWeight={600}>{t('delivering_goods')}</Text>
          <Tooltip
            placement={'bottom'}
            title={
              t('delivering_goods_tooltip')
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_SALE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="employee-management-table__cell">
          <Text fontWeight={600}>{t('return')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('return_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_SALE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="employee-management-table__cell">
          <Text fontWeight={600}>{t('delivery_successful')}</Text>
          <Tooltip
            placement={'bottom'}
            title={
              t('delivery_successful_tooltip')
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_SALE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="employee-management-table__cell">{t('Settled')}</Th>
        <Th className="employee-management-table__cell">
          <Text fontWeight={600}>{t('statistics')}</Text>
          <StatisticFilterPopover/>
          <Tooltip
            placement={'bottom'}
            title={
              <>
                <Text as={'p'} color={'#ffffff'} fontSize={13}>{t('statistics_tooltip_1')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('statistics_tooltip_2')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('statistics_tooltip_3')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('statistics_tooltip_4')}</Text>
              </>
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_SALE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="employee-management-table__cell">
          <Text fontWeight={600} color={'#FF9F41'}>{t('draft_order')}</Text>
        </Th>
        <Th className="employee-management-table__cell">
          <Text fontWeight={600} color={'#FF424E'}>{t('cancel_orders')}</Text>
          <Tooltip
            placement={'bottom'}
            title={
              t('cancel_orders_tooltip')
            }
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_SALE_ICONS.question}
          </Tooltip>
        </Th>
      </>
    </Tr>
  )
}

