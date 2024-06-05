import {sendRequestAuth} from 'api/api'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import config from 'config'
import {useRef, useState} from 'react'
import {StyledDeliveryDownCOD} from './_styled'
import useClickOutside from 'Pages/customer/useClickOutside'
import { formatMoney } from 'util/functionUtil'
import {
  Table,
  TableCell,
  TableRow
} from '@material-ui/core'
import {Button} from 'common/button'
import { DeliveryDownCOD } from '../deliveryDownCOD'
import useRow from 'Pages/deliveryManagement/hooks/useRow'
import { fDateTimeSuffix } from 'util/formatTime'
import { useTranslation } from 'react-i18next'

const PopupDownCODDetail = ({width, handleClose, codDetail, dataDetail, ...props}) => {
  const {t} = useTranslation()
  const ref = useRef()
  useClickOutside(ref, handleClose)
  const [openEditCODModal, setOpenEditCODModal] = useState(false)
  const deliveryRow = useRow(dataDetail)
  const {row} = deliveryRow

  return (
    <StyledDeliveryDownCOD {...props}  style={{cursor: 'inherit'}}>
      <div
        className="delivery-down-COD__container" ref={ref}
      >
        <div className='delivery-down-COD__modal_text_hd'>{t('history_COD')}</div>
        <div className='delivery-down-COD__modal_btn_hd'>
          <Text
            color="#00081D"
            fontSize={16}
            lineHeight={19.6}
            style={{marginBottom: 12}}
          >
            {t('original_COD_value')}:{' '}
            <Text
              color={THEME_COLORS.green}
              fontSize={14}
              lineHeight={19.6}
              style={{marginBottom: 12}}
            >
              {formatMoney(codDetail?.cod_first)}
            </Text>
          </Text>
          {
            codDetail.history.length < 3 && (
              <Button
                appearance="primary"
                size="sm"
                style={{width: 89,padding: 0}}
                onClick={() => setOpenEditCODModal(true)}>
                  {t('modified_COD')}
              </Button>
            )
          }
          
        </div>
        <Table style={{marginTop: '24px'}}>
          <TableRow className='delivery-down-COD__table_header'>
            <TableCell className='delivery-down-COD__table_th'>{t('COD_value_information')}</TableCell>    
            {codDetail.history.map((it, index) => ( 
                <TableCell className='delivery-down-COD__table_th'>{t('times_modified')} {index+1}</TableCell>
            ))}
          </TableRow>
          <TableRow className='delivery-down-COD__table_cell'>
            <TableCell>{t('COD_before_adjustment')}</TableCell>
            {codDetail.history.map((it, index) => ( 
                <TableCell>{formatMoney(it.cod_before)}</TableCell>
            ))} 
          </TableRow>
          <TableRow className='delivery-down-COD__table_cell'>
            <TableCell>{t('COD_after_adjustmen')}</TableCell>
            {codDetail.history.map((it, index) => ( 
                <TableCell>
                  <Text
              color={THEME_COLORS.green}
              fontSize={14}
              lineHeight={19.6}
              style={{marginBottom: 12}}
            >
              {formatMoney(it.cod_after)}
            </Text></TableCell>
            ))} 
          </TableRow>
          <TableRow className='delivery-down-COD__table_cell'>
            <TableCell>{t('adjustment_employee')}</TableCell>
            {codDetail.history.map((it, index) => ( 
                <TableCell>{it.fullname}</TableCell>
            ))} 
          </TableRow>
          <TableRow className='delivery-down-COD__table_cell'>
            <TableCell>{t('adjustment_date')}</TableCell>
            {codDetail.history.map((it, index) => ( 
                <TableCell>{fDateTimeSuffix(it.updated_at)}</TableCell>
            ))} 
          </TableRow>
        </Table>
        {openEditCODModal && (
        <DeliveryDownCOD
          onClose={() => setOpenEditCODModal(false)}
          curValue={dataDetail?.cod}
          billCode={dataDetail?.billcode}
          refreshOrderDetails={row?.refreshOrderDetails}
        />
      )}
      </div>
    </StyledDeliveryDownCOD>
  )
}

export default PopupDownCODDetail
