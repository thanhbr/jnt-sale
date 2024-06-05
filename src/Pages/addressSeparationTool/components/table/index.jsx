import {Skeleton, Tooltip} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {EmptySection} from 'common/emptySection'
import {Switch} from 'common/switch'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import config from 'config'
import useAlert from 'hook/useAlert'
import {AddressSeparationToolContext} from 'Pages/addressSeparationTool'
import {ADDRESS_ICONS} from 'Pages/addressSeparationTool/_icons'
import {actions} from 'Pages/addressSeparationTool/_reducer'
import {useContext, useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {MODAL_ID} from '../modalPicker'

import {StyledAddressTable} from './_styled'

export const AddressSeparationHistoryTable = ({...props}) => {
  const {pageState} = useContext(AddressSeparationToolContext)
  const {dataDisplay, isLoading} = pageState

  return (
    <StyledAddressTable {...props}>
      <div className="address-table__container">
        <div className="address-table__thead">
          <ul className="address-table__tr">
            <li className="address-table__th">
              <Text as="b">File name</Text>
            </li>
            <li className="address-table__th">
              <Text as="b" style={{marginRight: 5}}>
                Kết quả tách
              </Text>
              <Tooltip
                id="global-tooltip"
                title="Địa chỉ tách thành công/tổng số"
                arrow
              >
                {ADDRESS_ICONS.question}
              </Tooltip>
            </li>
            <li className="address-table__th">
              <Text as="b">Nhân viên</Text>
            </li>
            <li className="address-table__th">
              <Text as="b">Thời gian tải lên</Text>
            </li>
            <li className="address-table__th">
              <Text as="b">Đã lên đơn</Text>
            </li>
            <li className="address-table__th"></li>
          </ul>
        </div>
        <div className="address-table__tbody">
          {isLoading ? (
            <>
              {Array.from(Array(10), (e, i) => (
                <EmptyRow key={i} />
              ))}
            </>
          ) : (
            <>
              {dataDisplay.length <= 0 ? (
                <EmptySection
                  banner={<img src="/img/address/empty.png" alt="Empty" />}
                >
                  Bạn chưa có file tách địa chỉ nào
                </EmptySection>
              ) : (
                <>
                  {dataDisplay.map(item => (
                    <Row key={item?.id} data={item} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </StyledAddressTable>
  )
}

export const EmptyRow = () => {
  return (
    <ul className="address-table__tr">
      {Array.from(Array(6), (e, i) => (
        <li key={i} className="address-table__td">
          <Skeleton
            variant="text"
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </li>
      ))}
    </ul>
  )
}

export const Row = ({data}) => {
  const navigate = useNavigate()

  const {showAlert} = useAlert()

  const {pageDispatch} = useContext(AddressSeparationToolContext)

  const [isToggleDisabled, setIsToggleDisabled] = useState(data?.status === '2')
  const [exportUrl, setExportUrl] = useState('#')

  const exportLink = useRef()
  const toggle = useRef(null)

  const totalRows = Number(data?.total_rows) || 0
  const totalSuccess = Number(data?.total_success) || 0

  const checkSeparationResults = () => {
    if (totalSuccess >= totalRows) return THEME_COLORS.green
    if (totalSuccess > 0) return THEME_COLORS.orange
    return THEME_COLORS.red
  }

  const handleEditBtnClick = () => {
    if (!data?.id) return

    navigate(`/tools/address-separation/${data.id}`)
  }

  const handleSwitchChange = boo => {
    if (boo)
      pageDispatch({
        type: actions.MODAL_OPEN,
        payload: {
          id: MODAL_ID.confirmTheFileHasBeenFiled,
          data: {data, onReverse: reverseAction, onSubmit: submitAction},
        },
      })
  }

  const reverseAction = () => {
    if (!toggle?.current) return
    const element = toggle.current.querySelector('.address-table__toggle')
    if (element) element.click()
  }

  const submitAction = async () => {
    if (!data?.id) return

    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/detect/mark-uploaded`,
      JSON.stringify({file_id: Number(data.id)}),
    )

    if (!!response?.data?.success) {
      setIsToggleDisabled(true)

      showAlert({content: 'Cập nhật trạng thái thành công', type: 'success'})

      pageDispatch({type: actions.MODAL_CLOSE})
    } else showAlert({content: 'Cập nhật trạng thái Thất bại', type: 'danger'})
  }

  const handleExport = async () => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/detect/export`,
      JSON.stringify({type: 0, file_id: data?.id}),
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

  const formatDateTime = () => {
    if (!data?.dt_created) return '---'
    const splits = data.dt_created.split(' ')
    const date = splits[0] || ''
    const time = splits[1] || ''

    const dateString = date.split('-').reverse().join('/')
    const timeString = time.split(':').slice(0, 2).join(':')

    return `${dateString} ${timeString}`
  }

  useEffect(() => {
    if (exportUrl && exportUrl !== '#') {
      if (exportLink?.current) exportLink.current.click()
    }
  }, [exportUrl])

  return (
    <ul className="address-table__tr">
      <li className="address-table__td">
        <Text
          title={data?.file_name}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {data?.file_name || '---'}
        </Text>
      </li>
      <li className="address-table__td">
        <Text color={checkSeparationResults()}>
          {totalSuccess}/{totalRows}
        </Text>
      </li>
      <li className="address-table__td">
        <Text>{data?.user_name || '---'}</Text>
      </li>
      <li className="address-table__td">
        <Text>{formatDateTime()}</Text>
      </li>
      <li ref={toggle} className="address-table__td">
        <Switch
          className="address-table__toggle"
          defaultChecked={data?.status === '2'}
          disabled={isToggleDisabled}
          onChange={val => handleSwitchChange(val)}
        />
      </li>
      <li className="address-table__td">
        <button className="address-table__action" data-reverse="true">
          {ADDRESS_ICONS.threeDots}
        </button>
        <Tooltip id="global-tooltip" title="Chỉnh sửa" arrow>
          <button
            className="address-table__action"
            onClick={handleEditBtnClick}
          >
            {ADDRESS_ICONS.edit}
          </button>
        </Tooltip>
        <Tooltip
          id="global-tooltip"
          placement="top"
          title="Xuất file lên đơn"
          arrow
        >
          <button className="address-table__action" onClick={handleExport}>
            {ADDRESS_ICONS.excel}
          </button>
        </Tooltip>
        <a ref={exportLink} href={exportUrl} style={{display: 'none'}}></a>
      </li>
    </ul>
  )
}
