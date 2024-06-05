import React, {useEffect} from 'react';
import {Text} from "../../../common/text";
import {Switch} from "../../customer/components/switch";
import {PRODUCT_ICONS} from "../interfaces/~icon";
import {DndCol} from "../../../common/dndCol";
import Barcode from "react-barcode";
import {fNumber} from "../../../util/formatNumber";
import usePrintBarcode from "../hooks/usePrintBarcode";
import {useTranslation} from "react-i18next";

const SettingTemplate = () => {
  const { t } = useTranslation()
  const {value, functions} = usePrintBarcode()

  useEffect(() => {
    functions.handleOriginFetch()
  }, [])
  const productDefault = value?.productList[0]

  return (
    <>
      <DndCol
        initial={value?.indexBarcode?.map(item => ({
          id: item?.id,
          content:  (
                    <div style={{display: 'flex', marginBottom: 24, cursor: 'all-scroll'}}>
                      {PRODUCT_ICONS?.dndColumn}
                      <div style={{display: 'flex', margin: '2px 0 0 12px'}}>
                        <Switch checked={+item?.active === 1}
                                disabled={+item?.id === 3}
                                onChange={() => functions?.onChangeStatus(item)}
                        />
                        <Text style={{marginLeft: 8}}>{t(item?.name)}</Text>
                      </div>
                    </div>
          ),
        }))}
        onChange={functions?.onChangeIndex}
      />
      <div style={{textAlign: 'center', border: '1px solid #E2EAF8', padding: '10px 12px 11px 12px', borderRadius: 6}}>
        {value?.indexBarcode?.map((item, i) => {
          if(+item?.id === 1 && +item?.active === 1) {
            return <div key={i}><Text fontSize={15} fontWeight={600}>{value?.shopInfo?.store_name}</Text></div>
          }
          if(+item?.id === 2 && +item?.active === 1) {
            return <div key={i}><Text fontSize={15} fontWeight={400}>{productDefault?.product_name}</Text></div>
          }
          if(+item?.id === 3 && +item?.active === 1) {
            return <Barcode key={i}
                            value={productDefault?.barcode}
                            width={2}
                            height={48}
                    />
          }
          if(+item?.id === 4 && +item?.active === 1) {
            return <div key={i}><Text as={'p'} fontSize={15} fontWeight={600} style={{margin: '0 auto'}}>
                      {fNumber(productDefault?.price?.toString()?.replace(/[^0-9]/g, ''))} đ
                  </Text></div>
          }
          return ''
        })}

      </div>
    </>
  );
};

export default SettingTemplate