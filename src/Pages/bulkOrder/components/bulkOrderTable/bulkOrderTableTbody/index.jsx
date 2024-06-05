import {Skeleton} from '@mui/material'
import {sendRequestAuth} from 'api/api'
import {Button} from 'common/button'
import {formatDatetime} from 'common/form/datePicker/_functions'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import config from 'config'
import useAlert from 'hook/useAlert'
import {Td} from 'layouts/tableLayout/_td'
import useBulkOrder from 'Pages/bulkOrder/hooks/useBulkOrder'
import useBulkOrderFilter from 'Pages/bulkOrder/hooks/useBulkOrderFilter'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {BulkOrderEmpty} from '../../bulkOrderEmpty'
import {StyledBulkOrderTableTbodyTr} from './_styled'

export const BulkOrderTableTbody = () => {
  const {table} = useBulkOrder()
  const {properties} = useBulkOrderFilter()

  if (table.data.display.loading)
    return (
      <>
        {Array.from(Array(20), (e, i) => (
          <Placeholder key={i} />
        ))}
      </>
    )

  if (table.data.display.list.length <= 0)
    return (
      <BulkOrderEmpty>
        <Text as="b" color="#7C88A6">
          {properties.isSearching
            ? 'Không tìm thấy dữ liệu phù hợp'
            : 'Bạn chưa từng thực hiện lên đơn hàng loạt?'}
        </Text>
        {!properties.isSearching && (
          <Button
            href="/tools/bulks-order/create"
            icon={BULK_ORDER_ICONS.filePlus02}
            style={{marginTop: 12}}
          >
            Thực hiện lên đơn hàng loạt
          </Button>
        )}
      </BulkOrderEmpty>
    )

  return (
    <>
      {table.data.display.list.map(item => (
        <Row key={item.id} data={item} />
      ))}
    </>
  )
}

const Row = ({data, ...props}) => {
  const {showAlert} = useAlert()

  const handleGetStatusColor = () => {
    const proportion = Number(data?.total_sent || 0) / Number(data?.total_rows)
    if (!proportion || proportion === 0) return THEME_SEMANTICS.failed
    if (proportion >= 1) return THEME_SEMANTICS.delivered
    return THEME_SEMANTICS.preparing
  }

  const handleExport = async id => {
    if (handleGetStatusColor() === THEME_SEMANTICS.delivered) {
      showAlert({
        type: 'info',
        content:
          'Không thể tải xuống file danh sách chưa lên đơn vì bạn đã hoàn tất lên đơn hàng loạt',
      })
      return
    }

    if (!id) return

    const response = await sendRequestAuth(
      'post',
      `${config.API}/tool/bulks/export`,
      JSON.stringify({file_id: id}),
    )

    if (!!response?.data?.success && !!response?.data?.data?.url) {
      const link = document.createElement('a')
      link.href = response.data.data.url
      link.download = data?.file_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <StyledBulkOrderTableTbodyTr {...props}>
      <Td className="bulk-order-table-tbody-tr__td">
        <div style={{width: '100%'}}>
          <Text
            className="common-ellipsis"
            title={data?.file_name}
            color={THEME_SEMANTICS.delivering}
            fontWeight={600}
            style={{display: 'block', cursor: 'pointer'}}
            onClick={() => handleExport(data?.id)}
          >
            {data?.file_name || '---'}
          </Text>
          <Text color="#7C88A6" fontSize={13} lineHeight={18}>
            <Tooltip placement="bottom-start" title="Ngày tải file lên đơn">
              <span
                style={{
                  marginRight: 4,
                  display: 'inline-block',
                  transform: 'translateY(3px)',
                  cursor: 'pointer',
                }}
              >
                {BULK_ORDER_ICONS.clock}
              </span>
            </Tooltip>

            {data?.created_at ? formatDatetime(data.created_at) : '---'}
          </Text>
        </div>
      </Td>
      {/*<Td className="bulk-order-table-tbody-tr__td">*/}
      {/*  <Text>{data?.partner_name || '---'}</Text>*/}
      {/*</Td>*/}
      <Td className="bulk-order-table-tbody-tr__td">
        <Text>{data?.user_name || '---'}</Text>
      </Td>
      <Td className="bulk-order-table-tbody-tr__td">
        <Text color={handleGetStatusColor()}>
          {data?.total_sent || 0}/{data?.total_rows || 0}
        </Text>
      </Td>
      <Td className="bulk-order-table-tbody-tr__td">
        <div
          className="bulk-order-table-tbody-tr__action-icon"
          data-state="default"
        >
          {BULK_ORDER_ICONS.manipulation}
        </div>
        <div
          className="bulk-order-table-tbody-tr__action-icon"
          data-state="hover"
        >
          <Text as="a" href={data?.id ? `/tools/bulks-order/${data.id}` : '#'}>
            {BULK_ORDER_ICONS.edit05}
          </Text>
        </div>
      </Td>
    </StyledBulkOrderTableTbodyTr>
  )
}

const Placeholder = ({...props}) => {
  return (
    <StyledBulkOrderTableTbodyTr {...props}>
      {Array.from(Array(4), (e, i) => (
        <Td key={i} className="bulk-order-table-tbody-tr__td">
          <Skeleton
            sx={{
              width: '100%',
              height: 33,
              background:
                'linear-gradient(0deg, rgba(244, 247, 252, 0.98), rgba(244, 247, 252, 0.98)), #00081D;',
            }}
          />
        </Td>
      ))}
    </StyledBulkOrderTableTbodyTr>
  )
}
