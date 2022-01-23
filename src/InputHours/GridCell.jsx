import React, { useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED } from "./hours";
import styled from "styled-components";

export  function GridCell({ cat, hours_index, startDragging, onDraggedOver, endDragging, isPending }) {
    const is_already_filled = cat[hours_index] === FILLED;
    const is_pending = isPending(cat.category, hours_index);
    return (
        <Cell is_pending={is_pending} is_already_filled={is_already_filled}

            onMouseDown={(e) => {
                e.preventDefault();
                startDragging({ category: cat.category, hour: hours_index });
            }}
            onMouseOver={() =>
                onDraggedOver({ category: cat.category, hour: hours_index + 1 })
            }
            onMouseUp={() =>
                endDragging({ category: cat.category, hour: hours_index + 1 })
            }
        />

    );
}

const Cell = styled.div`
border: 1px solid;
  height: 100%;
  background: ${({ is_already_filled, is_pending })=>{
        if (is_pending) return "#E15838";
        if (is_already_filled && !is_pending) return "white";
        else return "#E0DACE";
    }}
`;