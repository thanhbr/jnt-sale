import { memo } from 'react'
import { DetailSearch } from './Search'
import { StyledForControlCODFilterForm } from './_styled'

export const DetailFilter = memo(({ ...props }) => {
  return (
    <StyledForControlCODFilterForm {...props}>
      <div className="order-filter-form__group">
        <DetailSearch />
      </div>
    </StyledForControlCODFilterForm>
  )
})
