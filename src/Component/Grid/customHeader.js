import {useState} from 'react'
import {useTranslation} from 'react-i18next'

export default function CustomHeader({...props}) {
  const {t} = useTranslation()
  const {label} = props
  //   const [status, changeStatus] = useState(1);
  const SelectedRows = props.api.getSelectedRows()
  const allRow = props.api.getDisplayedRowCount()
  //   if (0 < SelectedRows.length < allRow) {
  //     changeStatus(3);
  //   }
  //   if (0 === SelectedRows.length) {
  //     changeStatus(1);
  //   }
  //   if (allRow === SelectedRows.length) {
  //     changeStatus(2);
  //   }
  /**
   * 1: uncheck
   * 2: check
   * 3: check some row
   */
  const clickSelectBox = e => {
    console.log('==== click selectbox')
  }
  const renderCheckbox = () => {
    if (SelectedRows.length > 0 < allRow) {
      return (
        <div className="bouder-button" onClick={e => clickSelectBox(e)}>
          <img src="svg/grid-check-1-part.svg" />;
        </div>
      )
    }
    if (SelectedRows.length === 0) {
      return (
        <div className="bouder-button" onClick={e => clickSelectBox(e)}>
          <img src="svg/grid-uncheck.svg" />
        </div>
      )
    }
    if (allRow === SelectedRows.length) {
      return (
        <div className="bouder-button" onClick={e => clickSelectBox(e)}>
          <img src="svg/grid-check.svg" />
        </div>
      )
    }
  }
  //   console.log("grid data ============ status of checkbox : " + status);
  if (label === 'select_box' || label === 'hidden_header')
    return <div className="header-upos-grid-wrapper" />
  if (label === 'expand_icon')
    return (
      <div
        className="order-list-header-cell"
        onClick={e => clickSelectBox(e)}
      >
        <img src="/svg/grid-setting.svg" />
      </div>
    )
  return (
    <div
      className={
        label === 'status'
          ? 'order-custom-header upos-text upos-header-cell-center'
          : 'order-custom-header upos-text'
      }
    >
      {label ? t(label) : '--'}
    </div>
  )
}
