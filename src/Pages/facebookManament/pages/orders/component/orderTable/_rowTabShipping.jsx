import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import config from 'config'
import useAlert from 'hook/useAlert'
import useOrderRow from '../../hooks/useOrderRow'
import {
  ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_FIGURE_LIST,
  ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS,
  ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS,
} from 'Pages/refactorOrder/interfaces/_constants'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import {useState} from 'react'
import styled from 'styled-components'
import {fDateTimeSuffix} from 'util/formatTime'
import {ConfirmDeleteModal} from './_confirmDeleteModal'
import {formatMoney} from 'util/functionUtil'
import {PrintModal} from './_printModal'
import { Link } from 'react-router-dom'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";

export const RowTabShipping = ({data, ...props}) => {
  const {showAlert} = useAlert()
  const {functions} = useFacebookFilterForm()
  const {row} = useOrderRow(data)

  const [shouldOpenConfirmDeleteModal, setShouldOpenConfirmDeleteModal] =
    useState(false)
  const [canDelete, setCanDelete] = useState(true)
  const [shouldOpenPrintModal, setShouldOpenPrintModal] = useState(false)

  const figureValueList = [

    {value: data?.dt_created ? fDateTimeSuffix(data.dt_created) : '---'},
    {
      tooltip: 'Số tiền cần thu hộ trên đơn hàng',
      value: data?.cod_amount ? formatMoney(data?.cod_amount) : '---',
    },
    {
      value: +data?.shipping_status_id !== 21 ?
        (data?.request_goods
          ? ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS.requestGoods[`_${data.request_goods}`]
          : '---') :
        (data?.draft_data?.request_goods
          ? ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS.requestGoods[`_${data?.draft_data?.request_goods}`]
          : '---'),
    },
    {
      value: data?.payment_method
        ? ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS[
          data.payment_method
          ]
        : '---',
    },
    {
      value: +data?.shipping_status_id !== 21 ?
        (data?.is_insurrance === '1'
            ? formatMoney(data?.insurrance_value)
            : 'Không'
        ) :
        (+data?.insurrance !== 0
            ? formatMoney(data?.insurrance)
            : 'Không'),
    },
    {
      value:
        +data?.shipping_status_id !== 21 ? (
          data?.recipient_view || data?.note ? (
            <>
              <div>
                {ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS.recipientView[`_${data.recipient_view}`]}
              </div>
              <div>{data.note}</div>
            </>
          ) : '---'
        ) : (
          data?.draft_data?.recipient_view || data?.draft_data?.note ? (
            <>
              <div>
                {ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_REQUIREMENTS.recipientView[`_${data?.draft_data?.recipient_view}`]}
              </div>
              <div>{data?.draft_data.note}</div>
            </>
          ) : '---'
        ),
    },
    {
      value: data?.payment_method
        ? ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_PAYMENT_METHODS[
          data.payment_method
          ]
        : '---',
    },
  ]

  const figureList = ORDER_TABLE_ROW_EXTRA_TAB_SHIPPING_FIGURE_LIST.map(
    (item, i) => ({...item, ...figureValueList[i]}),
  )

  const handleCancelShipping = async () => {
    setCanDelete(false)
    if (!canDelete) return

    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/update_status`,
      JSON.stringify({
        order_ids: [data.id],
        status: 7,
      }),
    )

    if (response?.data?.success) {
      showAlert({content: 'Cập nhật trạng thái thành công', type: 'success'})
      functions.fetchOrderWithCurrentFilter()
      row.onFetchDetail()
      setShouldOpenConfirmDeleteModal(false)
    } else {
      showAlert({
        content:
          response?.data?.errors?.details[0]?.message ||
          'Cập nhật trạng thái thất bại',
        type: 'danger',
      })
    }

    setCanDelete(true)
  }

  return (
    <StyledRowTabShipping {...props}>
      <div style={{marginBottom: 12}}>
        <Text as="b" fontSize={15} lineHeight={22} style={{marginRight: 8}}>
          Mã vận đơn:
        </Text>
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          fontSize={15}
          lineHeight={22}
          style={{marginRight: 8, cursor: 'pointer'}}
        >
            <Link to={`/delivery/management?search=${data?.billcode}`} target="_blank" className='tab-detail-order__link-hover'>{data?.billcode || '---'}</Link>
        </Text>
        {!!data?.billcode && (
          <Tooltip title="Sao chép">
            <span
              style={{
                display: 'inline-block',
                transform: 'translateY(2px)',
                cursor: 'pointer',
              }}
              onClick={row.onCopyOrderCode}
            >
              {ORDER_ICONS.copy03_x}
            </span>
          </Tooltip>
        )}
      </div>
      <div className="row-tab-shipping__figure">
        {figureList.map(item => (
          <div key={item.id} className="row-tab-shipping__content-group">
            <Text as="p" color="#7C88A6">
              {item.name}
              {!!item?.tooltip && (
                <Tooltip title={item.tooltip}>
                  <i
                    style={{
                      margin: '0 4px',
                      display: 'inline-block',
                      transform: 'translateY(2px)',
                      cursor: 'pointer',
                    }}
                  >
                    {' '}
                    {ORDER_ICONS.question}{' '}
                  </i>
                </Tooltip>
              )}
            </Text>
            <Text as={item?.href && 'a'} to={item?.href} color={item.color}>
              {item.value}
            </Text>
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', top: 0, right: 0}}>
        {['1'].includes(row.data.shipping_status_id) && (
          <>
            <Button
              appearance="secondary"
              size="sm"
              onClick={() => setShouldOpenConfirmDeleteModal(true)}
              style={{width:'117px',padding:'0 12px'}}
            >
              Hủy giao hàng
            </Button>
            {shouldOpenConfirmDeleteModal && (
              <ConfirmDeleteModal
                content="Bạn có chắc chắn muốn hủy giao hàng với đơn đã chọn?"
                isLoading={!canDelete}
                title="Hủy giao hàng"
                onClose={() => setShouldOpenConfirmDeleteModal(false)}
                onSubmit={handleCancelShipping}
              />
            )}
            <Button
              size="sm"
              disabled={!!!data?.billcode}
              style={{marginLeft: 8,width:'96px',padding:'0 12px'}}
              onClick={() => setShouldOpenPrintModal(true)}
            >
              In vận đơn
            </Button>
            {shouldOpenPrintModal && (
              <PrintModal
                data={data}
                onClose={() => setShouldOpenPrintModal(false)}
              />
            )}
          </>
        )}
      </div>
    </StyledRowTabShipping>
  )
}

const StyledRowTabShipping = styled.div`
  position: relative;

  .row-tab-shipping {
    &__figure {
      width: calc(100% + 24px);
      margin: 0 -12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__content-group {
      width: calc(100% / 3 - 24px);
      margin: 0 12px 12px 12px;
    }
  }
`
