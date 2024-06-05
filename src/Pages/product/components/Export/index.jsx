import {CircularProgress} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import axios from 'axios'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {CustomerContext} from 'Pages/customer'
import {CUSTOMER_LIMIT_EXPORT} from 'Pages/customer/_constants'
import ConfirmModal from 'Pages/deliveryManagement/components/ConfirmModalDelivery'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {numberWithCommas} from 'Pages/refactorOrder/utils/string'
import {useRef} from 'react'
import {useContext} from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import {StyledExport} from './_styled'
import {PRODUCT_COLUMN_NAMES, PRODUCT_LIMIT_EXPORT} from "../../interfaces/~constants";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const Export = ({data, ...props}) => {
  const { t } = useTranslation()
    const buttonNumber = Math.ceil(data?.data?.total / PRODUCT_LIMIT_EXPORT)
    const isAutoDownload = data?.data?.total < PRODUCT_LIMIT_EXPORT
    const [exportStatusList, setExportStatusList] = useState(() =>
        Array.from(Array(buttonNumber), (e, i) => (isAutoDownload ? 2 : 0)),
    )
    const [cancelTokenList, setCancelTokentList] = useState(() =>
        Array.from(Array(buttonNumber), (e, i) => axios.CancelToken.source()),
    )
    const [confirm, setConfirm] = useState({})
    const [isClosing, setIsClosing] = useState(false)
    const {showAlert} = useAlert()

    const handleClosePopup = () => {
        setIsClosing(true)
        if (exportStatusList.includes(2))
            setConfirm({
                ...confirm,
                active: true,
                title: t(DISPLAY_NAME_MENU.GENERAL.STOP_EXPORTING_EXCEL),
                content: t(DISPLAY_NAME_MENU.GENERAL.SYSTEM_EXPORTING_EXCEL_YOU_WANT_STOP),
                btnCancel: t(DISPLAY_NAME_MENU.GENERAL.STOP_EXPORTING),
                btnAccept: t(DISPLAY_NAME_MENU.GENERAL.CONTINUE_EXPORT),
                acceptStyle: 'accept',
                handleConfirm: () => setIsClosing(false),
                handleCancel: () => {
                    setExportStatusList(3)
                    data?.onClose()
                    showAlert({
                        type: 'info',
                        content: t(DISPLAY_NAME_MENU.GENERAL.EXCEL_EXPORT_STOP),
                        duration: 3000,
                    })
                },
            })
        else data?.onClose()
    }

    return (
        <StyledExport {...props} style={{visibility: confirm.active ? 'hidden' : 'visible'}}>
            <ConfirmModal confirm={confirm} setConfirm={setConfirm}/>
            <div
                className="customer-export__container"
                onClick={e => e.stopPropagation()}
            >
                <div className="customer-export__header">
                    <span className="customer-export__banner">{ORDER_ICONS.xlsx}</span>
                    <Text as="h5" fontSize={18} fontWeight={700} lineHeight={22} style={{textTransform: 'lowercase'}}>
                        {numberWithCommas(data?.data?.total || 0)} {t(DISPLAY_NAME_MENU.PRODUCT)}
                    </Text>
                    <Text color="#7C88A6" lineHeight={18}>
                      {t(DISPLAY_NAME_MENU.GENERAL.NEED_EXPORT_EXCEL)}
                    </Text>
                </div>
                <div className="customer-export__body">
                    <div className="customer-export__list common-scrollbar">
                        {Array.from(Array(buttonNumber), (e, i) => (
                            <Item
                                key={i}
                                index={i}
                                exportData={data}
                                status={exportStatusList[i]}
                                cancelToken={cancelTokenList[i]}
                                isAutoDownload={isAutoDownload}
                                isOnly={buttonNumber <= 1}
                                isClosing={isClosing}
                                onClose={data?.onClose}
                                setExportStatus={setExportStatusList}
                                setCancelTokentList={setCancelTokentList}
                                handleClosePopup={handleClosePopup}
                            />
                        ))}
                    </div>
                </div>
                <div className="customer-export__footer">
                    <Button
                        appearance="ghost"
                        size="sm"
                        style={{minWidth: 110}}
                        onClick={handleClosePopup}
                    >
                      {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
                    </Button>
                </div>
                <div className="customer-export__bg">
                    <img src="/img/order/export-bg.png" alt="bg"/>
                </div>
            </div>
        </StyledExport>
    )
}

const Item = ({
                  index,
                  exportData,
                  isOnly,
                  onClose,
                  isAutoDownload,
                  status,
                  setExportStatus,
                  cancelToken,
                  isClosing,
                  setCancelTokentList,
                  handleClosePopup
              }) => {
    const { t } = useTranslation()
    const [url, setURL] = useState('')
    const container = useRef(null)
    const linkRef = useRef(null)
    const currCancelToken = useRef(cancelToken || null)

    const statusText =
        status === 1 ? (
            <Text color={THEME_SEMANTICS.delivered} fontSize={12} lineHeight={17}>
              {t(DISPLAY_NAME_MENU.GENERAL.EXPORTED_FILE)}
            </Text>
        ) : status === 2 ? (
            <Text color="#7C88A6" fontSize={12} lineHeight={17}>
              {t(DISPLAY_NAME_MENU.GENERAL.PROCESSING_DATA)}
            </Text>
        ) : (
            <Text color={THEME_SEMANTICS.failed} fontSize={12} lineHeight={17}>
              {t(DISPLAY_NAME_MENU.GENERAL.NOT_EXPORTED_FILE_YET)}
            </Text>
        )

    const handleExport = async () => {
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...exportData?.data?.query,
            per_page: PRODUCT_LIMIT_EXPORT,
            start: numberWithCommas(index * PRODUCT_LIMIT_EXPORT).replace(/,/g, ''),
        })) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/product/export${queryString}`,
            null,
            currCancelToken.current?.token,
        )

        if (response?.data?.success) {

            linkRef.current.href = response?.data?.data?.url
            linkRef.current.download = response?.data?.data?.url.substr(
                response?.data?.data?.url.lastIndexOf('/') + 1,
            )
            // linkRef.current.click()

            setURL(response?.data?.data?.url)
        }
    }

    useEffect(() => {
        if (!isClosing && url !== '' && status === 2) {
            linkRef.current.click()

            setExportStatus(prev => {
                prev[index] = 1
                return [...prev]
            })

            setURL('')
        }
    }, [isClosing, url, status])


    const handleCancel = () => setExportStatus(3)
    // const handleCancel = () => {
    //     setExportStatus(prev => {
    //         prev[index] = prevStatus
    //         return [...prev]
    //     })
    //     currCancelToken.current.cancel()
    // }

    useEffect(() => {
        if (isAutoDownload) {
            handleExport()
        }
    }, [isAutoDownload])

    return (
        <div
            ref={container}
            data-status={status}
            className="customer-export__item"

        >
            <a ref={linkRef} style={{display: 'none'}}></a>

            <div className="customer-export__info">
                <Text as="b" style={{display: 'block'}}  className="customer-export__info--text">
                    {t(DISPLAY_NAME_MENU.GENERAL.EXPORT_EXCEL_FROM)} {numberWithCommas(index * PRODUCT_LIMIT_EXPORT + 1)}{' '}
                    -{' '}
                    {numberWithCommas(
                        Math.min(
                            (index + 1) * PRODUCT_LIMIT_EXPORT,
                            Number(exportData?.data?.total || 0),
                        ),
                    )}
                </Text>
                {statusText}
            </div>
            <div
                className="customer-export__action"
                onClick={() => {
                    if ([0, 1].includes(status)) {
                        const newCancelToken = axios.CancelToken.source()
                        currCancelToken.current = newCancelToken
                        setCancelTokentList(prev => {
                            prev[index] = newCancelToken
                            return [...prev]
                        })
                        setExportStatus(prev => {
                            prev[index] = 2
                            return [...prev]
                        })
                        handleExport()
                    } else handleClosePopup()
                }}>
                {status === 1 && (
                    <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            cursor: 'pointer',
                        }}
                    >
                        <path
                            d="M13 1.375L4.75 9.625L1 5.875"
                            stroke="#1E9A98"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
                {status === 2 && (
                    <>
                        <CircularProgress
                            className="customer-export__loading"
                            size={28}
                            thickness={4}
                        />
                        <i className="customer-export__cancel">{ORDER_ICONS.xExcel}</i>
                    </>
                )}
                {![1, 2].includes(status) && (
                    <span className="customer-export__download">
            {ORDER_ICONS.export}
          </span>
                )}
            </div>
        </div>
    )
}
