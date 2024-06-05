import React from "react";

import {PageHeader} from "../../../../layouts/pageHeader";
import {StyledPaymentMethodHeader} from "../~style";
import {PAYMENT_METHOD_BREADCRUMB, PAYMENT_METHOD_HEADER_ACTIONS} from "../../interfaces/~contants";
import useTableBody from "../../hooks/useTableBody";

const Index = () => {
  const { functions } = useTableBody()
  const actions = [functions.refresh, functions.handleOpenPopup]
  return (
    <StyledPaymentMethodHeader>
      <div className={"payment-method-header"}>
        <PageHeader
          actions={PAYMENT_METHOD_HEADER_ACTIONS.map((item, i) => ({
            ...item,
            onClick: actions[i],
          }))}
          breadcrumbLinks={PAYMENT_METHOD_BREADCRUMB}
          breadcrumbTitle={"Quản lý phương thức thanh toán"}
        />
      </div>
    </StyledPaymentMethodHeader>
  );
};

export default Index;