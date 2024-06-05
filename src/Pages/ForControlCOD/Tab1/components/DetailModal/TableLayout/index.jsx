import { useRef } from 'react'
import {StyledTableLayout} from './_styled'

export const TableLayout = ({
  header,
  table,
  pagination,
  disabled,
  ...props
}) => {
  const containerRef = useRef()
  const hasScroll = containerRef.current?.scrollWidth > containerRef.current?.clientWidth + 9

  return (
    <StyledTableLayout {...props}>
      {header && <div className="table-layout__header detail">{header}</div>}
      <div className="table-layout__table" data-has-scroll={hasScroll}>
        <div ref={containerRef} className="table-layout__table-container">
          {table?.tHead && (
            <div className="table-layout__table-t-head">{table.tHead}</div>
          )}
          {table?.tBody && (
            <div className="table-layout__table-t-body">{table.tBody}</div>
          )}
          {table?.tFooter && (
            <div className="table-layout__table-t-footer">{table.tFooter}</div>
          )}
        </div>
      </div>
    </StyledTableLayout>
  )
}
