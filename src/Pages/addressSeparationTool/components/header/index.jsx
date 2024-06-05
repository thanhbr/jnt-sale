import {Breadcrumb} from 'common/breadcrumb'
import {Button} from 'common/button'
import {AddressSeparationToolContext} from 'Pages/addressSeparationTool'
import {ADDRESS_BREADCRUMB} from 'Pages/addressSeparationTool/_constants'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {actions} from 'Pages/addressSeparationTool/_reducer'
import {useContext, useRef} from 'react'
import {MODAL_ID} from '../modalPicker'
import {StyledAddressSeparationToolHeader} from './_styled'
import sampleFile from './files/excel_bulk_orders_v1.1_transfee.xlsx'

export const AddressSeparationToolHeader = ({...props}) => {
  const {pageDispatch} = useContext(AddressSeparationToolContext)

  const tmpLink = useRef()

  const handleUploadBtnClick = () =>
    pageDispatch({
      type: actions.MODAL_OPEN,
      payload: {id: MODAL_ID.importAddressSeparatorFile},
    })

  const handleDownloadSampleFile = () =>
    tmpLink?.current && tmpLink.current.click()

  return (
    <StyledAddressSeparationToolHeader {...props}>
      <Breadcrumb links={ADDRESS_BREADCRUMB} title="Tool tách địa chỉ" />
      <div className="address-separate-tool-header__actions">
        <Button
          className="address-separate-tool-header__action-btn"
          appearance="secondary"
          icon={ADDRESS_ICONS.download}
          onClick={handleDownloadSampleFile}
        >
          Tải file nhập mẫu
        </Button>
        <Button
          className="address-separate-tool-header__action-btn"
          icon={ADDRESS_ICONS.upload}
          onClick={handleUploadBtnClick}
        >
          Tải lên file tách địa chỉ
        </Button>
      </div>
      <a
        ref={tmpLink}
        href={sampleFile}
        download="excel_bulk_orders"
        style={{display: 'none'}}
      ></a>
    </StyledAddressSeparationToolHeader>
  )
}
