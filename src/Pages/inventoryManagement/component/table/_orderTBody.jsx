import {Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Text} from 'common/text'
import config from 'config'
import useAlert from 'hook/useAlert'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useContext, useState} from 'react'
import {OrderEmpty} from '../empty'
import {CellCodeOrder} from './_cellCodeOrder'
import {RowMenuPopover} from './_rowMenuPopover'
import {RowOrderExtra} from './_rowOrderExtra'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useEffect} from 'react'
import {InventoryContext} from "../../provider/_context";
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";
import useInventoryRow from "../../hook/useInventoryRow";
import {CellStatusOrder} from "./_cellStatusOrder";
import {fDateTimeSuffix} from "../../../../util/formatTime";
import "./index.scss"
import {InventoryAction} from "../../provider/_action";
import {Tooltip} from "../../../../common/tooltipv2";
import useInventoryHead from "../../hook/useInventoryHead";
export const OrderTBody = () => {
  const {pageState} = useContext(InventoryContext)
  const {table} = pageState
  const displayList = table.display.list
  const displayLoading = table.display.loading
  const paginationAmount = table.pagination.amount
  const paginationTotalItems = table.pagination.totalItems
  return (
    <>
      {displayLoading ? (
        Array.from(Array(paginationAmount), (e, i) => (
          <OrderPlaceholder key={i} />
        ))
      ) : paginationTotalItems > 0 ? (
        displayList.map(item => <OrderTr key={item.id} data={item} />)
      ) : (
        <OrderEmpty />
      )}
    </>
  )
}

const OrderPlaceholder = ({...props}) => {
  return (
    <Tr {...props} className="inventory-table__row">
      {Array.from(Array(9), (e, i) => (
        <Td key={i} className="inventory-table__cell" data-type="td">
          <Skeleton
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </Td>
      ))}
    </Tr>
  )
}

const OrderTr = ({data, ...props}) => {
  const {showAlert} = useAlert()
  const {pageState,pageDispatch} = useContext(InventoryContext)
  const {functions} = useInventoryFilterForm()
  const orderRow = useInventoryRow(data)
  const {cell, detail, row} = orderRow
  const {codeOrder} = cell
  const navigate = useNavigate()
  const handleEditOrder = _ => navigate(`/warehouse/create/${data.id}`)
const {globalLoading} = useInventoryHead()
const handlePrint = async()=>{
    globalLoading.set(true)
    const res = await sendRequestAuth('post',
    `${config.API}/warehouse/inventory/print/${data.id}`
    )
  if(res.data?.success){
    // in

    let frame = document.createElement('iframe')
    frame.name = 'frame'
    frame.style.position = 'absolute'
    frame.style.top = '-1000000px'
    document.body.appendChild(frame)
    let content = res?.data?.data
    const frameDoc = frame.contentWindow
        ? frame.contentWindow
        : frame.contentDocument.document
            ? frame.contentDocument.document
            : frame.contentDocument
    frameDoc.document.open()
    frameDoc.document.write(content)
    frameDoc.document.close()
    window.frames.frame.focus()
    setTimeout(function () {
      globalLoading.set(false)
      window.frames.frame.print()
      document.body.removeChild(frame)

    }, 1500)

  }
}
  const handleActionApply = action => {
    switch (action?.label) {
      case 'edit':
        handleEditOrder()
        break
      case  'balance':
        pageDispatch({type:InventoryAction.OPEN_MODAL_CONFIRM,payload:{balance:{show:true},title:action?.label,id:action?.id}})
        break
      case  'cancel':
        pageDispatch({type:InventoryAction.OPEN_MODAL_CONFIRM,payload:{cancel:{show:true},title:action?.label,id:action?.id}})
        break
      case 'print':
        handlePrint()
        break
      default:
        break
    }
  }

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const querySearch = searchParams.get('search') || ''

    if (querySearch && pageState?.table?.display?.list?.length === 1)
      row.onToggleDetail()
  }, [])
  return (
    <>
      <Tr
        {...props}
        className="inventory-table__row"
        extra={
          <RowOrderExtra
            id={detail?.code}
            active={row.shouldOpenDetail}
            data={detail?.active}
            rowData={orderRow}
          />
        }
        data-active={row.shouldOpenDetail}
        onClick={row.onToggleDetail}
      >
        <Td className="inventory-table__cell" data-type="td">
          <CellCodeOrder
            id={data.code}
            time={codeOrder.dateTime}
          />
        </Td>
        <Td className="inventory-table__cell" data-type="td">
          <Tooltip className={'tooltip'} baseOn={'height'} title={data.warehouse_name}>
              <Text>{data.warehouse_name}</Text>
          </Tooltip>

        </Td>
        <Td className="inventory-table__cell" data-type="td">
          <Text>{data.total_after_adjustment}</Text>
        </Td>
        <Td className="inventory-table__cell" data-type="td">
          <CellStatusOrder  id={data.status}/>
        </Td>
        <Td className="inventory-table__cell" data-type="td">
          <Text>{data?.dt_balance !== null ? fDateTimeSuffix(data?.dt_balance) : '---'}</Text>
        </Td>
        <Td className="inventory-table__cell" data-type="td">
          <Tooltip className={'tooltip'} baseOn={'height'} title={data?.user_balance}>
            <Text>{data?.user_balance?data?.user_balance:'---'}</Text>
          </Tooltip>
        </Td>
        <Td className="inventory-table__cell" data-type="td">
          <Tooltip className={'tooltip_note'} baseOn={'height'} title={data?.note}>
            <Text>{data?.note}</Text>
          </Tooltip>
        </Td>
        <Td
          className="inventory-table__cell"
          data-menu="true"
          data-type="td"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="inventory-table__detail-toggle"
            data-active={row.shouldOpenDetail}
            onClick={row.onToggleDetail}
          >
            {ORDER_ICONS.up}
          </button>
          <RowMenuPopover
            id={data.id}
            dataOrder={data}
            onActionClick={handleActionApply}
            shippingStatus={data?.status}
          />
        </Td>
      </Tr>
      {globalLoading.value && (
          <div className="inventory-table__loading">
            <img src="/img/bike-loading.gif" />
          </div>
      )}
    </>
  )
}
