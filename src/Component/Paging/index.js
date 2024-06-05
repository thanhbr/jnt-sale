import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material'
import {PaginationItem} from '@mui/material'
import './style.scss'

export default function Paging({total,onChange}) {
  return (
    <Stack spacing={2} className="paging-style">
      <Pagination
        count={total}
        showFirstButton
        showLastButton
        onChange={onChange}
        shape="rounded"
        renderItem={item => {
          return (
            <PaginationItem
              components={{
                first: KeyboardDoubleArrowLeft,
                previous: KeyboardArrowLeft,
                next: KeyboardArrowRight,
                last: KeyboardDoubleArrowRight,
              }}
              {...item}
            />
          )
        }}
      />
      {/* <Pagination count={total} hidePrevButton hideNextButton /> */}
    </Stack>
  )
}
