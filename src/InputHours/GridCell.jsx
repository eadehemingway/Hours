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

let imgs = [grain_2, grain_3, grain_4, grain_5, grain_6, grain_7, grain_8, grain_9];

export function GridCell({ cat, hours_index, startDragging, onDraggedOver, endDragging, isPending }) {
    const is_already_filled = cat[hours_index] === FILLED;
    const is_pending = isPending(cat.category, hours_index);
    console.log(cat.scale_x);
    console.log(cat.scale_y);
    return (
        <Cell is_pending={is_pending} is_already_filled={is_already_filled} texture={imgs[cat.image_index]} scale_x={cat.scale_x} scale_y={cat.scale_x}
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
  height: 100%;
  position: relative;
  overflow: hidden;
    ::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background-color: ${({ is_already_filled, is_pending })=>{
            if (is_pending) return "#E15838";
            if (is_already_filled && !is_pending) return "white";
            else return "#E0DACE";
        }};
        background-blend-mode: hard-light;
        background-size: cover;
        background-image: url("${ props => props.texture || "" }");
        transform: scale(${ props => props.scale_x || 1 }, ${ props => props.scale_y || 1 });
    }
`;