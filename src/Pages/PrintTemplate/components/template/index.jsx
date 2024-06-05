import React, {useContext} from 'react';
import {PrintTemplateContext} from "../../provider/~context";
import Default from "./default"
import Edit from "./edit"
import CKEditor from 'ckeditor4-react-advanced';

const Index = () => {
  const {pageState} = useContext(PrintTemplateContext)

  return (
    <>
      <div style={{display: 'none'}}>
        <CKEditor/>
      </div>
      {!pageState.editPrint ? (<Default />): (<Edit /> )}
    </>
  );
};

export default Index;