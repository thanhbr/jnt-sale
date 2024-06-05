import {Button} from 'common/button'
import {Text} from 'common/text'
import {COD_ICONS} from '../../interfaces/_icons'
import styled from 'styled-components'
import {THEME_COLORS} from 'common/theme/_colors'
import {useState, useEffect, useRef} from 'react'
import {ORDER_COMPARING_ROW_EXTRA_TABS} from '../../interfaces/_constants'
import useCod from '../../hooks/useCod'
import useAlert from 'hook/useAlert'
import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useTranslation} from "react-i18next";

export const UpdateStatusFailedModal = ({dataFail,dataSuccess, onClose, ...props}) => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState(
    ORDER_COMPARING_ROW_EXTRA_TABS[1]?.value,
  )

  const {showAlert} = useAlert()
  const exportLink = useRef()
  const [exportComparingFailUrl, setComparingFailUrl] = useState('#')
  useEffect(() => {
    if (exportComparingFailUrl && exportComparingFailUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportComparingFailUrl])

  const [flagStatus, setFlagStatus] = useState(false)

  const exportcomparingFail = async dataFail => {

    if(flagStatus == true) {
      return false
    }
    setFlagStatus(true);

    let billcodes = []
    dataFail.forEach(item => {
      billcodes.push(item.billcode)
    })
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/delivery/export-cod-comparing-fail-xlsx`,
      {billcodes:billcodes},
    )
    if (response?.data?.success && response?.data?.data?.url) {
      showAlert({content: t("export_excel_success"), type: 'success'})
      if (response.data.data.url && response.data.data.url !== '#')
        setComparingFailUrl(response.data.data.url)
    } else {
      showAlert({content: t("export_excel_fail"), type: 'danger'})
    }
    setFlagStatus(false);
  }

  return (
    <StyledUpdateStatusFailedModal {...props} onClick={onClose}>
      <div
        className="cod-manager-table__update-status-failed-modal__container"
        style={activeTab === 'comparingSuccess' ? {height:452} : {}}
        onClick={e => e.stopPropagation()}
      >
        <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 24}}>
          {t("update_result_status_cod_checked")}
        </Text>
        {activeTab && (
        <div className="row-cod-comparing-extra__container">
          <div className="row-cod-comparing-extra__tabs">
            {ORDER_COMPARING_ROW_EXTRA_TABS.map(item => (
              <div
                key={item.id}
                className="row-cod-comparing-extra__tab"
                data-active={item.value === activeTab}
                onClick={() => setActiveTab(item.value)}
              >
                {item.name}
              </div>
            ))}
          </div>
          <div className="row-cod-comparing-extra__content" style={activeTab === 'comparingSuccess' ? {minHeight:280} : {minHeight:200}}>
            {activeTab === 'comparingSuccess' && (
              Array.isArray(dataSuccess) && dataSuccess.length > 0 ? (
                <div>
                  <div className="row-cod-comparing-extra__content_title" ><b>{t("have")} {dataSuccess.length} {t("order_")}</b> {t("105")}</div>
                  <div className="cod-manager-table__update-status-failed-modal__content common-scrollbar" style={activeTab === 'comparingSuccess' ? {height:196} : {}}>
                    
                    {dataSuccess.map(item => (
                      <div
                        key={item.id}
                        className="cod-manager-table__update-status-failed-modal__content-item"
                      >
                        {COD_ICONS.checksuccess}
                        <Text style={{display: 'block', flex: 1}}>
                          {t("order_id")}: <b style={{margin: '0 2px'}}>{item?.billcode || '---'}</b>
                          {item.message}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row-cod-comparing-extra__content_title" style={{textAlign:'center', width: '100%', paddingTop: '92px'}}>
                    <b>{t("no_order_update_status_success")}</b></div>
                </div>
              )
            )}
            {activeTab === 'comparingFail' && (
              Array.isArray(dataFail) && dataFail.length > 0 ? (
                <div>
                  <div className="row-cod-comparing-extra__content_title"><b>{t("have")} {dataFail.length} {t("order_")}</b> {t("update_fail")}</div>
                  <div className="cod-manager-table__update-status-failed-modal__content common-scrollbar">
                    
                    {dataFail.map(item => (
                      <div
                        key={item.file_row}
                        className="cod-manager-table__update-status-failed-modal__content-item"
                      >
                        {COD_ICONS.warning}
                        <Text style={{display: 'block', flex: 1}}>
                          {t("billcode")}: <b style={{margin: '0 2px'}}>{item?.billcode || '---'}</b>
                          {item.message}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="row-cod-comparing-extra__content_title" style={{textAlign:'center', width: '100%', paddingTop: '92px'}}>
                    <b>{t("no_order_update_status_fail")}</b></div>
                </div>
              )
            )}
          </div>
        </div>
      )}
        <div className="cod-manager-table__update-status-failed-modal__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110,marginRight: 8
            }}
            onClick={onClose}
          >
            {t("general_close")}
          </Button>
          {activeTab === 'comparingFail' && (
          <Button
            appearance={'secondary'}
            size="sm"
            style={{minWidth: 118}}
            icon={COD_ICONS.download}
            onClick={() => exportcomparingFail(dataFail)}
          >
            {t("general_export_excel")}
          </Button>)}
          <a ref={exportLink} href={exportComparingFailUrl} style={{display: 'none'}}></a>
        </div>
      </div>
    </StyledUpdateStatusFailedModal>
  )
}

const StyledUpdateStatusFailedModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  .row-cod-comparing-extra {
    &__container {
      overflow: hidden;
      border-radius: 0px 8px 8px 8px;
    }

    &__tabs {
      height: 36px;

      display: flex;
    }

    &__tab {
      margin-right: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 8px 8px 0px 0px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;

      transition: all 0.25s;

      cursor: pointer;

      &:first-child {
        border-radius: 0 8px 0px 0px;
        background: #fff;
      }

      &[data-active='true'] {
        background: #fff;
        border-bottom: 1.5px solid #1E9A98;
      }
    }

    &__content {
      padding: 24px 0px 24px 0px;
      background: #fff;
      border-radius: 0 8px 0 0;
    }
    &__content_title {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      width: 406px;
      height: 20px;
      color: #00081D;
      padding-bottom: 40px;
    }
  }

  .cod-manager-table__update-status-failed-modal {
    &__container {
      width: 600px;
      height: 452px;
      padding: 24px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__content {
      height: 192px;
      padding: 16px 10px;
      overflow: auto;
      background: #F6FAFE;
      border-radius: 6px;
    }

    &__content-item {
      margin-bottom: 16px;
      display: flex;
      &:last-child {
        margin-bottom: 0;
      }

      svg {
        width: 20px;
        height: 20px;
        margin-right: 8px;
      }
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }
  }
`
