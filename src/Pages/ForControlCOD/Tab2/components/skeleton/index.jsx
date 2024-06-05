import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import {RowMenuPopover} from '../Table/_rowMenuPopover'
import {Td} from '../../../../../layouts/tableLayout/_td'
import {Tr} from '../../../../../layouts/tableLayout/_tr'

export const OrderSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(i => (
        <Tr className="table_body" key={i}>
          <Td className="for-controlCOD-table__cell" align="center">
            <div style={{width: '100%'}}>
              <Skeleton width={'100%'} height={31} />
            </div>
          </Td>
          <Td className="for-controlCOD-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="for-controlCOD-table__cell" align="left">
            <div
              className="font-bold capitalize"
              style={{color: '#1A94FF', width: '100%'}}
            >
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="for-controlCOD-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="for-controlCOD-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="for-controlCOD-table__cell" align="center">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="for-controlCOD-table__cell" align="left">
            <div style={{ width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td
            className="for-controlCOD-table__cell"
            data-menu="true"
            data-type="td"
            align="right"
          >
            <Skeleton width={'100%'} height={51} />
          </Td>
        </Tr>
      ))}
    </>
  )
}
