import React from "react";
import {defaultStaticRanges} from "react-date-range/dist/defaultRanges";

const staticRangesLabels = {
  "Today": "Hôm nay",
  "Yesterday": "Hôm qua",
  "This Week": "Tuần này",
  "Last Week": "Tuần trước",
  "This Month": "Tháng này",
  "Last Month": "Tháng trước"
};
function translateRange(dictionary) {
  return (item) =>
    dictionary[item.label] ? { ...item, label: dictionary[item.label] } : item;
}

export const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
export const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']
export const ruStaticRanges = defaultStaticRanges.map(translateRange(staticRangesLabels))