import React from 'react';
import DeliveryStatistics from "./deliveryStatistics";
import RateByStatusStatistics from "./rateByStatusStatistics";
import OverViewGrid from "../overviewGrid/index"
export const ChartsDeliveryOverview = () => {
  return (
    <>
      <OverViewGrid
        content_1={<DeliveryStatistics />}
        content_2 = {<RateByStatusStatistics />}
      />
    </>
  );
}