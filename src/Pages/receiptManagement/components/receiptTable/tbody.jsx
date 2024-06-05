import React from 'react';
import ReceiptEmpty from "./empty";
import SkelentonReceipt from "./skelenton";
import useReceiptTbody from "../../hooks/useReceiptTbody";
import ReceiptTr from "./receiptTr";
import EditDescriptionReceipt from "../modal/editDescriptionReceipt";
import CancelReceipt from "../modal/cancelReceipt";

const TbodyReceipt = () => {
  const {displayList, modalDesc, methods, modalCancel} = useReceiptTbody()

  return (
    <>
      {displayList?.loading ? (
        <SkelentonReceipt />
      ) : displayList?.list?.length > 0 ? (
        <>
          {displayList?.list?.map(item => <ReceiptTr key={item.id} data={item}/> )}
        </>
      ) : <ReceiptEmpty />}

      <EditDescriptionReceipt data={modalDesc}
                              onClose={methods?.handleToggleEditModal}
                              onNoteChange={methods?.handleChangeNote}
                              onUpdateDesc={methods?.handleUpdateNote}
      />
      <CancelReceipt modal={modalCancel}
                     onClose={methods?.handleToggleCancelModal}
                     submit={methods?.submitCancelModal}
      />
    </>
  )
}

export default TbodyReceipt;