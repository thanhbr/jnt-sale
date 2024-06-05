import {CircularProgress, Modal} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {useContext, useEffect, useRef, useState} from 'react'
import readXlsxFile from 'read-excel-file'
import sampleFile from "./files/product_template.xlsx"
import {StyledImportAddressSeparatorFileModal} from './_styled'
import {
  CUSTOMER_START_ROW_NUMBER,
} from 'Pages/customer/_constants'
import {ProductContext} from "../../provider/~context";
import {useImportExpport} from "../../hooks/useImportExport";
import {PRODUCT_EXPORT_COLUMN_NAMES} from "../../interfaces/~constants";
import {ProductWarehouse} from "./_wareHouse";
import {productActions} from "../../provider/~action";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

export const ImportAddressSeparatorFileModal = ({open, onClose, ...props}) => {
  const { t } = useTranslation()
  const {pageState,pageDispatch}=useContext(ProductContext)
const {fetchData,filter} = useImportExpport()
  const {showAlert} = useAlert()
  const [canSeparate, setCanSeparate] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shouldShowProgress, setShouldShowProgress] = useState(false)

  const [fileName, setFileName] = useState('')
  const [progressValue, setProgressValue] = useState(0)
  const [rowsGroup, setRowsGroup] = useState([])
  const [submitData, setSubmitData] = useState(null)
  const [validate, setValidate] = useState(null)

  const inputFile = useRef()

  const handleClose = () => {
    if (isSubmitting) return

    handleInputReset()
    onClose()
  }

  const handleInputFileChange = async e => {
    const file = e.target.files[0]
    if (!file) return

    setShouldShowProgress(true)
    setFileName(file.name)
    const data = await readXlsxFile(file)
    const size = file?.size ? file.size : 0
    let formatSize = ''
    if (size < 1024) formatSize = `${Math.ceil(size)} Bytes`
    else if (size < 1048576) formatSize = `${Math.ceil(size / 1024)} KB`
    else formatSize = `${Math.ceil(size / 1048576)} GB`

    if (Array.isArray(data)) {

      if (
        data.length < CUSTOMER_START_ROW_NUMBER ||
        JSON.stringify(data[0]).toLowerCase() !==
          JSON.stringify(PRODUCT_EXPORT_COLUMN_NAMES).toLowerCase() // Không thay đổi thứ tự các cột trong file mẫu.
        // data.length > 1000 + CUSTOMER_START_ROW_NUMBER // Chỉ hỗ trợ tối đa 1.000 đơn trong 1 file. Trường hợp trên 1.000 đơn hệ thống sẽ tự động loại bỏ những đơn thừa.
      ) {
        warningWrongValidation(formatSize)
        return
      }

      if (validate) setValidate(null)

      const sliceData = data.slice(1)
      const collectedData = {
        file_name: file?.name,
        warehouse_id:'',
        details: sliceData.map((item, i) => ({
          file_row: 1 + i,
          product_name: item[0] || '',
          product_name_version: item[1] || '',
          sku: item[2] || '',
          barcode: item[3] || '',
          note: item[4] || '',
          category_code: item[5] || '',
          unit_name: item[6] || '',
          weight: item[7] || '',
          attr_1: item[8] || '',
          attr_value_1: item[9] || '',
          attr_2: item[10] || '',
          attr_value_2:item[11] || '',
          attr_3: item[12] || '',
          attr_value_3: item[13] || "",
          price: item[14] || 0,
          wholesale_price: item[15] || 0,
          supplier_price:  item[16] || 0,
          cost_price: item[17] || 0,
          warehouse_quantity:  item[18] || 0,
        })),
      }
      // split to chunks
      const rawData = [...sliceData]

      let result = []
      for (let i = 50; i > 0; i--) {
        result.push(rawData.splice(0, Math.ceil(rawData.length / i)))
      }
      //
      setSubmitData(collectedData)
      setRowsGroup(result)
      setCanSeparate(true)
    } else warningWrongValidation(formatSize)
  }

  const handleInputReset = () => {
    if (inputFile?.current) inputFile.current.value = null

    setCanSeparate(false)
    setCanSubmit(false)
    setIsSubmitting(false)
    setShouldShowProgress(false)

    setFileName('')
    setProgressValue(0)
    setRowsGroup([])
    setSubmitData(null)
    setValidate(null)
  }

  const handleSeparate = () => {
    rowsGroup.forEach((rows, i) => {
      // rows.forEach(row => {
      //   const splitString = row[ADDRESS_COLUMN_NUMBER - 1]
      //   const splitResult = splitString ? splitAddress(splitString) : ''
      //   result.push(splitResult)
      // })

      const currentProgress = ((i + 1) * 100) / rowsGroup.length
      setProgressValue(currentProgress)
    })

    const currentSubmitData = submitData
    const submitDetails = currentSubmitData?.details

    if (Array.isArray(submitDetails)) {
      const newSubmitDetails = submitDetails.map((item, i) => ({
        ...item,
        // province: result[i]?.province || '',
        // district: result[i]?.district || '',
        // ward: result[i]?.town || '',
      }))

      currentSubmitData.details = newSubmitDetails
      setSubmitData(currentSubmitData)
    }

    setTimeout(() => setCanSubmit(true), 500)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const query = {
      ...submitData,
      warehouse_id:filter.warehouse?.value?.value || '',
    }
    const res = await sendRequestAuth(
      'post',
      `${config.API}/product/import`,
      JSON.stringify(query),
    )

    if (res?.data?.success) {
      showAlert({
        content: res?.data?.message,
        type: 'success',
      })
      pageDispatch({
        type: productActions.NOTIFICATIONS_LIST_UPDATE,
        payload: {
          notifications: {
            list: [],
            total:0,
          },
        },
      })
    } else {

      showAlert({
        content: res?.data?.errors?.message,
        type: 'danger',
      })

      pageDispatch({
        type: productActions.NOTIFICATIONS_LIST_UPDATE,
        payload: {
          notifications: {
            list: res.data?.errors?.details,
            total: res.data?.meta?.total
          },
        },
      })
    }
    fetchData()
    //
    pageDispatch({type: productActions.IMPORT_FILE, payload: null})
    //
    handleInputReset()
  }

  const handleUploadBtnClick = () =>
    inputFile?.current && inputFile.current.click()

  const warningWrongValidation = size => {
    if (inputFile?.current) inputFile.current.value = null
    setValidate({
      content: t(DISPLAY_NAME_MENU.GENERAL.FILE_IMPORT_NOT_CORRECT),
      size,
    })

    setShouldShowProgress(false)
  }

  const tmpLink = useRef()

  const handleDownloadSampleFile = () =>
    tmpLink?.current && tmpLink.current.click()

  useEffect(() => {
    if (canSeparate) handleSeparate()
  }, [canSeparate])

  return (
    <Modal {...props} open={open} onClose={handleClose}>
      <StyledImportAddressSeparatorFileModal>
        {!isSubmitting ? (
          <>
            <div className="import-address-separator-file__header">
              <Text
                as="h2"
                fontSize={20}
                lineHeight={28}
                style={{marginBottom: 8}}
              >
                {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.IMPORT_PRODUCT)}
              </Text>
            </div>
            <div className="import-address-separator-file__body">
              <div className="import-address-separator-file__upload">
                {ADDRESS_ICONS.uploadBanner}
                {shouldShowProgress ? (
                  <div className="import-address-separator-file__progress">
                    <Text as="b">{fileName}</Text>
                    <div
                      className="import-address-separator-file__runner"
                      style={{'--value': `${progressValue}%`}}
                    ></div>
                    <button
                      className="import-address-separator-file__reset"
                      onClick={handleInputReset}
                    >
                      {ADDRESS_ICONS.delete}
                    </button>
                  </div>
                ) : (
                  <>
                    {validate ? (
                      <>
                        <Text
                          as="b"
                          color={THEME_SEMANTICS.failed}
                          style={{marginTop: 16}}
                        >
                          {validate?.content}
                        </Text>
                        <Text
                          color="#7C88A6"
                          fontSize={12}
                          lineHeight={17}
                          style={{marginBottom: 8}}
                        >
                          {validate?.size}
                        </Text>
                      </>
                    ) : (
                      <Text as="b" style={{margin: '16px 0 12px 0'}}>
                        {t(DISPLAY_NAME_MENU.GENERAL.SELECT_FILE_IMPORT)}
                      </Text>
                    )}
                    <Button
                      className="import-address-separator-file__upload-btn"
                      appearance="secondary"
                      size="sm"
                      onClick={handleUploadBtnClick}
                    >
                      {t(DISPLAY_NAME_MENU.GENERAL.SELECT_FILE)}
                    </Button>
                  </>
                )}
                <input
                  ref={inputFile}
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  style={{display: 'none'}}
                  onChange={handleInputFileChange}
                />
              </div>
              <div style={{marginBottom:'24px'}}>
                <ProductWarehouse/>
              </div>
              <div className="import-address-separator-file__content">
                <ul style={{paddingLeft: 24}}>
                  <Text as="li" fontSize={13} color="#7C88A6" style={{listStyle: 'disc'}}>
                    {t(DISPLAY_NAME_MENU.GENERAL.DOWNLOAD_SAMPLE_FILE)} {''}
                    <a
                      ref={tmpLink}
                      href={sampleFile}
                      download="product_template.xlsx"
                      style={{color: '#1373DB'}}
                    >
                      {t(DISPLAY_NAME_MENU.GENERAL.HERE)}
                    </a>
                    , {t(DISPLAY_NAME_MENU.GENERAL.COMPLETELY_AND_CORRECTLY)}
                  </Text>
                  <Text fontSize={13}  as="li" color="#7C88A6" style={{listStyle: 'disc'}}>
                    {t(DISPLAY_NAME_MENU.GENERAL.FORMAT_FILE_IMPORT)}
                  </Text>
                  <Text fontSize={13}  as="li" color="#7C88A6" style={{listStyle: 'disc'}}>
                    {t(DISPLAY_NAME_MENU.GENERAL.FILE_IMPORT_MAX_LINE)}
                  </Text>
                </ul>
              </div>
            </div>
            <div className="import-address-separator-file__footer">
              <Button
                className="import-address-separator-file__btn"
                appearance="ghost"
                size="sm"
                onClick={handleClose}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.CLOSE)}
              </Button>
              <Button
                className="import-address-separator-file__btn"
                disabled={!canSubmit}
                size="sm"
                onClick={() => canSubmit && handleSubmit()}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.UPLOAD)}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="import-address-separator-file__header">
              <Text
                as="h2"
                fontSize={20}
                lineHeight={28}
                style={{marginBottom: 8}}
              >
                {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.IMPORT_CUSTOMER_LIST)}
              </Text>
              <Text
                fontSize="14px"
                color={'#7C88A6'}
                style={{marginTop: '8px'}}
              >
                {t(DISPLAY_NAME_MENU.GENERAL.FILE_IMPORT_HELP)}
              </Text>
            </div>
            <div className="import-address-separator-file__uploading">
              <CircularProgress
                className="import-address-separator-file__spinner"
                color="success"
                size={54}
                thickness={5}
              />
              <Text style={{marginTop: 24}}>
                {t(DISPLAY_NAME_MENU.GENERAL.FILE_IMPORT_WAITING)}
              </Text>
            </div>
          </>
        )}
      </StyledImportAddressSeparatorFileModal>
    </Modal>
  )
}
