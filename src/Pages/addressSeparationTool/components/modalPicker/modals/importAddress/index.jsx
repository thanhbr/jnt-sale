import {CircularProgress, Modal} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {
  ADDRESS_COLUMN_NAMES,
  ADDRESS_START_ROW_NUMBER,
} from 'Pages/addressSeparationTool/_constants'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import readXlsxFile from 'read-excel-file'
import {StyledImportAddressSeparatorFileModal} from './_styled'

export const ImportAddressSeparatorFileModal = ({open, onClose, ...props}) => {
  const navigate = useNavigate()

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
    if (size < 1000) formatSize = `${size} Bytes`
    else if (size < 1000000) formatSize = `${Math.ceil(size / 100) / 10} MB`
    else formatSize = `${Math.ceil(size / 100) / 10} MB`

    if (Array.isArray(data)) {
      if (
        data.length < ADDRESS_START_ROW_NUMBER ||
        JSON.stringify(data[ADDRESS_START_ROW_NUMBER - 3]).toLowerCase() !==
          JSON.stringify(ADDRESS_COLUMN_NAMES).toLowerCase() || // Không thay đổi thứ tự các cột trong file mẫu.
        data.length > 1000 + ADDRESS_START_ROW_NUMBER // Chỉ hỗ trợ tối đa 1.000 đơn trong 1 file. Trường hợp trên 1.000 đơn hệ thống sẽ tự động loại bỏ những đơn thừa.
      ) {
        warningWrongValidation(formatSize)
        return
      }

      if (validate) setValidate(null)

      const sliceData = data.slice(ADDRESS_START_ROW_NUMBER - 1)
      const collectedData = {
        file_name: file?.name,
        details: sliceData.map((item, i) => ({
          file_row: ADDRESS_START_ROW_NUMBER + i,
          order_code: item[0] || '',
          name: item[1] || '',
          phone: item[2] || '',
          address: item[3] || '',
          province: item[4] || '',
          district: item[5] || '',
          ward: item[6] || '',
          item_name: item[7] || '',
          insurrance: item[8] || 0,
          cod: item[9] || 0,
          weight: item[10] || 0,
          width: item[11] || 0,
          lengh: item[12] || 0,
          height: item[13] || 0,
          number_pack: item[14] || 0,
          ship_fee_custom: item[15] || 0,
          note: item[16] || '',
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

    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/detect/import`,
      JSON.stringify(submitData),
    )

    if (!!response?.data?.success && response?.data?.file_id)
      navigate(
        `/tools/address-separation/${response.data.file_id}?new-release=true`,
      )
    else showAlert({content: 'Tải lên file địa chỉ thất bại', type: 'danger'})

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

  useEffect(() => {
    if (canSeparate) handleSeparate()
  }, [canSeparate])

  return (
    <Modal {...props} open={open} onClose={handleClose}>
      <StyledImportAddressSeparatorFileModal>
        <div className="import-address-separator-file__header">
          <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 8}}>
            Nhập file tách địa chỉ
          </Text>
          <Text as="p" color="#7C88A6">
            Sử dụng công cụ này để tải lên và xử lý phân tách địa chỉ hàng loạt
          </Text>
        </div>
        {!isSubmitting ? (
          <>
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
                        Tải lên file địa chỉ
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
                    Chỉ nhận file có định dạng .xls, .xlsx File name:
                  </Text>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc'}}>
                    Không thay đổi thứ tự các cột trong file mẫu.
                  </Text>
                  <Text as="li" color="#7C88A6" style={{listStyle: 'disc'}}>
                    Chỉ hỗ trợ tối đa 1.000 đơn trong 1 file. Trường hợp trên
                    1.000 đơn hệ thống sẽ tự động loại bỏ những đơn thừa.
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
          <div className="import-address-separator-file__uploading">
            <CircularProgress
              className="import-address-separator-file__spinner"
              color="success"
              size={54}
              thickness={5}
            />
            <Text style={{marginTop: 24}}>
              Hệ thống đang thực hiện phân tách địa chỉ, chờ chúng tôi một tí
              nhé!
            </Text>
          </div>
        )}
      </StyledImportAddressSeparatorFileModal>
    </Modal>
  )
}
