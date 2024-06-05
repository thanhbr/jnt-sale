import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltipv2'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import {CashBooksContext} from 'Pages/CashBooks/provider/_context'
import {useContext} from 'react'
import { Link } from 'react-router-dom'
import {fDateTimeSuffix} from 'util/formatTime'
import {formatMoney} from 'util/functionUtil'
import {CashBooksEmpty} from '../Empty'
import {OrderSkeleton} from '../skeleton/index'
import {CellCode} from './_cellCodeCashBooks'
import {CellObject} from './_cellObject'
import {CASHBOOKS_LINK_REFERENCE_DOCS} from "../../interfaces/_constants";

export const CashBooksTBody = () => {
  const {pageState} = useContext(CashBooksContext)
  const displayList = pageState.table.display.list

  const loading = pageState.table.loading
  return (
    <>
      {displayList.length > 0 && loading ? (
        displayList.map((item, index) => <OrderTr key={index} data={item} />)
      ) : loading ? (
        <CashBooksEmpty />
      ) : (
        <OrderSkeleton rows={15} />
      )}
    </>
  )
}

const OrderTr = ({data, arr_detail, ...props}) => {
  const cellCodeCashBookFormatDateTime = dateTimeParam => {
    const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
    const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
    const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
    const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
    const hm = `${hms[0]}:${hms[1]}`
    return `${dmy} ${hm}`.trim()
  }

  return (
    <Tr {...props} className="cash-books-table__row">
      <Td className="cash-books-table__cell" data-type="td">
        <CellCode
          id={data.code}
          time={cellCodeCashBookFormatDateTime(data?.dt_created)}
          type={data?.type}
        />
      </Td>
      <Td className="cash-books-table__cell" data-type="td">
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={400}
          lineHeight={20}
        >
          {fDateTimeSuffix(data.dt_record) || '---'}
        </Text>
      </Td>
      <Td className="cash-books-table__cell" data-type="td">
        <CellObject
          name={data.object_name}
          type={data.object_type}
          data={data}
        />
      </Td>
      <Td className="cash-books-table__cell" data-type="td">
        <Tooltip
          className="tooltip-height"
          title={data.description}
          baseOn="height"
          placement="top-center"
        >
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
          >
            {data.description || '---'}
          </Text>
        </Tooltip>
      </Td>
      <Td className="cash-books-table__cell" data-type="td">
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={400}
          lineHeight={20}
        >
          {data.type === '1' ? formatMoney(data.amount) : '---'}
        </Text>
      </Td>
      <Td className="cash-books-table__cell" data-type="td">
        {data.type === '2' ? formatMoney(data?.amount) : '---'}
      </Td>
      <Td className="cash-books-table__cell" data-type="td">
        {data.payment_method_name || '---'}
      </Td>
      <Td className="cash-books-table__cell" data-type="td">
        <Text
          lineHeight={20}
          className='cash-books-table__link-hover'
          style={{
            marginBottom: 12,
            display: 'block',
            textTransform: 'capitalize'
          }}
        >
          {(!!data?.purchase_id || !!data?.order_id || !!data?.order_refund_code) ? (
            <Link
              to={CASHBOOKS_LINK_REFERENCE_DOCS(data)}
              target="_blank"
              style={{color: '#1A94FF', cursor: 'pointer'}}
            >
              {!!data?.order_refund_code ? data?.order_refund_code : data?.reference_code}
            </Link>
          ) : (data?.reference_code || '---')}
        </Text>
      </Td>
    </Tr>
  )
}
