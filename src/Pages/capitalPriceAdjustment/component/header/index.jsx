import React from 'react';
import {
  PRICE_ADJUSTMENT_BREADCRUMB,
  PRICE_ADJUSTMENT_BREADCRUMB_TITLE,
  PRICE_ADJUSTMENT_HEADER_ACTIONS
} from "../../interfaces/_const";
import {PageHeader} from "../../../../layouts/pageHeader";
import useFilterCapitalAdjustment from "../../hooks/useFilterCapitalAdjustment";

const HeaderPriceAdjustment = () => {
  const {refreshData} = useFilterCapitalAdjustment()
  const actions = [
    () => refreshData.onClick(),
    null
  ]

  return (
    <>
      <PageHeader
        actions={PRICE_ADJUSTMENT_HEADER_ACTIONS.map((item, i) => ({

          ...item,
          onClick: actions[i],
          // props: {
          //   disabled: i === 1 && !canExport,
          // },
        }))}
        breadcrumbLinks={PRICE_ADJUSTMENT_BREADCRUMB}
        breadcrumbTitle={PRICE_ADJUSTMENT_BREADCRUMB_TITLE}
      />
    </>
  )
}

export default HeaderPriceAdjustment;