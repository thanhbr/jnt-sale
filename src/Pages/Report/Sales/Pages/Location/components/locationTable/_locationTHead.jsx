import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'
import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { ReturnFilterPopover } from './_returnPopover'
import { useTranslation } from 'react-i18next'

export const LocationTHead = ({ ...props }) => {

  const {t} = useTranslation()

  return (
    <Tr {...props} type="tHead" style={{
      borderLeft: '1px solid #e2eaf8',
      borderRight: '1px solid #e2eaf8',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    }}>
      <Th className="location-management-table__cell" data-type="th">
        STT
      </Th>
      <>
        <Th className="location-management-table__cell" data-type="th">{t('area')}</Th>
        <Th className="location-management-table__cell" data-type="th">{t('order_quantity')}</Th>
        <Th className="location-management-table__cell" data-type="th">{t('revenue')}</Th>
        <Th className="location-management-table__cell" data-type="th">
          <Text fontWeight={600} style={{marginRight: 4}}>{t('delivery_successful')} <Text as={'p'}>({t('include_settled')})</Text></Text>
          <ReturnFilterPopover sortType={4}/>
          <Tooltip
            placement={'bottom'}
            title={
              <>
                <Text as={'p'} color={'#ffffff'} fontSize={13}>{t('statistics_tooltip_1')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('include_settled_tooltip_1')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('include_settled_tooltip_2')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('include_settled_tooltip_3')}</Text>
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
        <Th className="location-management-table__cell" data-type="th">
          <Text fontWeight={600}>{t('return')}</Text>
          <ReturnFilterPopover sortType={5}/>
          <Tooltip
            placement={'bottom'}
            title={
              <>
                <Text as={'p'} color={'#ffffff'} fontSize={13}>{t('statistics_tooltip_1')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('return_tooltip_area_1')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('return_tooltip_area_2')}</Text>
                <Text as={'p'} color={'#ffffff'} fontSize={13} style={{ paddingLeft: '8px' }}> &bull; {' '} {t('return_tooltip_area_3')}</Text>
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
        <Th className="location-management-table__cell" data-type="th">
          <Text fontWeight={600} color={'#FF9F41'}>{t('draft_order')}</Text>
        </Th>
        <Th className="location-management-table__cell" data-type="th">
          <Text fontWeight={600} color={'#FF424E'}>{t('cancel_orders')}</Text>
          <Tooltip
            placement={'bottom'}
            title={t('cancel_orders_tooltip')}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '4px'
            }}
          >
            {REPORT_SALE_ICONS.question}
          </Tooltip>
        </Th>
        <Th className="location-management-table__cell" data-type="th"></Th>
      </>
    </Tr>
  )
}
