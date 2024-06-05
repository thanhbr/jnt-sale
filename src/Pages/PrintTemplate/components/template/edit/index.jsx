import React, {useContext, useEffect, useState} from 'react';
import { CKEditor as Editor } from 'ckeditor4-react';
import { Box, Modal as ModalUI } from '@mui/material'


import {SCRIPT} from "../../../interfaces/~script";
import {PrintTemplateContext} from "../../../provider/~context";
import {StyledPrintTemplateEdit, StyledPrintTemplatePreview} from "../../~styled";
import {Grid} from "@mui/material";
import {config} from "./config"
import {convertItemDefault} from "../../../utils/~convert";
import {Button} from "../../../../../common/button";
import usePrintTemplateFilter from "../../../hooks/usePrintTemplateFilter";
import Modal from "../../modal"
import {useTranslation} from "react-i18next";

const Index = () => {
  const {t} = useTranslation()
  const {pageState} = useContext(PrintTemplateContext)
  const {functions, modalConfirm, modalConfirmTemplate, modalConfirmTemplateChange} = usePrintTemplateFilter()
  const [openModal, setOpenModal] = useState(false)
  const [contentEditor, setContentEditor] = useState(pageState.content.template)
  const insideContent = !!!pageState.templateAfterChange ? contentEditor : pageState.templateAfterChange
  useEffect(() => {
    setContentEditor(pageState.content.template)
  }, [pageState.content.template])

  return (
    <>
      <Grid container className="print-template-filter__collapse-group">
          <Grid item xs={6} sm={6} md={6} lg={6} >
            <StyledPrintTemplateEdit>
              <div className={"print-template-edit__wrapper"}>
                <Grid container className={"print-template-edit__group-title"}>
                  <Grid item xs={4} sm={4} md={4} lg={4} >
                    <p className={"print-template-edit__title"}>{t(SCRIPT.TITLE)}</p>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8} >
                    <div className={"print-template-edit__group-button"}>
                      <button type={'button'}
                              className={"print-template-edit__btn-default-template"}
                              onClick={functions.openConfirmTemplate }
                      >{t(SCRIPT.DEFAULT_TEMPLATE)}</button>
                      <Button appearance={'secondary'}
                              type={'button'}
                              className={"print-template-edit__btn-keyword"}
                              onClick={() => setOpenModal(true)}
                      >{t(SCRIPT.SELECT_KEYWORD)}</Button>
                    </div>
                  </Grid>
                </Grid>
                <Editor
                  initData={contentEditor}
                  config={config}
                  readOnly={false}
                  type={"classic"}
                  onChange={functions.onCkeditorChange}
                  onSelectionChange={functions.onCkeditorSelectionChange}
                />
              </div>
            </StyledPrintTemplateEdit>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} >
            <StyledPrintTemplatePreview>
              <div className={"print-template-preview__wrapper"}>
                <Grid container className={"print-template-preview__group-title"}>
                  <Grid item xs={6} sm={6} md={6} lg={6} >
                    <p className={"print-template-preview__title"}>{t(SCRIPT.PREVIEW)}</p>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} >
                    <div className={"print-template-preview__group-button"}>
                      <Button appearance={'secondary'}
                              type={'button'}
                              className={"print-template-preview__btn-print"}
                              onClick={functions.handlePrint}
                      >{t(SCRIPT.GROUP_BUTTON.PRINT)}</Button>
                    </div>
                  </Grid>
                </Grid>
                <div id={'print-template-preview'}>
                  <div className={"print-template-preview"}
                       id={"print-template-content"}
                       // dangerouslySetInnerHTML={{__html: convertItemDefault(contentEditor)}}
                       dangerouslySetInnerHTML={{__html: convertItemDefault(`<div>${insideContent}</div>`)}}
                  />
                </div>
              </div>
            </StyledPrintTemplatePreview>
          </Grid>
        </Grid>
      {openModal ? <Modal  open={openModal} handleCloseModal={() => setOpenModal(false)}/> : ''}
      {modalConfirm ? (
          <ModalUI
            open={modalConfirm}
            onClose={functions.closeConfirm}
            className={'modal-print-template-confirm'}
          >
            <Box className={'modal-print-template-confirm__box'}>
              <div>
                <p className={'modal-print-template-confirm__title'}>{t(SCRIPT.TITLE_CONFIRM_QUIT)}</p>
                <p className={'modal-print-template-confirm__sub-title'}>{t(SCRIPT.CONFIRM_QUIT)}</p>
                <div className={'modal-print-template-confirm__group-btn'}>
                  <Button appearance={'ghost'}
                          className={'modal-print-template-confirm__dismiss'}
                          type={'button'}
                          onClick={functions.closeConfirm}
                  >{t(SCRIPT.GROUP_BUTTON.CANCEL)}
                  </Button>
                  <Button className={'modal-print-template-confirm__save'}
                          type={'button'}
                          onClick={functions.backView}
                  >{t(SCRIPT.GROUP_BUTTON.CONFIRM)}
                  </Button>
                </div>
              </div>
            </Box>
          </ModalUI>
      ) : ''}
      {modalConfirmTemplate ? (
        <ModalUI
          open={modalConfirmTemplate}
          onClose={functions.closeConfirmTemplate}
          className={'modal-print-template-confirm'}
        >
          <Box className={'modal-print-template-confirm__box'}>
            <div>
              <p className={'modal-print-template-confirm__title'}>{t(SCRIPT.TITLE_CONFIRM_UPOS)}</p>
              <p className={'modal-print-template-confirm__sub-title'}>{t(SCRIPT.CONFIRM_TEMPLATE)}</p>
              <div className={'modal-print-template-confirm__group-btn'}>
                <Button appearance={'ghost'}
                        className={'modal-print-template-confirm__dismiss'}
                        type={'button'}
                        onClick={functions.closeConfirmTemplate}
                >{t(SCRIPT.GROUP_BUTTON.CANCEL)}
                </Button>
                <Button className={'modal-print-template-confirm__save'}
                        type={'button'}
                        onClick={functions.selectedDefaultTemplate}
                >{t(SCRIPT.GROUP_BUTTON.CONFIRM)}
                </Button>
              </div>
            </div>
          </Box>
        </ModalUI>
      ) : ''}
      {modalConfirmTemplateChange ? (
        <ModalUI
          open={modalConfirmTemplateChange}
          onClose={functions.closeConfirmTemplateChange}
          className={'modal-print-template-confirm'}
        >
          <Box className={'modal-print-template-confirm__box'}>
            <div>
              <p className={'modal-print-template-confirm__title'}>{t(SCRIPT.TITLE_CONFIRM_QUIT)}</p>
              <p className={'modal-print-template-confirm__sub-title'}>{t(SCRIPT.CONFIRM_QUIT)}</p>
              <div className={'modal-print-template-confirm__group-btn'}>
                <Button appearance={'ghost'}
                        className={'modal-print-template-confirm__dismiss'}
                        type={'button'}
                        onClick={functions.closeConfirmTemplateChange}
                >{t(SCRIPT.GROUP_BUTTON.CANCEL)}
                </Button>
                <Button className={'modal-print-template-confirm__save'}
                        type={'button'}
                        onClick={functions.selectedTemplateChange}
                >{t(SCRIPT.GROUP_BUTTON.CONFIRM)}
                </Button>
              </div>
            </div>
          </Box>
        </ModalUI>
      ) : ''}
    </>
  );
};

export default Index;