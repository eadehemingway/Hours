import React, { useState } from "react";
import cs from "classnames";
import { fillHours, emptyHours, FILLED, UNFILLED } from "./hours";
import { Tab } from "@headlessui/react";

export  function TabLabel({ day_label, day_data_arr, i}) {

  return (
    <Tab
    key={day_label}
    className={({ selected }) =>
      cs({
        "border-t border-r border-l rounded-t-lg px-3 py-1": true,
        "border-b": !selected,
      })
    }
  >
    <div className="flex flex-col items-center">
      <div>{day_label}</div>

      <div className="h-4 text-xs text-red-500 mb-1">
        {Object.values(day_data_arr[i].aggregate).some(
          (agg) => agg === UNFILLED
        )
          ? "(incomplete)"
          : ""}
      </div>
    </div>
  </Tab>

  );
}
