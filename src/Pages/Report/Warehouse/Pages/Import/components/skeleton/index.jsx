import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import {Td} from 'layouts/tableLayout/_td'
import {Tr} from 'layouts/tableLayout/_tr'

export const ImportSkeleton = ({...props}) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(i => (
        <Tr className="table_body import-warehouse-management-table__row" key={i}
            style={{
              borderLeft: '1px solid #e2eaf8',
              borderRight: '1px solid #e2eaf8',
              width: 1800
            }}
        >
          <Td className="import-warehouse-management-table__cell" align="center">
            <div style={{width: '100%'}}>
              <Skeleton width={'100%'} height={31} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="left">
            <div style={{width: '100%'}}>
              <Skeleton variant="text" width={'100%'} height={23} />
              <Skeleton variant="text" width={'100%'} height={23} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
          <Td className="import-warehouse-management-table__cell" align="right">
            <div className="!flex !items-center" style={{width: '100%'}}>
              <Skeleton variant="text" height={23} width={'100%'} />
            </div>
          </Td>
        </Tr>
      ))}
    </>
  )
}
