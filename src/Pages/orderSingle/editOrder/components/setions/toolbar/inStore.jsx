import React from 'react';
import {NOTIFICATION_ICONS} from "../../../../../../common/notificationBar/_icons";
import {Text} from "../../../../../../common/text";
import {StyledEditOrderNotificationBar} from "./_styled";
import useOrderSingleShippingInfo from "../../../../hooks/useOrderSingleShippingInfo";

const ToolbarInStore = () => {
  const { data } = useOrderSingleShippingInfo()
  return (
    <>
      {!data.isStorePickUp && (
        <div style={{marginTop: '24px'}}>
          <StyledEditOrderNotificationBar  data-type={"warning"}>
            {NOTIFICATION_ICONS.warning}
            <Text>Hãy kiểm tra và bổ sung thêm thông tin vận chuyển vì trước đó đơn nhận tại cửa hàng sẽ không có thông tin này.</Text>
          </StyledEditOrderNotificationBar>
        </div>
      )}
    </>
  );
};

export default ToolbarInStore;