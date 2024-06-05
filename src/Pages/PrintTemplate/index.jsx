import React from 'react';

import Filter from "./components/filter"
import {Breadcrumb} from "../../common/breadcrumb";
import {PRINT_TEMPLATE_BREADCRUMB} from "./interfaces/~contants";
import {SCRIPT} from "./interfaces/~script";
import {PrintTemplateProvider} from "./provider/index";
import Template from "./components/template"
import usePrintTemplate from "./hooks/usePrintTemplate";
import {StyledPrintTemplate} from "./components/~styled"
import {useTranslation} from "react-i18next";

const Index = () => {
  const {t} = useTranslation()
  const {provider} = usePrintTemplate()
  const {state, dispatch} = provider

  return (
    <PrintTemplateProvider value={{pageState: state, pageDispatch: dispatch}}>
      <StyledPrintTemplate>
        <Breadcrumb links={PRINT_TEMPLATE_BREADCRUMB} title={t(SCRIPT.BREADCRUMB.TITLE)} />
        <Filter/>
        <Template />
      </StyledPrintTemplate>
    </PrintTemplateProvider>
  );
};

export default Index;