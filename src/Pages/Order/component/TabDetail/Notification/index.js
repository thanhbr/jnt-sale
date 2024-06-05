import {Box, Modal} from '@mui/material'
import {CustomerContext} from 'Pages/customer'
import {useContext} from 'react'
import {useEffect, useState} from 'react'

const Notification = () => {
  const {state, dispatch} = useContext(CustomerContext)
  const {isError, details, submitData, type} = state.errors
  const [showModalFailList, setShowModalFailList] = useState(false)
  // const [showNotify, setShowNotify] = useState(false)

  return (
    <>
      {isError && (
        <div className={'t-error-message-update'}>
          <div className={'t-error-message'}>
            <img src={'/svg/error-v2.svg'} alt="error-v2" />
            <p>
              Một số khách hàng trong file tải lên bị lỗi dữ liệu khi import -{' '}
            </p>
            <span onClick={() => setShowModalFailList(true)}>Xem chi tiết</span>
          </div>
          <div
            className={'t-error-icon-close'}
            onClick={() => dispatch({type: 'SHOW_ERROR_LIST', payload: false})}
          >
            <img src={'/svg/x-close.svg'} alt="x-close-icon" />
          </div>
        </div>
      )}

      {/* Fail List Items */}
      <Modal
        open={showModalFailList}
        onClose={() => setShowModalFailList(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="t-error-update-list">
          <p>Danh sách khách hàng cập nhật trạng thái thất bại</p>
          <ul style={{ height: '300px', overflow: 'auto' }}>
            <li>
              <img src={'/svg/error-v2.svg'} alt="error-v2" />
              Tải dữ liệu từ Excel thất bại ({details?.length}/{submitData?.details?.length})
            </li>
            {details?.map(item => (
              <li key={item.row}>
                <img src={'/svg/error-v2.svg'} alt="error-v2" /> Dòng{' '}
                {item.file_row}: {item.details.map(x => x.message).join(', ')}
              </li>
            ))}
          </ul>
          <div className="noti-btn">
            <button
              className="btn-close"
              onClick={() => setShowModalFailList(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Notification
