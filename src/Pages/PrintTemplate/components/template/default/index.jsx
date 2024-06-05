import React, {useContext} from 'react';
import {SCRIPT} from "../../../interfaces/~script";
import {StyledPrintTemplateContent} from "../../~styled";
import {PrintTemplateContext} from "../../../provider/~context";
import {convertItemDefault} from "../../../utils/~convert";
import {useTranslation} from "react-i18next";

const Index = () => {
  const {t} = useTranslation()
  const {pageState} = useContext(PrintTemplateContext)
  return (
    <StyledPrintTemplateContent>
      <div className={"print-template-content__wrapper"}>
        <p className={"print-template-content__title"}>{t(SCRIPT.TITLE)}</p>
        <div id={'print-template-content'}>
          <div className={"print-template-content"}
               dangerouslySetInnerHTML={{__html: convertItemDefault(pageState.content.template)}}
          />
        </div>
      </div>
    </StyledPrintTemplateContent>
  );
};

export default Index;