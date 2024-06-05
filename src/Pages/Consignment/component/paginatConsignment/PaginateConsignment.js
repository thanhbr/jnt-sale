import { Pagination } from 'common/pagination'
import { StickyFooter } from 'common/stickyFooter'
import { InitialState } from 'Pages/Consignment/store/initState';
import Reducer from 'Pages/Consignment/store/reducer';
import React, { useReducer } from 'react'
import "./PaginateConsignment.scss"
export default function PaginateConsignment({ handleAmountChange, onChangePage, start, total }) {
  const [state, dispatch] = useReducer(Reducer, InitialState);
  return (
    <StickyFooter>
      <div className='consignment__paginate'>
        <Pagination
          active={start != 0 ? Math.floor(start / state.meta?.per_page) : 0}
          amount={state.meta?.per_page || 10}
          total={Math.ceil(total / state.meta?.per_page)}
          totalItems={total}
          onAmountChange={handleAmountChange}
          onPageChange={onChangePage}
        />
      </div>
    </StickyFooter>
  )
}
