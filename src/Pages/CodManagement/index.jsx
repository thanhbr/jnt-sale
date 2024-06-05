import {PageHeader} from './components/pageHeader/index'
import {TableLayout} from 'layouts/tableLayout'
import { useContext, useEffect, useRef, useState } from 'react'
import {CodFilterForm} from './components/codFilterForm'
import {CodTBody} from './components/codTable/_codTBody'
import {CodTHead} from './components/codTable/_codTHead'
import {
  COD_BREADCRUMB,
  COD_PAGE_HEADER_ACTIONS,
} from './interfaces/_constants'
import {CodProvider} from './provider'
import './components/codTable/index.scss'
import useCod from './hooks/useCod'
import {CodNotifications} from './components/codNotifications'
import {TagsStatus} from './components/tagsStatus'
import { CodPanels } from './components/codPanels/index.jsx'
import { COD_LIMIT_EXPORT } from './interfaces/_constants'
import useCodFilterForm from './hooks/useCodFilterForm'
import useAlert from '../../hook/useAlert'
import { sendRequestAuth } from '../../api/api'
import config from '../../config'
import { CodOrderExport } from './components/codOrderExport'
import { CodContext } from './provider/_context'
import { ImportCodComparingModal } from './components/import'
import useGlobalContext from 'containerContext/storeContext'
import { useTranslation } from "react-i18next";

export const CodManagement = () => {
  const [globalState, globalDispatch] = useGlobalContext() 
  const {fetch, pagination, provider} = useCod()
  const {state, dispatch} = provider
  const {filter, table} = state
  const [activeId, setActiveId] = useState(false)
  useEffect(() => {
    const dateTimeValue = filter?.dateTime?.activeValue?.value
    if (dateTimeValue) {
      fetch.origin(dateTimeValue)
      fetch.statusList(dateTimeValue)
    }
  }, [])
  useEffect(() => {
    if (activeId == false && window.screen.width < 1600) {
      globalDispatch({type: 'TOGGLE_SIDEBAR', payload: {toggle: true}})
      setActiveId(true)
    } 
  }, [globalState?.shouldMinimizeSidebar])
  
  return (
    <div  className='cod-mamanent-container' style={state.table.loading == false ?  {cursor: 'no-drop'} : {pointerEvents: 'auto'}}>
    <CodProvider value={{pageState: state, pageDispatch: dispatch}}>
      <Header/>
      <CodNotifications />
      <TagsStatus />
      <TableLayout
        header={
          <>
            <CodFilterForm />
            <CodPanels />
          </>
        }
        table={{
          tHead: <CodTHead />,
          tBody: <CodTBody />,
        }}
        pagination={{
          ...table.pagination,
          onAmountChange: pagination.onAmountChange,
          onPageChange: pagination.onPageChange,
        }}
      />
    </CodProvider>
    </div>
  ) 
}

const Header = () => {
  const {showAlert} = useAlert()
  const {pageState} = useContext(CodContext)
  const {queries,functions,modals} = useCodFilterForm()
  const [exportUrl, setExportUrl] = useState('#')
  const [exportModalData, setExportModalData] = useState(null)
  const exportLink = useRef()
  const { t } = useTranslation();
  const handleExportClick = async () => {
    const selectedList = pageState.table.selected.list
    const totalItems = pageState.table.pagination.totalItems
    if (totalItems <= 0) return showAlert({content: t("check_infor_export_excel"), type: 'info'})

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries({
      ...queries,
      keyword:
        selectedList.length > 0
          ? selectedList.map(item => item.id).join(',')
          : '',
      per_page: '',
      start: '',
    })) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    handleLargeExport(
      {
        ...queries,
        per_page: '',
        start: '',
      },
      {total: selectedList.length > 0 ? selectedList.length : totalItems},
    )
  }
  const handleLargeExport = (q, opt) =>
    setExportModalData({
      data: {
        query: q,
        total: opt?.total || pageState.panels.orderTotal,
      },
      onClose: () => setExportModalData(null),
  })

  
  const handleImportClick = async () => {
    modals.handleModalImport(true);
  }
  const actions = [functions.applyDeliveryOtherFilter,handleImportClick, handleExportClick, null, null]

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])
  return (
    <>
      
      <PageHeader
        actions={COD_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={COD_BREADCRUMB}
        breadcrumbTitle={t("cod_management")}
      />
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
      {!!exportModalData && <CodOrderExport data={exportModalData} />}
      {!!pageState.modals.import && <ImportCodComparingModal open={pageState.modals.import} onClose={() => modals.handleModalImport(false)}/>}
    </>
  )
}
