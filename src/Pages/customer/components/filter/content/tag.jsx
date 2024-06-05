import React, {useContext} from 'react';
import {OrderTag} from "../../../../refactorOrder/components/orderTags/_tag";
import {CustomerContext} from "../../../index";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {Text} from "../../../../../common/text";
import useCustomerFilterForm from "../../hooks/useCustomerFilterForm";

const Tag = () => {
  const {state, dispatch} = useContext(CustomerContext)
  const {functions} = useCustomerFilterForm({state, dispatch})
  const {groupCustomer} = state
  const shouldShowResetAll = [
    !!state?.tag?.group?.value,
    !!state?.tag?.city?.value,
    !!state?.tag?.district?.value,
    !!state?.tag?.ward?.value,
  ].includes(true)

  return (
    <div className={"customer-filter__tag"}>
      {/*{state?.filter?.keyword?.value !== '' ? (*/}
      {/*    <OrderTag onDelete={() => functions.handleDelete('keyword')}>*/}
      {/*      {state?.filter?.keyword?.label}: {state?.filter?.keyword?.name}*/}
      {/*    </OrderTag>*/}
      {/*  ) : ""}*/}
      {state?.tag?.group?.value !== '' ? (
        <OrderTag onDelete={() => functions.handleDelete('group')}>
          {state?.tag?.group?.label}: {state?.tag?.group?.name || groupCustomer.find(x => x.id === state?.tag?.group?.value)?.name || ''}
        </OrderTag>
      ) : ""}
      {state?.tag?.city?.value !== '' ? (
        <OrderTag onDelete={() => functions.handleDelete('city')}>
          {state?.tag?.city?.label}: {state?.tag?.city?.name}
        </OrderTag>
      ) : ""}
      {state?.tag?.district?.value !== '' ? (
        <OrderTag onDelete={() => functions.handleDelete('district')}>
          {state?.tag?.district?.label}: {state?.tag?.district?.name}
        </OrderTag>
      ) : ""}
      {state?.tag?.ward?.value !== '' ? (
        <OrderTag onDelete={() => functions.handleDelete('ward')}>
          {state?.tag?.ward?.label}: {state?.tag?.ward?.name}
        </OrderTag>
      ) : ""}
      {shouldShowResetAll && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={functions.handleDeleteAll}
        >
          Đặt lại mặc định
        </Text>
      )}
    </div>
  );
};

export default Tag;