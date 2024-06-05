import {CircularProgress, Modal} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {CustomerContext} from 'Pages/customer'
import {useContext, useEffect, useRef, useState} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import readXlsxFile from 'read-excel-file'
import {StyledImportAddressSeparatorFileModal} from './_styled'
import sampleFile from './files/customer_template.xlsx'
import {
  CUSTOMER_EXPORT_COLUMN_NAMES,
  CUSTOMER_START_ROW_NUMBER,
} from 'Pages/customer/_constants'

export const ImportAddressSeparatorFileModal = ({open, onClose, ...props}) => {
  // const navigate = useNavigate()
  // const [searchParams] = useSearchParams();
  const {dispatch, fetchData} = useContext(CustomerContext)

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
          JSON.stringify(CUSTOMER_EXPORT_COLUMN_NAMES).toLowerCase() // Không thay đổi thứ tự các cột trong file mẫu.
        // data.length > 1000 + CUSTOMER_START_ROW_NUMBER // Chỉ hỗ trợ tối đa 1.000 đơn trong 1 file. Trường hợp trên 1.000 đơn hệ thống sẽ tự động loại bỏ những đơn thừa.
      ) {
        console.log(JSON.stringify(data[0]).toLowerCase())
        console.log(JSON.stringify(CUSTOMER_EXPORT_COLUMN_NAMES).toLowerCase())
        console.log(data.length)
        warningWrongValidation(formatSize)
        return
      }

      if (validate) setValidate(null)

      const sliceData = data.slice(1)
      const collectedData = {
        file_name: file?.name,
        details: sliceData.map((item, i) => ({
          file_row: 1 + i,
          customer_name: item[1] || '',
          customer_code: item[2] || '',
          customer_group: item[3] || '',
          email: item[4] || '',
          phone: item[5] || '',
          gender: item[6] || '',
          price_policy: item[7] || '',
          address: item[8] || '',
          province: item[9] || 0,
          district: item[10] || 0,
          ward: item[11] || 0,
        })),
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
    let result = []
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

    const res = await sendRequestAuth(
      'post',
      `${config.API}/customer/import`,
      JSON.stringify(submitData),
    )
    
    if (res?.data?.success) {
      showAlert({
        content: res?.data?.message,
        type: 'success',
      })
    } else {
      showAlert({
        content: res?.data?.errors?.message,
        type: 'danger',
      })

      dispatch({type: 'SET_IMPORT_ERROR_DATA', payload: {submitData, errorDetails: res?.data?.errors?.details}})
    }
    fetchData()

    dispatch({type: 'TOGGLE_MODAL', payload: {id: ''}})

    handleInputReset()
  }

  const handleUploadBtnClick = () =>
    inputFile?.current && inputFile.current.click()

  const warningWrongValidation = size => {
    if (inputFile?.current) inputFile.current.value = null

    setValidate({
      content: 'Mẫu file tải lên không hợp lệ, vui lòng kiểm tra lại.',
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
                Import danh sách khách hàng
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
                        Chọn file import
                      </Text>
                    )}
                    <Button
                      className="import-address-separator-file__upload-btn"
                      appearance="secondary"
                      size="sm"
                      onClick={handleUploadBtnClick}
                    >
                      Chọn file
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
              <div className="import-address-separator-file__content">
                <ul style={{paddingLeft: 24}}>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc'}}>
                    Tải xuống file mẫu {''}
                    <a
                      ref={tmpLink}
                      href={sampleFile}
                      download="customer_template"
                      style={{color: '#1373DB'}}
                    >
                      tại đây
                    </a>
                    , điền đủ và đúng thông tin theo mẫu.
                  </Text>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc'}}>
                    Chỉ nhận file có định dạng .xls, .xlsx và dung lượng dưới
                    3MB.
                  </Text>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc'}}>
                    Chỉ hỗ trợ tối đa 1000 dòng cho một lần nhập. Trường hợp
                    trên 1.000 đơn hệ thống sẽ tự động loại bỏ những dòng thừa.
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
                Đóng
              </Button>
              <Button
                className="import-address-separator-file__btn"
                disabled={!canSubmit}
                size="sm"
                onClick={() => canSubmit && handleSubmit()}
              >
                Tải lên
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
                Import danh sách khách hàng
              </Text>
              <Text
                fontSize="14px"
                color={'#7C88A6'}
                style={{marginTop: '8px'}}
              >
                Giúp bạn tải lên và import hàng loạt khách hàng từ file excel
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
                Hệ thống đang thực hiện import, chờ chúng tôi một tí nhé!
              </Text>
            </div>
          </>
        )}
      </StyledImportAddressSeparatorFileModal>
    </Modal>
  )
}
