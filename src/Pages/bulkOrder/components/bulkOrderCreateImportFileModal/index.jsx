import {CircularProgress} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import {BULK_ORDER_CREATE_CONSTANTS} from 'Pages/bulkOrder/interface/_constants'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {bulkOrderCreateActions} from 'Pages/bulkOrder/provider/_actions'
import {BulkOrderCreateContext} from 'Pages/bulkOrder/provider/_context'
import {getArrayFromValue} from 'Pages/bulkOrder/utils/array'
import {useContext, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import readXlsxFile from 'read-excel-file'
import {StyledBulkOrderCreateImportFileModal} from './_styled'

export const BulkOrderCreateImportFileModal = ({onClose, ...props}) => {
  const {showAlert} = useAlert()

  const navigate = useNavigate()

  const {dispatch} = useContext(BulkOrderCreateContext)

  const [canRunProgress, setCanRunProgress] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shouldShowProgress, setShouldShowProgress] = useState(false)

  const [fileName, setFileName] = useState('')
  const [progressValue, setProgressValue] = useState(0)
  const [rowsGroup, setRowsGroup] = useState([])
  const [submitData, setSubmitData] = useState(null)
  const [validate, setValidate] = useState(null)

  const inputFileRef = useRef()

  const handleClose = () => {
    if (isSubmitting) return

    handleInputReset()
    onClose()
  }

  const handleFetchFile = async (fileId, rpl) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/tool/bulks/detail/${fileId}`,
    )

    if (!!response?.data?.success) {
      dispatch({
        type: bulkOrderCreateActions.TABLE_DISPLAY_UPDATE,
        payload: {
          display: {list: getArrayFromValue(response?.data?.data?.details)},
          file: {id: fileId},
          report: {list: rpl},
          total: {
            rows: Number(response?.data?.data?.total_rows || 0),
            sent: Number(response?.data?.data?.total_sent || 0),
          },
        },
      })
    }
  }

  const handleInputFileChange = async e => {
    const file = e.target.files[0]

    if (!file) return

    setShouldShowProgress(true)
    setFileName(file.name)

    const size = file?.size ? file.size : 0
    let formatSize = ''
    if (size < 1000) formatSize = `${size} Bytes`
    else if (size < 1000000) formatSize = `${Math.ceil(size / 100) / 10} KB`
    else formatSize = `${Math.ceil(size / 100000) / 10} MB`

    const data = await readXlsxFile(file)

    if (Array.isArray(data)) {
      if (
        data.length >
        1000 + BULK_ORDER_CREATE_CONSTANTS.importFileModal.startRowNumber
      ) {
        // Chỉ hỗ trợ tối đa 1.000 đơn trong 1 file. Trường hợp trên 1.000 đơn hệ thống sẽ tự động loại bỏ những đơn thừa.
        warningWrongValidation(
          'File tải lên hiện đang vượt quá kích thước quy định.',
          formatSize,
        )
        return
      }
      if (
        data.length <
          BULK_ORDER_CREATE_CONSTANTS.importFileModal.startRowNumber ||
        JSON.stringify(
          data[BULK_ORDER_CREATE_CONSTANTS.importFileModal.startRowNumber - 3],
        ).toLowerCase() !==
          JSON.stringify(
            BULK_ORDER_CREATE_CONSTANTS.importFileModal.columnNames,
          ).toLowerCase()
      ) {
        // Không thay đổi thứ tự các cột trong file mẫu.
        warningWrongValidation(
          'Mẫu file tải lên không hợp lệ, vui lòng kiểm tra lại.',
          formatSize,
        )
        return
      }

      if (validate) setValidate(null)

      const sliceData = data.slice(
        BULK_ORDER_CREATE_CONSTANTS.importFileModal.startRowNumber - 1,
      )
      const collectedData = {
        file_name: file?.name,
        details: sliceData.map((item, i) => ({
          file_row:
            BULK_ORDER_CREATE_CONSTANTS.importFileModal.startRowNumber + i,
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
      setCanRunProgress(true)
    } else
      warningWrongValidation(
        'Mẫu file tải lên không hợp lệ, vui lòng kiểm tra lại.',
        formatSize,
      )
  }

  const handleInputReset = () => {
    if (inputFileRef?.current) inputFileRef.current.value = null

    setCanRunProgress(false)
    setCanSubmit(false)
    setIsSubmitting(false)
    setShouldShowProgress(false)

    setFileName('')
    setProgressValue(0)
    setRowsGroup([])
    setSubmitData(null)
    setValidate(null)
  }

  const handleRunProgress = () => {
    rowsGroup.forEach((rows, i) => {
      const currentProgress = ((i + 1) * 100) / rowsGroup.length
      setProgressValue(currentProgress)
    })

    const currentSubmitData = submitData
    const submitDetails = currentSubmitData?.details

    if (Array.isArray(submitDetails)) {
      currentSubmitData.details = submitDetails
      setSubmitData(currentSubmitData)
    }

    setTimeout(() => setCanSubmit(true), 500)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const response = await Promise.all([
      sendRequestAuth(
        'post',
        `${config.API}/tool/bulks/import`,
        JSON.stringify(submitData),
      ),
      sendRequestAuth(
        'post',
        `${config.API}/order/customer/report`,
        JSON.stringify({phone: submitData.details.map(item => item?.phone)}),
      ),
    ])

    if (!!response[0]?.data?.success) {
      if (response[0]?.data?.file_id) {
        navigate(`/tools/bulks-order/${response[0]?.data?.file_id}`)
      }
      // handleFetchFile(
      //   response[0].data.file_id,
      //   getArrayFromValue(response[1]?.data?.data),
      // )
      // showAlert({
      //   content: 'Tải lên file lên đơn hàng loạt thành công',
      //   type: 'success',
      // })
    } else
      showAlert({
        content: 'Tải lên file lên đơn hàng loạt thất bại',
        type: 'danger',
      })

    handleInputReset()
    if (onClose) onClose()
  }

  const handleUploadBtnClick = () =>
    inputFileRef?.current && inputFileRef.current.click()

  const warningWrongValidation = (content, size) => {
    if (inputFileRef?.current) inputFileRef.current.value = null

    setValidate({
      content,
      size,
    })

    setShouldShowProgress(false)
  }

  useEffect(() => {
    if (canRunProgress) handleRunProgress()
  }, [canRunProgress])

  return (
    <StyledBulkOrderCreateImportFileModal {...props} onClick={handleClose}>
      <div
        className="bulk-order-create-import-file-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="bulk-order-create-import-file-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 8}}>
            Nhập file lên đơn hàng loạt
          </Text>
          <Text as="p" color="#7C88A6">
            Sử dụng công cụ này để tải lên và thực hiện lên đơn hàng loạt
          </Text>
        </div>
        <div className="bulk-order-create-import-file-modal__body">
          {!isSubmitting ? (
            <div className="bulk-order-create-import-file-modal__content">
              <img
                className="bulk-order-create-import-file-modal__banner"
                src="/img/bulks-order/import-file-banner.png"
                alt="banner"
              />
              {shouldShowProgress ? (
                <div className="bulk-order-create-import-file-modal__progress">
                  <Text as="b">{fileName}</Text>
                  <div
                    className="bulk-order-create-import-file-modal__runner"
                    style={{'--value': `${progressValue}%`}}
                  ></div>
                  <button
                    className="bulk-order-create-import-file-modal__reset"
                    onClick={handleInputReset}
                  >
                    {BULK_ORDER_ICONS.delete}
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
                    <Text as="b">Tải lên file lên đơn</Text>
                  )}
                  <Button
                    className="bulk-order-create-import-file-modal__trigger-file"
                    appearance="secondary"
                    size="xs"
                    onClick={handleUploadBtnClick}
                  >
                    Chọn file
                  </Button>
                </>
              )}
              <input
                ref={inputFileRef}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                type="file"
                style={{display: 'none'}}
                onChange={handleInputFileChange}
              />
              <div className="bulk-order-create-import-file-modal__description">
                <ul>
                  <li>
                    <Text color="#7C88A6" fontSize={13} lineHeight={18}>
                      Chỉ nhận file có định dạng .xls, .xlsx
                    </Text>
                  </li>
                  <li>
                    <Text color="#7C88A6" fontSize={13} lineHeight={18}>
                      Không thay đổi thứ tự các cột trong file mẫu.
                    </Text>
                  </li>
                  <li>
                    <Text color="#7C88A6" fontSize={13} lineHeight={18}>
                      Chỉ hỗ trợ tối đa 1.000 đơn trong 1 file. Trường hợp trên
                      1.000 đơn hệ thống sẽ tự động loại bỏ những đơn thừa.
                    </Text>
                  </li>
                  <li>
                    <Text color="#7C88A6" fontSize={13} lineHeight={18}>
                      Chỉ nhận file excel có dung lượng dưới 3MB.
                    </Text>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bulk-order-create-import-file-modal__uploading">
              <CircularProgress
                className="bulk-order-create-import-file-modal__spinner"
                color="success"
                size={54}
                thickness={5}
              />
              <Text style={{marginTop: 24}}>
                Hệ thống đang xử lý dữ liệu, chờ chúng tôi một tí nhé!
              </Text>
            </div>
          )}
        </div>
        {!isSubmitting && (
          <div className="bulk-order-create-import-file-modal__footer">
            <Button
              className="bulk-order-create-import-file-modal__footer-btn"
              appearance="ghost"
              size="sm"
              onClick={handleClose}
            >
              Đóng
            </Button>
            <Button
              className="bulk-order-create-import-file-modal__footer-btn"
              disabled={!canSubmit}
              size="sm"
              onClick={() => canSubmit && handleSubmit()}
            >
              Tải lên
            </Button>
          </div>
        )}
      </div>
    </StyledBulkOrderCreateImportFileModal>
  )
}
