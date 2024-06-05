import {Button} from 'common/button'
import {Text} from 'common/text'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'
import {useContext, useEffect, useState} from "react";
import {InventoryContext} from "../../provider/_context";

export const UpdateStatusFailedModal = ({data, onClose, ...props}) => {
  const [countErorrs,setCountErorrs] = useState(0)
  useEffect(()=>{
    if(data.length > 0){
      let increase = 0
      let row = 0
    for(let i = 0; i< data.length ; i++){
        if(data[i].row !== row){
            row = data[i].row
            increase += 1
        }
    }
      setCountErorrs(increase)
    }
  },[data])
  return (
    <StyledUpdateStatusFailedModal {...props} onClick={onClose}>
      <div
        className="order-table__update-status-failed-modal__container"
        onClick={e => e.stopPropagation()}
      >
        <Text as="h2" fontSize={20} lineHeight={28} style={{marginBottom: 24}}>
            Danh sách các lỗi ở file tải lên
        </Text>
        {Array.isArray(data) && data.length > 0 && (
          <div className="order-table__update-status-failed-modal__content common-scrollbar">
            <div
                className="order-table__update-status-failed-modal__content-item"
            >
              {ORDER_ICONS.danger}
              <Text style={{display: 'block', flex: 1}}>
                  Tải dữ liệu từ Excel thất bại {props?.total && <Text> {countErorrs}/{props?.total}</Text> }
              </Text>
            </div>
            {data.map(item => (
              <div
                key={item.id}
                className="order-table__update-status-failed-modal__content-item"
              >
                {ORDER_ICONS.danger}
                <Text as={'pre'}>
                    Dòng {item.row}:{' '}
                </Text>
                  <Text style={{display: 'block', flex: 1}}>
                      {item.message}
                  </Text>
              </div>
            ))}
          </div>
        )}
        <div className="order-table__update-status-failed-modal__footer">
          <Button
            appearance="ghost"
            size="sm"
            style={{minWidth: 110}}
            onClick={onClose}
          >
            Đóng
          </Button>
        </div>
      </div>
    </StyledUpdateStatusFailedModal>
  )
}

const StyledUpdateStatusFailedModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  .order-table__update-status-failed-modal {
    &__container {
      width: 700px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__content {
      max-height: 50vh;
      margin-bottom: 24px;
      padding: 16px 10px;

      overflow: auto;

      background: #f3f6fc;
      border-radius: 6px;
    }

    &__content-item {
      margin-bottom: 16px;

      display: flex;

      &:last-child {
        margin-bottom: 0;
      }

      svg {
        width: 20px;
        height: 20px;

        margin-right: 8px;
      }
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }
  }
`
