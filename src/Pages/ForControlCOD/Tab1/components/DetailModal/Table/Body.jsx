import {formatDatetime} from 'common/form/datePicker/_functions'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import { useContext } from 'react'
import {formatMoney} from 'util/functionUtil'
import { DetailContext } from '..'
import {OrderSkeleton} from '../../skeleton'
import { ForControlCODEmpty } from '../Empty'
import './index.scss'


export const DetailBody = () => {
  const {detailList, loading} = useContext(DetailContext)

  return detailList.length > 0 && !loading ? (
    detailList.map((item, index) => <Row key={index} data={item} />)
  ) : !loading ? (
    <ForControlCODEmpty />
  ) : (
    <OrderSkeleton rows={6} />
  )
}

const Row = ({data, ...props}) => {
  return (
    <Tr {...props} className="for-controlCOD-table-detail__row">
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {data.billCode || '---'}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data?.cod || 0)}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data?.freight || '---')}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data?.codLimit || 0)}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data?.codLimit || 0)}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data?.returnFee || 0)}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data.transferFees || 0)}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data.discount || 0)}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {formatMoney(data.moneyBack || 0)}
      </Td>
      <Td className="for-controlCOD-table-detail__cell" data-type="td">
        {data.remark || '---'}
      </Td>
    </Tr>
  )
}
