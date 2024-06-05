import {Button} from 'common/button'
import {Text} from 'common/text'
import useBulkOrderCreateForm from 'Pages/bulkOrder/hooks/useBulkOrderCreateForm'
import {BULK_ORDER_CREATE_CONSTANTS} from 'Pages/bulkOrder/interface/_constants'
import {useState} from 'react'
import {BulkOrderCreateImportFileModal} from '../bulkOrderCreateImportFileModal'
import {
  StyledBulkOrderCreateActionCardItem,
  StyledBulkOrderCreateActionCards,
} from './_styled'

export const BulkOrderCreateActionCards = ({...props}) => {
  const {properties} = useBulkOrderCreateForm()

  const [shouldOpenImportFileModal, setShouldOpenImportFileModal] =
    useState(false)

  const actionList = [
    () =>
      properties.canOpenImportFileModal && setShouldOpenImportFileModal(true),
    null,
  ]
  const disabledList = [!properties.canOpenImportFileModal, false]
  const bodyActions = BULK_ORDER_CREATE_CONSTANTS.bodyActions.map(
    (item, i) => ({
      ...item,
      buttonProps: {
        ...item?.buttonProps,
        disabled: disabledList[i],
        onClick: actionList[i],
      },
    }),
  )

  return (
    <>
      <StyledBulkOrderCreateActionCards {...props}>
        {bodyActions.map(item => (
          <Item key={item.id} data={item} />
        ))}
      </StyledBulkOrderCreateActionCards>
      {shouldOpenImportFileModal && (
        <BulkOrderCreateImportFileModal
          onClose={() => setShouldOpenImportFileModal(false)}
        />
      )}
    </>
  )
}

const Item = ({data, ...props}) => {
  return (
    <StyledBulkOrderCreateActionCardItem {...props}>
      <div className="bulk-order-create-action-card-item__content">
        <Text as="h5" fontSize={18} lineHeight={27}>
          {data?.title || '---'}
        </Text>
        <Text as="p" color="#151624" style={{marginBottom: 16}}>
          {data?.description || '---'}
        </Text>
        <Button {...data?.buttonProps} size="xs">
          {data?.buttonProps?.children || '---'}
        </Button>
      </div>
      <div className="bulk-order-create-action-card-item__banner">
        <img src={data?.banner} alt={data?.title} />
      </div>
    </StyledBulkOrderCreateActionCardItem>
  )
}
