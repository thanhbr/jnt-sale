import React from 'react';
import EmptyTable from "./~emptyTable";
import SkeletonCapitalAdjustment from "./~skeletonCapitalAdjustment";
import TrCapitalAdjustment from "./trCapitalAdjustment";
import useTBodyCapitalAdjustment from "../../hooks/useTBodyCapitalAdjustment";
import ConfirmAdjustmentPrice from "../modal/confirmAdjustmentPrice";
import CancelAdjustmentPrice from "../modal/cancelAdjustmentPrice";

const TbodyCapitalAdjustment = () => {
  const {display, modalCancelBill, modalApproveBill, method} = useTBodyCapitalAdjustment()
  const displayList = display

  return (
    <>
      {displayList?.loading ? (
        <SkeletonCapitalAdjustment numb={20} />
      ) : displayList?.list?.length > 0 ?
        (<>
          {displayList?.list?.map(item =>  <TrCapitalAdjustment key={item.id} data={item} />)}
        </>) : <EmptyTable />
      }

      <CancelAdjustmentPrice
        modalCancelBill={modalCancelBill}
        onApprove={method.onApproveCancelBill}
        onCancel={method.onCancelBill}
      />
      <ConfirmAdjustmentPrice
        modalApprovelBill={modalApproveBill}
        onApprove={method.onApproveBill}
        onCancel={method.onCloseBill}
      />
    </>
  )
}

export default TbodyCapitalAdjustment;