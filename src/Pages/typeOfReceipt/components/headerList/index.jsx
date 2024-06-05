import React from 'react';
import {PageHeader} from "../../../../layouts/pageHeader";
import {TYPE_RECEIPT_BREADCRUMB,
        TYPE_RECEIPT_BREADCRUMB_TITLE,
        TYPE_RECEIPT_HEADER_ACTIONS
} from "../../interfaces/_contants";
import useCreateTypeOrReceipt from "../../hooks/useCreateTypeOrReceipt";
import useTBoyTypeOfReceipt from "../../hooks/useTBoyTypeOfReceipt";

const HeaderTypeReceipt = () => {
  const {method} = useCreateTypeOrReceipt()
  const {functions} = useTBoyTypeOfReceipt()
  const actions = [
    () => functions?.refreshTable(),
    () => method?.handleToggleModal()
  ]

  return (
    <>
      <PageHeader
        actions={TYPE_RECEIPT_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
          // props: {
          //   disabled: i === 1 && !canExport,
          // },
        }))}
        breadcrumbLinks={TYPE_RECEIPT_BREADCRUMB}
        breadcrumbTitle={TYPE_RECEIPT_BREADCRUMB_TITLE}
      />
    </>
  )
}

export default HeaderTypeReceipt;