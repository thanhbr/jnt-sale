import { Pagination } from 'common/pagination'
import { StickyFooter } from 'common/stickyFooter'
import { useEffect, useRef } from 'react'
import useDraggableScroll from 'use-draggable-scroll'
import { StyledTableLayout } from './_styled'

export const TableLayout = ({ header, table, pagination, disabled, ...props }) => {
  const scrollBar = useRef(null)
  const tableContainer = useRef(null)

  const { onMouseDown } = useDraggableScroll(tableContainer)

  const shouldRenderPagination = !!(pagination?.total && pagination.total > 0)
  const shouldRenderTable = !!(!!table?.tHead || !!table?.tbody)

  const handleScrollBarScroll = () =>
    (tableContainer.current.scrollLeft = scrollBar.current.scrollLeft)

  const handleTableContainerScroll = () =>
    (scrollBar.current.scrollLeft = tableContainer.current.scrollLeft)

  useEffect(() => {
    const wrapper = document.querySelector('#content-wrap')
    if (!!!wrapper) return

    wrapper.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pagination?.active, pagination?.amount])
  return (
    <StyledTableLayout
      {...props}
      data-exist-pagination={shouldRenderPagination}
      data-exist-table={shouldRenderTable}
    >
      {header && <div className="table-layout__header">{header}</div>}
      {shouldRenderTable && (
        <div className="table-layout__table">
          <div
            ref={tableContainer}
            className="table-layout__table-container"
            data-scrollable={!!table?.scrollable}
            onMouseDown={e => table?.scrollable && onMouseDown(e)}
            onScroll={handleTableContainerScroll}
          >
            {table?.tHead && (
              <div className="table-layout__table-t-head">{table.tHead}</div>
            )}
            {table?.tBody && (
              <div className="table-layout__table-t-body">{table.tBody}</div>
            )}
          </div>
          {table?.scrollable && (
            <div
              ref={scrollBar}
              className="table-layout__custom-scrollbar common-scrollbar"
              onScroll={handleScrollBarScroll}
              style={props?.footerStyle}
            >
              {props?.footer && <div className="table-layout__footer" >{props?.footer}</div>}
              <div className="table-layout__table-t-head">{!!props?.footer ? '' : table.tHead}</div>
            </div>
          )}
        </div>
      )}
      {shouldRenderPagination && (
        <StickyFooter>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Pagination
              active={pagination?.active || 0}
              amount={pagination?.amount || 0}
              total={pagination.total}
              totalItems={pagination?.totalItems || 0}
              onAmountChange={pagination?.onAmountChange}
              onPageChange={pagination?.onPageChange}
              disabled={!!pagination?.loading}
            />
          </div>
        </StickyFooter>
      )}
    </StyledTableLayout>
  )
}
