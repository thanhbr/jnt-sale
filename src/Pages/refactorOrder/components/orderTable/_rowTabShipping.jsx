import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {Text} from 'common/text'
import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import config from 'config'
import useAlert from 'hook/useAlert'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import useOrderRow from 'Pages/refactorOrder/hooks/useOrderRow'
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
import {formatMoney} from '../../../../util/functionUtil'
import {PrintModal} from './_printModal'
import {DownCODModal} from './_downCODModal'
import { Link } from 'react-router-dom'

export const RowTabShipping = ({data, ...props}) => {
  const {showAlert} = useAlert()
  const {functions} = useOrderFilterForm()
  const {row} = useOrderRow(data)

  const [shouldOpenConfirmDeleteModal, setShouldOpenConfirmDeleteModal] =
    useState(false)
  const [canDelete, setCanDelete] = useState(true)
  const [shouldOpenPrintModal, setShouldOpenPrintModal] = useState(false)
  const [showDetailCOD, setShowDetailCOD] = useState(false)

  const figureValueList = [
    {value: data?.partner_name || '---'},
    {
      tooltip: 'Số tiền cần thu hộ trên đơn hàng',
      value: data?.cod_amount ? formatMoney(data?.cod_amount) : '---',
      count_cod: data?.down_cod_status ?  data?.down_cod_status : 0
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
    {value: data?.dt_created ? fDateTimeSuffix(data.dt_created) : '---'},
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
      const errMessage = Array.isArray(response?.data?.errors?.details) ? 
        response?.data?.errors?.details[0]?.error_message ? response?.data?.errors?.details[0]?.error_message : response?.data?.errors?.details[0]?.message : response?.data?.errors?.details?.message

      showAlert({
        content: errMessage || response?.data?.errors?.message,
        type: 'danger',
      })
    }

    setCanDelete(true)
  }
console.log(!['7','15','21'].includes(data?.shipping_status_id));
  return (
    <StyledRowTabShipping {...props}>
      <div style={{marginBottom: 12}}>
        <Text as="b" fontSize={16} lineHeight={22} style={{marginRight: 8}}>
          Mã vận đơn:
        </Text>
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          fontSize={16}
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
              {item.count_cod > 0 && (
                <Text>
                  <span style={{ color: 'red', fontSize: '12px', cursor: 'pointer' }} onClick={() => setShowDetailCOD(true)}>
                    &darr; {item?.down_cod} 
                  </span>
                  <span style={{padding: '2px 5px',width: '16px',height: '16px',background: '#FF424F',marginLeft:'6px',fontSize: '10px',borderRadius: '8px',color: '#FFFFFF'}} >{item.count_cod}</span>
                </Text>
              )}
            </Text>

          </div>
        ))}
      </div>
      {showDetailCOD && <DownCODModal handleClose={() => setShowDetailCOD(false)} codDetail={data?.down_cod_information}  dataDetail={data}/>}

      <div style={{position: 'absolute', top: 0, right: 0}}>
        {['1'].includes(row.data.shipping_status_id) && (
          <Button
            appearance="secondary"
            size="sm"
            onClick={() => setShouldOpenConfirmDeleteModal(true)}
          >
            Hủy giao hàng
          </Button>
        )}
        {shouldOpenConfirmDeleteModal && (
          <ConfirmDeleteModal
            content="Bạn có chắc chắn muốn hủy giao hàng với đơn đã chọn?"
            isLoading={!canDelete}
            title="Hủy giao hàng"
            onClose={() => setShouldOpenConfirmDeleteModal(false)}
            onSubmit={handleCancelShipping}
          />
        )}

        {!['7','15','21'].includes(data?.shipping_status_id) && <Button
          size="sm"
          disabled={!!!data?.billcode}
          style={{marginLeft: 8}}
          onClick={() => setShouldOpenPrintModal(true)}
        >
          In vận đơn
        </Button>
        }
        {shouldOpenPrintModal && (
          <PrintModal
            data={data}
            onClose={() => setShouldOpenPrintModal(false)}
          />
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
