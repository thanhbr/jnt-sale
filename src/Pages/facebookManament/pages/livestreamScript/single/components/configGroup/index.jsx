import ArrayUtils from 'Pages/facebookManament/utils/array'
import useFacebookLiveStreamScriptSingle from '../../hooks/useFacebookLivestreamScriptSingle'
import {FacebookLivestreamScriptSingle_ConfigGroupItem} from '../_configGroupItem'

export const FacebookLivestreamScriptSingle_ConfigGroup = ({...props}) => {
  const {data, shippingInfoMethods} = useFacebookLiveStreamScriptSingle()
  const {shippingPartner} = data.form

  const configList = ArrayUtils.getQualifiedArray(
    shippingPartner.value?.data?.fields,
  )

  return (
    <div
      style={{
        width: 'calc(100% + 16px)',
        margin: '0 -8px',
        display: 'flex',
        flexWrap: 'wrap',
      }}
      {...props}
    >
      {configList.map((item, i) => (
        <FacebookLivestreamScriptSingle_ConfigGroupItem
          key={item?.field}
          data={item}
          defaultValue={shippingPartner.value?.data?.config[`${item?.field}`]}
          activeValue={shippingPartner.config[`${item?.field}`]}
          isLastMultipleRow={
            configList.length > 4 && i >= configList.length - 2
          }
          style={{
            width: 'calc(50% - 16px)',
            margin: i >= configList.length - 2 ? '0 8px' : '0 8px 16px 8px',
          }}
          onChange={shippingInfoMethods.handleConfigChange}
        />
      ))}
    </div>
  )
}
