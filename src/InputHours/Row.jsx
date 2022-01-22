import React, { useState } from "react";
import cs from "classnames";
import { fillHours, emptyHours, FILLED, UNFILLED, HOURS_ARR } from "./hours";
import { Tab } from "@headlessui/react";
import { GridCell } from "./GridCell";

export  function Row(props) {

  return (
    <React.Fragment key={props.cat.name}>
    <div className="text-xs flex justify-end items-center px-2">
      {props.cat.name}
    </div>
    {HOURS_ARR.map((_, hours_index) => (
      <GridCell
        {...props}
        hours_index={hours_index}
        key={hours_index}
        />
        ))}
  </React.Fragment>


  );
}
