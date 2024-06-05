import React, {useContext, useRef} from "react";
import {PageHeader} from "../../../../layouts/pageHeader";
import {
    EXPORT, IMPORT,
    PRODUCT_BREADCRUMB,
    PRODUCT_BREADCRUMB_TITLE,
    PRODUCT_PAGE_HEADER_ACTIONS
} from "../../interfaces/~constants";
import useProductFilterForm from "../../hooks/useProductFilterForm";
import {ProductContext} from "../../provider/~context";
import {Export} from "../Export";
import {ImportAddressSeparatorFileModal} from "../import";
import {useImportExpport} from "../../hooks/useImportExport";
import {productActions} from "../../provider/~action";
import {useTranslation} from "react-i18next";
const Header = () => {
    const {pageState,pageDispatch} = useContext(ProductContext)
    const {export_file,import_file} = pageState
  const {functions} = useProductFilterForm()
    const {export_data} = useImportExpport()

  const actions = [
    () => functions?.applyOrderOtherFilter(),
    ()=>functions?.handleImport(),
      ()=>{
          export_data.handleExportClick()
        functions?.handleExport()
      },
    null,
    null,
    null
  ]
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        actions={PRODUCT_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
          // props: {
          //   disabled: i === 1 && !canExport,
          // },
        }))}
        breadcrumbLinks={PRODUCT_BREADCRUMB}
        breadcrumbTitle={t(PRODUCT_BREADCRUMB_TITLE)}
      />
      {/*<a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>*/}

      {/*{!!exportModalData && <OrderExport data={exportModalData} />}*/}
        {export_file?.id === EXPORT.label && <Export  data={export_data.exportModalData}/> }
        {import_file?.id === IMPORT.label && <ImportAddressSeparatorFileModal
            open={import_file?.id === IMPORT.label}
            onClose={() => pageDispatch({type: productActions.IMPORT_FILE, payload: { id: '' }})}
        />}
    </>
  )
}

export default Header