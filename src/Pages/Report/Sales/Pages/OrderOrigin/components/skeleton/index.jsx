import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'

export const OrderSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(i => (
        <Tr className="table_body" key={i}>
          <Td className="employee-management-table__cell" align="center">
            <div style={{width: '100%'}}>
              <Skeleton width={'100%'} height={31} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="employee-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
        </Tr>
      ))}
    </>
  )
}
