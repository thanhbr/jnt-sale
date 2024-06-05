import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {formatDatetime} from 'common/form/datePicker/_functions'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import config from 'config'
import useRow from 'Pages/purchases/hooks/useRow'
import {useState} from 'react'
import styled from 'styled-components'
import {formatMoney} from 'util/functionUtil'
import {ConfirmModal} from './_confirmModal'
import purchasesFilterForm from 'Pages/purchases/hooks/useFilter'

export const RowTabWareHouse = ({data, arrDetail, ...props}) => {
  const {row} = useRow(data)
  const {functions} = purchasesFilterForm()
  const [confirmModalData, setConfirmModalData] = useState(null)

  const handleConfirm = () => {
    setConfirmModalData({
      content:
        'Thao tác này sẽ xác nhận rằng toàn bộ hàng hóa trên phiếu đã được nhập vào kho hàng. Bạn có chắc muốn thực hiện?',
      title: 'Xác nhận nhập kho',
      onClose: () => setConfirmModalData(null),
      onSubmit: async () => {
        setConfirmModalData(null)
        // row.importProductPurchase(data.id)
        const response = await sendRequestAuth(
          'post',
          `${config.API}/purchase/import-warehouse/${data?.id}`,
        )

        if (response?.data?.success) {
          functions.fetchUpdateData()
          row.refreshOrderDetails()
        }
      },
    })
  }

  return (
    <StyledRowTabWarehouse {...props}>
      <div className="block ">
        {data?.is_stock ? (
          <>
            <div style={{display: 'flex', marginBottom: 16}}>
              <Text fontWeight={600} style={{display: 'flex'}}>
                <img
                  src="/svg/check-circle.svg"
                  alt="check circle"
                  style={{marginRight: '8px'}}
                />
                Hàng hóa đã được nhập kho
              </Text>
            </div>
            {Array.isArray(data?.purchase_payment) &&
              data?.purchase_payment?.length > 0 && (
                <div style={{marginTop: 24}}>
                  <Collapser key={data.id} data={data} />
                </div>
              )}
          </>
        ) : (
          <>
            <div className="row-tab-warehouse__journey">
              <div style={{display: 'flex', justifyContent: 'end'}}>
                <Button appearance="primary" size="sm" onClick={handleConfirm}>
                  Xác nhận nhập kho
                </Button>
              </div>
              <div className="row-tab-warehouse__journey-no-data">
                <img src={'/img/purchases/Empty state.png'} alt="Empty state" />
                <Text color="#7C88A6" fontWeight={600}>
                  Hàng hóa chưa được nhập kho
                </Text>
              </div>
            </div>
          </>
        )}
      </div>

      {!!confirmModalData && <ConfirmModal {...confirmModalData} />}
    </StyledRowTabWarehouse>
  )
}

const Collapser = ({data}) => {
  const [shouldCollapse, setShouldCollapse] = useState(true)

  return (
    <div className="row-tab-warehouse__list-item">
      <div
        className="row-tab-warehouse__list-item-toggle"
        data-active={shouldCollapse}
        // onClick={() => setShouldCollapse(!shouldCollapse)}
      >
        <Text
          color={THEME_COLORS.secondary_100}
          fontSize={14}
          fontWeight={600}
          lineHeight={20}
        >
          Xác nhận nhập kho
        </Text>
        {/* {PURCHASES_ICONS.chevronLeft} */}
      </div>
      <div
        className="row-tab-warehouse__list-item-content"
        data-active={shouldCollapse}
      >
        <div className="row-tab-warehouse__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            Nhân viên xác nhận:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {data?.fullname}
          </Text>
        </div>
        <div className="row-tab-warehouse__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            Thời gian xác nhận nhập kho:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {formatDatetime(data?.dt_warehouse) || '---'}
          </Text>
        </div>
        <div className="row-tab-warehouse__list-item-figure">
          <Text
            color="#7C88A6"
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            Giá trị hàng hóa nhập kho:
          </Text>
          <Text
            color={THEME_COLORS.secondary_100}
            fontSize={14}
            fontWeight={400}
            lineHeight={20}
            style={{display: 'block'}}
          >
            {formatMoney(data?.total_amount)}
          </Text>
        </div>
      </div>
    </div>
  )
}

const StyledRowTabWarehouse = styled.div`
  position: relative;
  .row-tab-warehouse {
    &__list-item {
      margin-bottom: 12px;
      padding: 12px 24px;

      border-left: 3px solid ${THEME_SEMANTICS.delivered};

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__list-item-toggle {
      display: flex;
      align-items: center;

      cursor: pointer;

      &[data-active='true'] {
        svg {
          transform: rotate(0deg);
        }
      }

      svg {
        margin-left: 8px;

        transform: rotate(180deg);
        transition: transform 0.6s;
      }
    }

    &__list-item-content {
      max-height: 0;

      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      transition: max-height 0.5s;

      &[data-active='true'] {
        max-height: 75vh;
      }
    }

    &__list-item-figure {
      width: 250px;
      margin-top: 8px;
    }

    &__journey-no-data {
      display: grid;
      justify-content: center;
    }
  }
`
