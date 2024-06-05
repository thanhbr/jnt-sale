import { OptionJnt } from './option/_optionJnt'
import { OptionGhtk } from './option/_optionGhtk'
import { OptionGhn } from './option/_optionGhn'
import { OptionViettel } from './option/_optionViettel'
import { OptionSuperShip } from './option/_optionSuperShip'
import { OptionVnpost } from './option/_optionVnPost'
import useFacebookOrderShippingInfo from '../../hooks/useFacebookOrderShippingInfo'

export const ConfigGroup = ({...props}) => {
  const {shippingInfo} = useFacebookOrderShippingInfo()
  const {shippingPartner} = shippingInfo
  return (
    <div
      style={{
        width: 'calc(100% + 16px)',
        paddingBottom: 8,
        display: 'flex',
        flexWrap: 'wrap',
      }}
      {...props}
    >
      {shippingPartner.list.map((partner, i) => (
        <div className={'shipping-partner-collapse-container'} style={{width: '100%'}}>
          {partner.id == 1 && shippingPartner.id == 1 && (
            <OptionJnt partner={partner} position={i} />
          )}
          {partner.id == 2 && shippingPartner.id == 2 && (
            <OptionGhtk
              partner={partner}
              position={i}
              isLast={props?.isLast}
            />
          )}
          {partner.id == 3 && shippingPartner.id == 3 && (
            <OptionGhn partner={partner} position={i} />
          )}
          {partner.id == 4 && shippingPartner.id == 4 && (
            <OptionViettel partner={partner} position={i} />
          )}
          {/*{partner.id == 5 && shippingPartner.id == 5 && (*/}
          {/*  <OptionSuperShip partner={partner} position={i} />*/}
          {/*)}*/}
          {partner.id == 6 && shippingPartner.id == 6 && (
            <OptionVnpost partner={partner} position={i} />
          )}
          {/*{partner.id == 7 && shippingPartner.id == 7 && (*/}
          {/*  <OptionVnpost partner={partner} position={i} />*/}
          {/*)}*/}
          {/*{partner.id == 8 && (*/}
          {/*  <OptionVnpost partner={partner} position={i} />*/}
          {/*)}*/}
          {/*{partner.id == 9 && (*/}
          {/*  <OptionVnpost partner={partner} position={i} />*/}
          {/*)}*/}
          {/*{partner.id == 10 && (*/}
          {/*  <OptionVnpost partner={partner} position={i} />*/}
          {/*)}*/}
          {/*{partner.id == 11 && (*/}
          {/*  <OptionVnpost partner={partner} position={i} />*/}
          {/*)}*/}
        </div>
      ))}
    </div>
  )
}
