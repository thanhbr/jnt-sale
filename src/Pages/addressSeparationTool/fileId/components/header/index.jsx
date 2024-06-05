import {Popover, Tooltip} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Breadcrumb} from 'common/breadcrumb'
import {Button} from 'common/button'
import {Text} from 'common/text'
import config from 'config'
import useAlert from 'hook/useAlert'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {useEffect, useRef, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {
  SINGLE_ADDRESS_BREADCRUMB,
  SINGLE_REDUCER_EXPORT_POPOVER,
} from '../../_singleConstants'
import {StyledAddressSeparationSingleFileHeader} from './_styled'

export const AddressSeparationSingleFileHeader = ({...props}) => {
  const {showAlert} = useAlert()

  const params = useParams()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const [exportUrl, setExportUrl] = useState('#')

  const [canSubmitBulkOrder, setCanSubmitBulkOrder] = useState(true)

  const exportLink = useRef()

  const shouldOpenPopover = Boolean(anchorEl)
  const popoverId = shouldOpenPopover
    ? 'address-separation-single-file-header__popover'
    : undefined

  const handleExport = async type => {
    if (![0, 1, 2].includes(type) || !params?.fileId) return

    setAnchorEl(null)

    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/detect/export`,
      JSON.stringify({type, file_id: params.fileId}),
    )

    if (!!response?.data?.success) {
      setExportUrl(
        response?.data?.data?.url
          ? response.data.data.url.replace(/http:/g, 'https:')
          : '#',
      )

      showAlert({
        content: 'Xuất file thành công',
        type: 'success',
        duration: 2000,
      })
    } else
      showAlert({
        content: 'Xuất file thất bại',
        type: 'danger',
        duration: 2000,
      })
  }

  const handleCreateBulkOrder = async () => {
    if (!!!params?.fileId) return

    if (!canSubmitBulkOrder) return
    setCanSubmitBulkOrder(false)

    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/detect/bulks`,
      JSON.stringify({file_id: params.fileId}),
    )

    if (!!response?.data?.success)
      navigate(`/tools/bulks-order/${response?.data?.file_id}`)

    setCanSubmitBulkOrder(true)
  }

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])

  return (
    <StyledAddressSeparationSingleFileHeader {...props}>
      <Breadcrumb links={SINGLE_ADDRESS_BREADCRUMB} title="Xử lý địa chỉ" />
      <div className="address-separation-single-file-header__actions">
        <Tooltip
          id="global-tooltip"
          title="Xuất file excel lên đơn (không khấu trừ tồn kho)"
          arrow
        >
          <Button
            className="address-separation-single-file-header__action-btn"
            appearance="secondary"
            icon={ADDRESS_ICONS.download}
            onClick={e => setAnchorEl(e.currentTarget)}
          >
            Xuất excel
          </Button>
        </Tooltip>
        <Button
          className="address-separation-single-file-header__action-btn"
          disabled={!canSubmitBulkOrder}
          icon={ADDRESS_ICONS.plus}
          onClick={handleCreateBulkOrder}
        >
          Tạo đơn hàng loạt
        </Button>
      </div>
      {shouldOpenPopover && (
        <Popover
          id={popoverId}
          open={true}
          onClose={() => setAnchorEl(null)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <ul className="address-separation-single-file-header__popover-list">
            {SINGLE_REDUCER_EXPORT_POPOVER.map(item => (
              <li
                key={item.id}
                className="address-separation-single-file-header__popover-item"
                onClick={() => handleExport(item?.type)}
              >
                {ADDRESS_ICONS.xlsx}
                <Text
                  className="address-separation-single-file-header__popover-item-text"
                  fontSize={15}
                  lineHeight={23}
                  style={{marginLeft: 8}}
                >
                  {item.name}
                </Text>
              </li>
            ))}
          </ul>
        </Popover>
      )}
      <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
    </StyledAddressSeparationSingleFileHeader>
  )
}
