import React, { useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED } from "./hours";
import styled from "styled-components";
import grain_2 from '../wood_grain-02.jpg';
import grain_3 from '../wood_grain-03.jpg';
import grain_4 from '../wood_grain-04.jpg';
import grain_5 from '../wood_grain-05.jpg';
import grain_6 from '../wood_grain-06.jpg';
import grain_7 from '../wood_grain-07.jpg';
import grain_8 from '../wood_grain-08.jpg';
import grain_9 from '../wood_grain-09.jpg';

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export  function GridCell({ cat, hours_index, startDragging, onDraggedOver, endDragging, isPending }) {
    const is_already_filled = cat[hours_index] === FILLED;
    const is_pending = isPending(cat.category, hours_index);
    return (
        <Cell is_pending={is_pending} is_already_filled={is_already_filled} texture={grain_1}

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
  background-color: ${({ is_already_filled, is_pending })=>{
        if (is_pending) return "#E15838";
        if (is_already_filled && !is_pending) return "white";
        else return "#E0DACE";
    }};
::before {
    content: url("${ props => props.texture }");
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
}
`;