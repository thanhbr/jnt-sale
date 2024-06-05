import { CircularProgress } from '@mui/material'
import moment from 'moment'
import { sendRequestAuth } from 'api/api'
import { Button } from 'common/button'
import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import config from 'config'
import useAlert from 'hook/useAlert'
import { BULK_ORDER_ICONS } from 'Pages/bulkOrder/interface/_icons'
import { bulkOrderCreateActions } from 'Pages/bulkOrder/provider/_actions'
import { getArrayFromValue } from '../../../utils/array'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import readXlsxFile from 'read-excel-file'
import { StyledPurchaseCreateImportFileModal } from './_styled'
import { PurchasesContext } from '../../../provider/_context'
import { WarehouseImport } from './warehouse'
import { SupplierImport } from './supplier'
import { IMPORT_FILE_PURCHASE } from '../../../interfaces/_constants'
import useCreatePurchaseImportExcel from '../../../hooks/useCreatePurchaseImportExcel'
import usePurchasesFilterForm from '../../../hooks/useFilter'

export const PurchaseCreateImportFileModal = ({ onClose, ...props }) => {
  const { showAlert } = useAlert()
  const { data , methods} = useCreatePurchaseImportExcel()
  const {functions} = usePurchasesFilterForm()

  const generalInfo = data
  const navigate = useNavigate()

  const { dispatch } = useContext(PurchasesContext)

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
          display: { list: getArrayFromValue(response?.data?.data?.details) },
          file: { id: fileId },
          report: { list: rpl },
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
    else if (size < 3000000) formatSize = `${Math.ceil(size / 100) / 10} KB`
    else formatSize = `${Math.ceil(size / 100000) / 10} MB`

    const data = await readXlsxFile(file)

    if (Array.isArray(data)) {
      if (
        data.length >
        1000 + IMPORT_FILE_PURCHASE.importFileModal.startRowNumber
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
        IMPORT_FILE_PURCHASE.importFileModal.startRowNumber ||
        JSON.stringify(
          data[IMPORT_FILE_PURCHASE.importFileModal.startRowNumber - 2],
        ).toLowerCase() !==
        JSON.stringify(
          IMPORT_FILE_PURCHASE.importFileModal.columnNames,
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
        IMPORT_FILE_PURCHASE.importFileModal.startRowNumber - 1,
      )


      // const date = new Date()
      const convertDateTimeToApiFormat = data => {
        const dateTimeSplit = data.split(' ')
        const dmy = dateTimeSplit[0] ? dateTimeSplit[0].split('/') : []
        const ymd = `${dmy[2]}-${dmy[1]}-${dmy[0]}`
        return `${ymd} `.trim() + ' 00:00:00'
      }
      const collectedData = {
        supplier_id: generalInfo?.vendor?.value?.data?.supplier_id || 0,
        warehouse_id: generalInfo?.warehouse?.value?.data?.id || 0,
        code: !!data[2][1] ? data[2][1] : '',
        // purchase_date: !!data[3][1] ? convertDateTimeToApiFormat(data[3][1]) : moment(date).format("DD-MM-YYYY HH:mm:ss"),
        purchase_date: !!data[3][1] ? convertDateTimeToApiFormat(data[3][1]) : "",
        note: !!data[4][1] ? data[4][1] : '',
        payment_method: !!data[2][4] ? data[2][4] : '',
        payment_amount: !!data[3][4] ? data[3][4] : (+data[3][4] == 0 ? 0 : ''),
        vat: !!data[4][4] ? data[4][4] : 0,
        is_stock: !!data[5][4] ? ( data[5][4] == 'Không' ? 0 : 1 ) : '',
        // file_name: file?.name,
        arr_product: sliceData.map((item, i) => ({
          file_row:
            IMPORT_FILE_PURCHASE.importFileModal.startRowNumber + i,
          product_name: item[2] || '',
          sku: item[1] || '',
          quantity: item[4] || 0,
          price: item[3] || 0,
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
    const valid = ![
      !!generalInfo?.vendor?.value?.data?.supplier_id,
      !!generalInfo?.warehouse?.value?.data?.id,
    ].includes(false)
    methods.onUpdateValidate()
    if(valid){
      setIsSubmitting(true)

      const response = await sendRequestAuth(
        'post',
        `${config.API}/purchase/import`,
        JSON.stringify(submitData),
      )

      if (!!response.data?.success) {
        functions.applyPurchasesOtherFilter()
        showAlert({
          content: 'Tải lên phiếu nhập hàng thành công',
          type: 'success',
        })
        methods.onUpdateNotification([])
      } else{
        showAlert({
          content: 'Mẫu file tải lên không hợp lệ, vui lòng kiểm tra lại',
          type: 'danger',
        })
          methods.onUpdateNotification(response.data?.errors?.details)
      }

      handleInputReset()
      if (onClose) onClose()
    }
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
    <StyledPurchaseCreateImportFileModal {...props} onClick={handleClose}>
      <div
        className="bulk-order-create-import-file-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <div className="bulk-order-create-import-file-modal__header">
          <Text as="h2" fontSize={20} lineHeight={28} style={{ marginBottom: 8 }}>
            Tạo phiếu nhập hàng bằng Excel
          </Text>
        </div>
        <div className="bulk-order-create-import-file-modal__body">
          {!isSubmitting ? (
            <div className="bulk-order-create-import-file-modal__content">
              <div className="bulk-order-create-import-file-modal__content-items">
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
                      style={{ '--value': `${progressValue}%` }}
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
                          style={{ marginTop: 16 }}
                        >
                          {validate?.content}
                        </Text>
                        <Text
                          color="#7C88A6"
                          fontSize={12}
                          lineHeight={17}
                          style={{ marginBottom: 8 }}
                        >
                          {validate?.size}
                        </Text>
                      </>
                    ) : (
                      <Text as="b">Chọn file import</Text>
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
                  style={{ display: 'none' }}
                  onChange={handleInputFileChange}
                />
                <div className={'bulk-order-create-import-file-modal__content-general-info'}>
                  <SupplierImport className={'bulk-order-create-import-file-modal__supplier-item'}/>
                  <WarehouseImport className={'bulk-order-create-import-file-modal__warehouse-item'}/>
                </div>
              </div>
              <div className="bulk-order-create-import-file-modal__description">
                <ul>
                  <li>
                    <Text color="#7C88A6" fontSize={13}>
                      Tải xuống file mẫu
                      <Text as={'a'} href={'/files/import-purchase.xlsx'} target={'blank'} color={'#1A94FF'}
                            style={{ cursor: 'pointer' }}> tại đây</Text>
                      , điền đủ và đúng thông tin theo mẫu.
                    </Text>
                  </li>
                  <li>
                    <Text color="#7C88A6" fontSize={13}>
                      Chỉ nhận file có định dạng .xls, .xlsx và dung lượng dưới 3MB.
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
              <Text style={{ marginTop: 24 }}>
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
    </StyledPurchaseCreateImportFileModal>
  )
}
