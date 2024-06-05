import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import { Tr } from '../../../../../layouts/tableLayout/_tr'
import { Td } from '../../../../../layouts/tableLayout/_td'

export const ShippingPartnerSkeleton = ({ ...props }) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <Tr className='table_body' key={i}>
            <Td className="shipping-management-table__cell">
              <Skeleton variant="text" width={20} height={23}/>
            </Td>
            <Td className="shipping-management-table__cell">
              <Skeleton variant="text" width={50} height={44}/>
            </Td>
            <Td className="shipping-management-table__cell" style={{width: '30%'}}>
              <div className="">
                <Skeleton variant="text" width={143} height={23}/>
                <Skeleton variant="text" width={143} height={23}/>
              </div>
            </Td>
            <Td className="shipping-management-table__cell" style={{width: '30%'}}>
              <div className="">
                <Skeleton variant="text" width={143} height={23}/>
                <Skeleton variant="text" width={143} height={23}/>
              </div>
            </Td>
            <Td className="shipping-management-table__cell" style={{width: '30%'}}>
              <div className="">
                <div><Skeleton variant="text" width={125} height={23}/></div>
              </div>
            </Td>
            <Td className="shipping-management-table__cell" style={{width: '5%'}}>
              <div className="">
                <div><Skeleton variant="text" width={20} height={23}/></div>
              </div>
            </Td>
          </Tr>
      )}
    </>
  )
}