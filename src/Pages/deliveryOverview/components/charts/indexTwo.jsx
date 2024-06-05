import React from 'react';
import BillOfLadingAndCostsStatistics from "./billOfLadingAndCostsStatistics";
import DeliveredOnePartStatistics from "./deliveredOnePartStatistics";
import OverViewGrid from "../overviewGrid/index"
const CharBillOfLadingStatistics = () => {
  return (
    <>
      <OverViewGrid
          grid={true}
          content_1={<BillOfLadingAndCostsStatistics />}
          content_2 = {<DeliveredOnePartStatistics />}
      />
    </>
  );
};

export default CharBillOfLadingStatistics;