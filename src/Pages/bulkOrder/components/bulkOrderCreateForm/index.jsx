import useBulkOrderCreateForm from 'Pages/bulkOrder/hooks/useBulkOrderCreateForm'
import {getArrayFromValue} from 'Pages/bulkOrder/utils/array'
import {useEffect} from 'react'
import {BulkOrderCreateFormOptionGroup} from './components/bulkOrderCreateFormOptionGroup'
import {BulkOrderCreateFormShippingPoint} from './components/bulkOrderCreateFormShippingPoint'
import {StyledBulkOrderCreateForm} from './_styled'
import { BulkOrderCreateFormOrderSource } from './components/bulkOrderCreateFormOrderSource'

export const BulkOrderCreateForm = ({...props}) => {
  const {shippingPartner, methods} = useBulkOrderCreateForm()
  const optionFormData = shippingPartner.data.value?.data

  useEffect(() => {
    methods.fetchOrigin()
  }, [])

  return (
    <StyledBulkOrderCreateForm {...props}>
      <div className="bulk-order-create-form__group">
        <div className="bulk-order-create-form__group-item">
          <BulkOrderCreateFormShippingPoint />
        </div>
        <div className="bulk-order-create-form__group-item">
          <BulkOrderCreateFormOrderSource />
        </div>
      </div>
      {!!optionFormData && (
        <div className="bulk-order-create-form__group">
          {getArrayFromValue(optionFormData?.fields).map(item => (
            <div
              key={item?.field}
              className="bulk-order-create-form__group-item"
            >
              <BulkOrderCreateFormOptionGroup
                data={item}
                defaultValue={optionFormData?.config[item?.field]}
              />
            </div>
          ))}
        </div>
      )}
    </StyledBulkOrderCreateForm>
  )
}
