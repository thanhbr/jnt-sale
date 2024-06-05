import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import {RowMenuPopover} from '../partSignTable/_rowMenuPopover'
import {Td} from '../../../../layouts/tableLayout/_td'
import {Tr} from '../../../../layouts/tableLayout/_tr'

export const OrderSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(i => (
        <Tr className="table_body" key={i}>
          <Td className="partSign-management-table__cell" align="left">
            <div style={{ width: '100%'}}>
            <Skeleton variant="text" height={23} width="100%" />
            <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="partSign-management-table__cell" align="left">
            <Skeleton variant="text" width={'100%'} height={23} />
          </Td>
          <Td className="partSign-management-table__cell" align="left">
            <div style={{ width: '100%'}}>
            <Skeleton variant="text" height={23} width={'100%'} />
            <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="partSign-management-table__cell" align="right">
            <Skeleton variant="text" height={23} width={'100%'} />
          </Td>
          <Td className="partSign-management-table__cell" align="right">
            <Skeleton variant="text" height={23} width={'100%'} />
          </Td>
          <Td className="partSign-management-table__cell" align="left">
            <div style={{ width: '100%'}}>
            <Skeleton variant="text" height={23} width={'100%'} />
            <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
        </Tr>
      ))}
    </>
  )
}
