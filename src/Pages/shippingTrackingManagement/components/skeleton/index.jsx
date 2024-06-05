import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import { Td } from '../../../../layouts/tableLayout/_td'
import { Tr } from '../../../../layouts/tableLayout/_tr'

export const OrderSkeleton = ({ ...props }) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <Tr className='table_body' key={i}>
            <Td className="shippingTracking-management-table__cell" align="center">
            <Skeleton width={18} height={31}/>
            </Td>
            <Td className="shippingTracking-management-table__cell" align="left">
              <div className="">
                <Skeleton variant="text" width={195} height={23}/>
                <Skeleton variant="text" width={195} height={23}/>
              </div>
            </Td>
            <Td className="shippingTracking-management-table__cell" align="left">
              <div className="">
                <div><Skeleton variant="text" width={214} height={23}/></div>
              </div>
            </Td>
            <Td className="shippingTracking-management-table__cell" align="left">
              <div className="font-bold capitalize" style={{ color: '#1A94FF' }}>
                <Skeleton variant="text" width={144} height={23}/>
                <Skeleton variant="text" width={144} height={23}/>
              </div>
            </Td>
            <Td className="shippingTracking-management-table__cell" align="right">
              <div className="!flex !items-center">
                <Skeleton variant="text" height={23} width={284}/>
              </div>
            </Td>
            <Td className="shippingTracking-management-table__cell" align="center">
              <div className="!flex !items-center">
                <Skeleton variant="text" height={23} width={100}/>
              </div>
            </Td>
            <Td className="shippingTracking-management-table__cell" align="left">
              <div><Skeleton variant="text" height={23} width={412}/>
              <Skeleton variant="text" height={23} width={412}/></div>
            </Td>
            <Td
              className="shippingTracking-management-table__cell"
              data-menu="true"
              data-type="td"
              align="right"
            >
            <Skeleton width={30} height={30}/>
            </Td>
          </Tr>
      )}
    </>
  )
}