import React, { useState } from "react";
import cs from "classnames";
import { UNFILLED } from "./hours";

export  function Aggregate({ ag_data}) {

  return (
    <div
    className={cs({
      "text-red-700 h-12 flex justify-center items-center border mt-10": true,
      "bg-blue-500 text-white": ag_data !== UNFILLED,
    })}
  />

  );
}
