import {CircularProgress, Modal} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import { CodContext } from '../../provider/_context'
import {useContext, useEffect, useRef, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import readXlsxFile from 'read-excel-file'
import {StyledImportCodComparingFileModal} from './_styled'
import sampleFile from './files/cod_comparing_template.xlsx'
import useCodFilterForm from '../../hooks/useCodFilterForm'
import {
  COD_COMPARING_EXPORT_COLUMN_NAMES,
  COD_COMPARING_START_ROW_NUMBER,
} from '../../interfaces/_constants'
import {orderActions} from './../../provider/_reducer'
import { CompressOutlined } from '@mui/icons-material'
import {useTranslation} from "react-i18next";

export const ImportCodComparingModal = ({open, onClose, ...props}) => {
  // const navigate = useNavigate()
  // const [searchParams] = useSearchParams();
  const {pageState, pageDispatch} = useContext(CodContext)
  const {functions,modals} = useCodFilterForm()

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
  const [progessColor, setProgessColor] = useState(0)

  const inputFile = useRef()
  const { t } = useTranslation()

  const handleClose = () => {
    if (isSubmitting) return

    handleInputReset()
    onClose()
  }

  const handleInputFileChange = async e => {
    const file = e.target.files[0]
    if (!file) return

    if(file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      setValidate({
        content: t("general_file_import_not_correct")
      })
      setShouldShowProgress(false)
      return
    }
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
        JSON.stringify(data[3]).toLowerCase() !==
          JSON.stringify(COD_COMPARING_EXPORT_COLUMN_NAMES).toLowerCase() // Không thay đổi thứ tự các cột trong file mẫu.
        // data.length > 1000 + CUSTOMER_START_ROW_NUMBER // Chỉ hỗ trợ tối đa 1.000 đơn trong 1 file. Trường hợp trên 1.000 đơn hệ thống sẽ tự động loại bỏ những đơn thừa.
      ) {
        console.log(JSON.stringify(data[3]).toLowerCase())
        console.log(JSON.stringify(COD_COMPARING_EXPORT_COLUMN_NAMES).toLowerCase())
        console.log(data.length)
        warningWrongValidation(formatSize)
        return
      }

      if (validate) setValidate(null)

      const sliceData = data.slice(4)

      const ltsData = sliceData.map((item, i) => item[1] && ({
        file_row: 5 + i,
        billcode: item[1] ? item[1].toString() :'',
      }));
      const filterCollectedData = ltsData.filter(element => {
            if (element!= null && typeof element.billcode != 'undefined') {
              return true;
            }
            return false;
        });

      const collectedData = {
        file_name: file?.name,
        details: filterCollectedData
      }
      
      // split to chunks
      const rawData = [...sliceData]

      let result = []
      for (let i = 50; i > 0; i--) {
        result.push(rawData.splice(0, Math.ceil(rawData.length / i)))
      }

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
    setProgessColor(1);
    rowsGroup.forEach((rows, i) => {

      const currentProgress = ((i + 1) * 100) / rowsGroup.length
      setProgressValue(currentProgress)
    })

    const currentSubmitData = submitData
    const submitDetails = currentSubmitData?.details

    if (Array.isArray(submitDetails)) {
      const newSubmitDetails = submitDetails.map((item, i) => ({
        ...item,
      }))

      currentSubmitData.details = newSubmitDetails
      setSubmitData(currentSubmitData)
    }

    setTimeout(() => setCanSubmit(true), 500)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const res = await sendRequestAuth(
      'post',
      `${config.API}/order/delivery/import-cod-comparing-check`,
      JSON.stringify(submitData),
    )
   
    if (res?.data?.success && !res?.data?.errors) {
      await functions.fetchUpdateData()
      showAlert({
        content: res?.data?.message,
        type: 'success',
      })
    } else {
      
      await functions.fetchUpdateData()
      pageDispatch({
        type: orderActions.NOTIFICATIONS_LIST_UPDATE_FAIL,
        payload: {
          notifications: {
            listFail: Array.isArray(res?.data?.errors?.details)
              ? res.data.errors.details.filter(item => !!!item?.success)
              : [],
          },
        },
      })
      let addingList = []
      submitData.details.forEach(item => {
        addingList = submitData.details.filter(
          item => !!!res.data.errors.details.find(find => find?.billcode === item?.billcode),
        )
         
      })
      pageDispatch({
        type: orderActions.NOTIFICATIONS_LIST_UPDATE_SUCCESS,
        payload: {
          notifications: {
            listSuccess: addingList,
          },
        },
      })
    }
    
    modals.handleModalImport(false)

    handleInputReset()
  }

  const handleUploadBtnClick = () =>
    inputFile?.current && inputFile.current.click()

  const warningWrongValidation = size => {
    if (inputFile?.current) inputFile.current.value = null

    setValidate({
      content: t("file_import_not_correct"),
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
    <Modal {...props} open={open} onClose={false}>
      <StyledImportCodComparingFileModal>
        {!isSubmitting ? (
          <>
            <div className="import-cod-comparing-file__header">
              <Text
                as="h2"
                fontSize={20}
                lineHeight={28}
                style={{marginBottom: 8}}
              >
                {t("import_list_cod_checked")}
              </Text>
              {t("note_import_list_cod_checked")}
            </div>
            <div className="import-cod-comparing-file__body" style={progessColor == 1 ? {border: '1px dashed #E5101D'} : {}}>
              <div className="import-cod-comparing-file__upload">
                {ADDRESS_ICONS.uploadBanner}
                {shouldShowProgress ? (
                  <div className="import-cod-comparing-file__progress">
                    <Text as="b">{fileName}</Text>
                    <div
                      className="import-cod-comparing-file__runner"
                      style={{'--value': `${progressValue}%`}}
                    ></div>
                    <button
                      className="import-cod-comparing-file__reset"
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
                        {t("general_page_select_import_file")}
                      </Text>
                    )}
                    <Button
                      className="import-cod-comparing-file__upload-btn"
                      appearance="secondary"
                      size="sm"
                      onClick={handleUploadBtnClick}
                    >
                      {t("general_page_select_file")}
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
              <div className="import-cod-comparing-file__content">
                <ul style={{paddingLeft: 24}}>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc', fontSize: '13px'}}>
                    {t("general_download_sample_file")} {''}
                    <a
                      ref={tmpLink}
                      href={sampleFile}
                      download="cod_comparing_template"
                      style={{color: '#1373DB'}}
                    >
                      {t("general_here")}
                    </a>
                    , {t("general_completely_and_correctly")}
                  </Text>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc', fontSize: '13px'}}>
                    {t("general_format_file_import")}
                  </Text>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc', fontSize: '13px'}}>
                    {t("general_file_import_max_line")}
                  </Text>
                </ul>
              </div>
            </div>
            <div className="import-cod-comparing-file__footer">
              <Button
                className="import-cod-comparing-file__btn"
                appearance="ghost"
                size="sm"
                onClick={handleClose}
              >
                {t("general_close")}
              </Button>
              <Button
                className="import-cod-comparing-file__btn"
                disabled={!canSubmit}
                size="sm"
                onClick={() => canSubmit && handleSubmit()}
              >
                {t("general_upload")}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="import-cod-comparing-file__header">
              <Text
                as="h2"
                fontSize={20}
                lineHeight={28}
                style={{marginBottom: 8}}
              >
                {t("import_list_cod_checked")}
              </Text>
              <Text
                fontSize="14px"
                color={'#7C88A6'}
                style={{marginTop: '8px'}}
              >
                {t("note_import_list_cod_checked")}
              </Text>
            </div>
            <div className="import-cod-comparing-file__uploading">
              <CircularProgress
                className="import-cod-comparing-file__spinner"
                color="success"
                size={54}
                thickness={5}
              />
              <Text style={{marginTop: 24}}>
                {t("general_file_import_waiting")}
              </Text>
            </div>
          </>
        )}
      </StyledImportCodComparingFileModal>
    </Modal>
  )
}
