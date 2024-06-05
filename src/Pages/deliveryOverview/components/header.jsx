import React  from 'react';
import {PageHeader} from "../../../layouts/pageHeader";
import {DELIVERY_OVERVIEW_BREADCRUMB} from "../interfaces/~contants";
import {SCRIPT} from "../interfaces/~scripts";

const Header = () => {
  return (
    <div>
      <PageHeader
        breadcrumbLinks={DELIVERY_OVERVIEW_BREADCRUMB}
        breadcrumbTitle={SCRIPT.BREADCRUMB.TITLE}
      />
    </div>
  );
};

export default Header;