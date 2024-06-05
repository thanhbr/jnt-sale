import React, {useContext, useState} from 'react';
import {Box, Grid, Modal} from "@mui/material";
import {MODAL_CUSTOM} from "../../../../Component/Icons";
import "./style.scss"
import usePrintTemplate from "../../hooks/usePrintTemplate";
import {SCRIPT} from "../../interfaces/~script";
import {PrintTemplateContext} from "../../provider/~context";
import {Button} from '../../../../common/button'
import {printTemplateActions} from "../../provider/~reducer";
import {useTranslation} from "react-i18next";

const Index = ({...props}) => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(PrintTemplateContext)
  const {open, handleCloseModal} = props
  const [animation, setAnimation] = useState(false)
  const {
    functionsGlobal,
  } = usePrintTemplate()
  const listKeywords = pageState?.listKeyword?.list

  return (
    <Modal open={open} onClose={() => {
      setAnimation(true)
      setTimeout(() => {
        setAnimation(false)
        handleCloseModal()
      }, 300)
    }} className={'modal-upos-custom'} >
      <Box className={`modal-upos-custom__box ${animation && 'modal_custom'}`}>
        <div className={'modal-upos-custom__dismiss'} onClick={() => setTimeout(() => {
          setAnimation(true)
          setTimeout(() => {
            setAnimation(false)
            handleCloseModal()
          }, 300)
        })}>
          {MODAL_CUSTOM.dismiss}
        </div>
        <div className={'modal-upos-custom__wrapper'}>
          <div className={'modal-upos-custom__header'}>
            <p className={'modal-upos-custom__title'}>{t(SCRIPT.MODAL.TITLE)}</p>
            <p className={'modal-upos-custom__sub-title'}>{t(SCRIPT.MODAL.SUB_TITLE)}</p>
          </div>
          <div className={'modal-upos-custom__content scroll-custom'}>
            <div>
              {listKeywords?.map(item => {
                return Object.keys(item).map(key =>
                  <div key={key}>
                    {functionsGlobal.categoryTitle(pageState?.filter?.type?.activeValue, key).length > 0 ?
                      (<p className={'modal-upos-custom__content-title'}>{t(functionsGlobal.categoryTitle(pageState?.filter?.type?.activeValue, key))}</p>) : ''}
                    <Grid container className={'modal-upos-custom__content-keyword'}>
                      <Grid item xs={4} sm={4} md={4} lg={4} >
                        <div className={'modal-upos-custom__content-keyword-group'}>
                          <span className={'modal-upos-custom__content-keyword-item'}>{key}</span>
                        </div>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} >
                        <span className={'modal-upos-custom__content-keyword-sub-item'}>: {t(key)}</span>
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} lg={2} >
                        <Button appearance={'secondary'} type={'button'}
                                className={'modal-upos-custom__content-keyword-btn'}
                                onClick={() => {
                                  // eslint-disable-next-line no-undef
                                  CKEDITOR?.instances?.editor2?.insertHtml(key) || CKEDITOR?.instances?.editor3?.insertHtml(key) || CKEDITOR?.instances?.editor4?.insertHtml(key) || CKEDITOR?.instances?.editor5?.insertHtml(key) || CKEDITOR?.instances?.editor6?.insertHtml(key) || CKEDITOR?.instances?.editor7?.insertHtml(key)
                                  // eslint-disable-next-line no-undef
                                  const data = CKEDITOR?.instances?.editor2?.getData() || CKEDITOR?.instances?.editor3?.getData() || CKEDITOR?.instances?.editor4?.getData() || CKEDITOR?.instances?.editor5?.getData() || CKEDITOR?.instances?.editor6?.getData() || CKEDITOR?.instances?.editor7?.getData()

                                  pageDispatch({type: printTemplateActions.TEMPLATE_AFTER_CHANGE, payload: data})
                                  handleCloseModal()
                                }}
                        >{t(SCRIPT.MODAL.CHOOSE)}</Button>
                      </Grid>
                    </Grid>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
};

export default Index;