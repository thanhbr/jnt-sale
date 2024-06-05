import React from 'react';
import {PageHeader} from "../../../../layouts/pageHeader";
import {RECEIPT_BREADCRUMB, RECEIPT_BREADCRUMB_TITLE, RECEIPT_PAGE_HEADER_ACTIONS} from "../../interfaces/contant";
import useReceiptFilter from "../../hooks/useReceiptFilter";

const HeaderReceipt = () => {
  const {methods} = useReceiptFilter()
  const actions = [
    methods?.refreshTable,
    null
  ]
  return (
    <>
      <PageHeader
        actions={RECEIPT_PAGE_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
          // props: {
          //   disabled: i === 1 && !canExport,
          // },
        }))}
        breadcrumbLinks={RECEIPT_BREADCRUMB}
        breadcrumbTitle={RECEIPT_BREADCRUMB_TITLE}
      />
      {/*<a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>*/}

    </>
  )
}

export default HeaderReceipt;