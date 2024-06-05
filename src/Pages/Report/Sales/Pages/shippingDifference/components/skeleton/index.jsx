import Skeleton from '@mui/material/Skeleton'
import React, { useContext } from 'react'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'
import { ShippingDifferenceContext } from '../../provider/_context'

export const OrderSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())

  const { pageState } = useContext(ShippingDifferenceContext)
  const viewType = pageState.view
  return (
    <>
      {SkelentonRows.map(i =>
        viewType.value == 1
          ?
          (
            <Tr className="table_body" key={i}>
              <Td className="shipping-fee-management-table__cell" align="center">
                <div style={{ width: '100%' }}>
                  <Skeleton width={'100%'} height={31}/>
                </div>
              </Td>
              <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" align="left">
                <div style={{ width: '100%' }}>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                </div>
              </Td>
              <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" align="left">
                <div style={{ width: '100%' }}>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                </div>
              </Td>
              <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" align="left">
                <div style={{ width: '100%' }}>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                </div>
              </Td>
              <Td className="shipping-fee-management-table__cell shipping-fee-management-table__overview-cell" align="left">
                <div style={{ width: '100%' }}>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                  <Skeleton variant="text" width={'100%'} height={23}/>
                </div>
              </Td>
            </Tr>
          )
          :
          <Tr className="table_body" key={i}>
            <Td className="shipping-fee-management-table__cell" align="center">
              <div style={{ width: '100%' }}>
                <Skeleton width={'100%'} height={31}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
            <Td className="shipping-fee-management-table__cell" align="left">
              <div style={{ width: '100%' }}>
                <Skeleton variant="text" width={'100%'} height={23}/>
                <Skeleton variant="text" width={'100%'} height={23}/>
              </div>
            </Td>
          </Tr>
      )}
    </>
  )
}
