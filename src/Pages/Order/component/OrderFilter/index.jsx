import React, {useContext} from 'react';
import {ORDER_PAGE} from "../../../../Component/Icons";
import {SCRIPT} from "../../_script";
import './index.scss'
import {Button} from "../../../../common/button";

const Index = ({ ...props }) => {
  return (
    <>
      <div className={'order-filter__advance'}>
        <Button
          className={"order-filter__btn"}
          appearance={'secondary'}
          onClick={() => props.handleShow()}

        >
          {ORDER_PAGE.filter_green}
          <span>{SCRIPT.T_ORDER_FILTER}</span>
        </Button>
        <span className={'order-filter__advance-count'}>{'1'}</span>
      </div>
    </>
  );
};

export default Index;