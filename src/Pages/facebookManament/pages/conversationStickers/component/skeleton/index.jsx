import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import './index.scss'
import { Tr } from '../../../../../../layouts/tableLayout/_tr'
import { Td } from '../../../../../../layouts/tableLayout/_td'

export const CommentSkeleton = ({ ...props }) => {
  const SkelentonRows = Array.from(Array(props.rows).keys())
  return (
    <>
      {SkelentonRows.map(
        (i) =>
          <Tr className='table_body' key={i}>
            <Td className="AutoResponses-table__cell" align="left">
                <Skeleton variant="rounded" width={18} height={24}/>
            </Td>
            <Td className="AutoResponses-table__cell" align="center">
                <Skeleton variant="text" height={24} width={'90%'}/>
            </Td>
            <Td className="AutoResponses-table__cell" align="center">
                <Skeleton variant="circular" height={24} width={24}/>
                <div style={{width: '80%', marginLeft: '8px'}}>
                  <Skeleton variant="text" height={24} width={'80%'}/>
                  <Skeleton variant="text" height={24} width={'80%'}/>
                </div>
            </Td>
            <Td className="AutoResponses-table__cell" align="center">
                <Skeleton variant="text" height={24} width={'80%'}/>
            </Td>
            <Td className="AutoResponses-table__cell" align="left">
              <Skeleton variant="rounded" height={30} width={10}/>
            </Td>
          </Tr>
      )}
    </>
  )
}