import { Th } from 'layouts/tableLayout/_th'
import { Tr } from 'layouts/tableLayout/_tr'
import { useContext, useState } from 'react'
import useOrderTHead from "../../hooks/useOrderTHead"
import { ORDER_TABLE_THEAD_SELECTED_ACTIONS } from '../../interface/_const'
import { FacebookLivestreamContext } from "../../provider/_context"
import "./index.scss"
import { ConfirmDeleteModal } from './_confirmDeleteModal'
export const THead = ({ ...props }) => {
  const { pageState } = useContext(FacebookLivestreamContext)

  const { globalLoading, checkbox, selected } = useOrderTHead()

  const [confirmDeleteModalData, setConfirmDeleteModalData] = useState(false)
  const [canDelete, setCanDelete] = useState(true)
  const [submit, setSubmit] = useState(() => { })

  const handeSubmitDelete = () => {
    setCanDelete(false)
    setConfirmDeleteModalData(null)
    if (!canDelete) return
    const response = submit()
    response.then(() => setCanDelete(true))
  }

  return (
    <>
      <Tr {...props} type="tHead" className={'livestream-table-facebook__header'}>
        <Th className="livestream-table-facebook__cell">Bài viết</Th>
        <Th className="livestream-table-facebook__cell">Trang phát livestream</Th>
        <Th className="livestream-table-facebook__cell">Thống kê</Th>
        <Th className="livestream-table-facebook__cell">Trạng thái</Th>
      </Tr>
      {!!confirmDeleteModalData && (
        <ConfirmDeleteModal
          content={confirmDeleteModalData?.description}
          isLoading={!canDelete}
          title={confirmDeleteModalData?.title}
          onClose={() => setConfirmDeleteModalData(null)}
          onSubmit={handeSubmitDelete}
        />
      )}
      {globalLoading.value && (
        <div className="livestream-table-facebook__loading">
          <img src="/img/loading.gif" />
        </div>
      )}
    </>
  )
}
