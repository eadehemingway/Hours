import React, { useState } from "react";
import cs from "classnames";
import {  FILLED } from "./hours";


export  function GridCell({ cat, hours_index, startDragging, onDraggedOver, endDragging, isPending}) {
  return (
    <div
    className={cs({
      "text-blue-700 h-12 flex justify-center items-center border": true,
      "bg-red-100 text-white ":
        cat[hours_index] === FILLED && isPending(cat.name, hours_index),
      "bg-red-100 text-white": isPending(cat.name, hours_index),
      "bg-red-500 text-white":
        cat[hours_index] === FILLED && !isPending(cat.name, hours_index),
    })}
    onMouseDown={(e) => {
      e.preventDefault();
      startDragging({ category: cat.name, hour: hours_index });
    }}
    onMouseOver={() =>
      onDraggedOver({ category: cat.name, hour: hours_index + 1 })
    }
    onMouseUp={() =>
      endDragging({ category: cat.name, hour: hours_index + 1 })
    }
  />

  );
}
