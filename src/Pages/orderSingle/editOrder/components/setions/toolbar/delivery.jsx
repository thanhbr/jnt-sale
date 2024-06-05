import React from 'react';
import {NOTIFICATION_ICONS} from "../../../../../../common/notificationBar/_icons";
import {Text} from "../../../../../../common/text";
import {StyledEditOrderNotificationBar} from "./_styled";

const ToolbarDelivery = () => {
  return (
    <StyledEditOrderNotificationBar  data-type={"info"}>
      {NOTIFICATION_ICONS.info}
      <Text>Khi đã gửi đơn giao hàng, bạn chỉ có thể thực hiện cập nhật thông tin đơn hàng đối với đơn có đơn vị vận chuyển là J&T Express</Text>
    </StyledEditOrderNotificationBar>
  );
};

export default ToolbarDelivery;