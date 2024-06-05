import { sendRequestAuth } from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import { useContext, useState } from 'react'
import { facebookConversationActions } from '../provider/_actions'
import { FacebookLivestreamContext } from '../provider/_context'
import useFacebookFilterForm from "./useFacebookFilterForm"

const useOrderTHead = () => {
  const {showAlert} = useAlert()
  const {functions} = useFacebookFilterForm()

  const {pageState, pageDispatch} = useContext(FacebookLivestreamContext)
  const {filter, table} = pageState

  const [statusUpdateErrList, setStatusErrList] = useState([])
  const [
    shouldOpenUpdateStatusFailedModal,
    setShouldOpenUpdateStatusFailedModal,
  ] = useState(false)
  const [globalLoading, setGlobalLoading] = useState(false)

  const displayList = table.display.list
  const selectedList = table.selected.list

  // CHECKBOX
  const shouldActiveCheckbox = selectedList.length > 0

  const isActive =
    displayList.length <= 0
      ? false
      : selectedList.length < displayList.length
      ? false
      : !!!displayList.find(
          item => !!!selectedList.find(find => find?.id === item?.id),
        )

  const handleCheckboxChange = () => {
    let newSelectedList = []
    if (isActive)
      newSelectedList = selectedList.filter(
        item => !!!displayList.find(find => find?.id === item?.id),
      )
    else {
      let addingList = []
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.id === item?.id))
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList]
    }

    pageDispatch({
      type: facebookConversationActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: newSelectedList}},
    })
  }

  // SELECTED ACTION DROPDOWN
  const [shouldOpenSelectedActionMenu, setShouldOpenSelectedActionMenu] =
    useState(false)

  return {
    globalLoading: {value: globalLoading, set: setGlobalLoading},
    checkbox: {
      checked: shouldActiveCheckbox,
      onClick: handleCheckboxChange,
    },
    modal: {
      updateStatus: {
        data: statusUpdateErrList,
        open: !!(
          shouldOpenUpdateStatusFailedModal && statusUpdateErrList.length > 0
        ),
        onToggle: setShouldOpenUpdateStatusFailedModal,
      },
    },
    selected: {
      actionMenu: {
        open: shouldOpenSelectedActionMenu,
        onToggle: setShouldOpenSelectedActionMenu,
        // actions: [
        //   () => handleBulkOrderApply(1),
        //   () => handleBulkOrderApply(7),
        //   () => handleBulkOrderApply(15),
        // ],
      },
      list: selectedList,
    },
  }
}

export default useOrderTHead
