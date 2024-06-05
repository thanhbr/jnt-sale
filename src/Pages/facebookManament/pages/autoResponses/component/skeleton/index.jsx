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
            <Td className="auto-response-table__cell" align="left">
                <Skeleton variant="text" width={'70%'} height={24}/>
            </Td>
            <Td className="auto-response-table__cell" align="center">
                <Skeleton variant="circular" height={32} width={32} style={{marginRight: '12px'}}/>
                <Skeleton variant="text" height={24} width={'60%'}/>
            </Td>
            <Td className="auto-response-table__cell" align="center">
                <Skeleton variant="text" height={24} width={'70%'}/>
            </Td>
            <Td className="auto-response-table__cell" align="center">
                <Skeleton variant="text" height={24} width={'70%'}/>
            </Td>
            <Td className="auto-response-table__cell" align="left">
              <Skeleton variant="text" height={64} width={'10%'}/>
            </Td>
          </Tr>
      )}
    </>
  )
}