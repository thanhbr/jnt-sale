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
            <Td className="comment-table__cell" align="left">
                <Skeleton variant="circular" width={32} height={32} style={{marginRight: '8px'}}/>
                <Skeleton variant="text" width={'80%'} height={24}/>
            </Td>
            <Td className="comment-table__cell" align="center">
                <Skeleton variant="text" height={24} width={'80%'}/>
            </Td>
            <Td className="comment-table__cell" align="center">
                <Skeleton variant="rounded" height={20} width={'46px'}/>
            </Td>
            <Td className="comment-table__cell" align="center">
                <Skeleton variant="rounded" height={20} width={'46px'}/>
            </Td>
            <Td className="comment-table__cell" align="left">
              <Skeleton variant="rounded" height={64} width={'98%'}/>
            </Td>
          </Tr>
      )}
    </>
  )
}