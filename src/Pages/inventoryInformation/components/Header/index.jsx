import React, {useEffect, useRef, useState} from 'react';
import {PageHeader} from "../../../../layouts/pageHeader";
import {INVENTORY_INFORMATION_BREADCRUMB, INVENTORY_INFORMATION_HEADER_ACTIONS} from "../../interfaces/~contants";
import useFilterInventoryInformation from "../../hooks/useFilterInventoryInformation";
import ExportExcel from "../modal/exportExcel";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const HeaderInventoryInfo = () => {
  const {t} = useTranslation()
  const { functions, data } = useFilterInventoryInformation()
  const actions = [functions.refresh, functions.exportExcel]
  const exportLink = useRef()
  const exportUrl = data?.modals?.export?.exportUrl
  const exportModalData = data?.modals?.export?.exportModalData


  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])

  return (
    <div className={"inventory-info-header"}>
      <PageHeader
        actions={INVENTORY_INFORMATION_HEADER_ACTIONS.map((item, i) => ({
          ...item,
          onClick: actions[i],
        }))}
        breadcrumbLinks={INVENTORY_INFORMATION_BREADCRUMB}
        breadcrumbTitle={t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.HEADER)}
      />
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}>Link Export</a>
      <ExportExcel dataExport={exportModalData}/>
    </div>
  );
};

export default HeaderInventoryInfo