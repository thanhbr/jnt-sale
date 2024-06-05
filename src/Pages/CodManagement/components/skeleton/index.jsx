import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import { RowMenuPopover } from '../codTable/_rowMenuPopover'
import { Td } from '../../../../layouts/tableLayout/_td'
import { Tr } from '../../../../layouts/tableLayout/_tr'

export const OrderSkeleton = ({ ...props }) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <Tr className='table_body' key={i}>
            <Td className="cod-management-table__cell" align="center">
            <Skeleton width={'100%'}  height={31}/>
            </Td>
            <Td className="cod-management-table__cell" align="left">
              <div className="" style={{width: '100%'}}>
                <Skeleton variant="text" width={'100%'}  height={23}/>
                <Skeleton variant="text" width={'100%'}  height={23}/>
              </div>
            </Td>
            <Td className="cod-management-table__cell" align="left">
              <div className="" style={{width: '100%'}}>
                <div><Skeleton variant="text" width={'100%'}  height={23}/></div>
              </div>
            </Td>
            <Td className="cod-management-table__cell" align="left">
              <div className="font-bold capitalize" style={{ color: '#1A94FF' ,width: '100%'}}>
                <Skeleton variant="text" width={'100%'}  height={23}/>
                <Skeleton variant="text" width={'100%'}  height={23}/>
              </div>
            </Td>
            <Td className="cod-management-table__cell" align="right">
              <div className="!flex !items-center" style={{width: '100%'}}>
                <Skeleton variant="text" height={23} width={'100%'} />
              </div>
            </Td>
            <Td className="cod-management-table__cell" align="right">
              <div className="!flex !items-center" style={{width: '100%'}}>
                <Skeleton variant="text" height={23} width={'100%'} />
              </div>
            </Td>
            <Td className="cod-management-table__cell" align="center">
              <div className="!flex !items-center" style={{width: '100%'}}>
                <Skeleton variant="text" height={23} width={'100%'} />
              </div>
            </Td>
            <Td className="cod-management-table__cell" align="left">
              <div className="!flex !items-center" style={{width: '100%'}}>
                <Skeleton variant="text" height={23} width={'100%'} />
              </div>
            </Td>
            <Td className="cod-management-table__cell" align="left">
              <div style={{width: '100%'}}><Skeleton variant="text" height={23} width={'100%'} /></div>
            </Td>
          </Tr>
      )}
    </>
  )
}