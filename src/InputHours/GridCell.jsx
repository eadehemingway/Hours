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

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function GridCell({ cat, hours_index, startDragging, onDraggedOver, endDragging, isPending }) {
    const is_already_filled = cat[hours_index] === FILLED;
    const is_pending = isPending(cat.category, hours_index);
    let img = imgs[getRandomBetween(0, imgs.length - 1)];
    let rotation = [0, 180][getRandomBetween(0, 1)];
    let scale = [1, -1][getRandomBetween(0, 1)];
    return (
        <Cell is_pending={is_pending} is_already_filled={is_already_filled} texture={img} rotation={rotation} scale={scale} // Set these in the first rendition of the data

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
        transform: rotate(${ props => props.rotation || 0 }deg) scale(${ props => props.scale[0] || 1 }, ${ props => props.scale[1] || 1 });
    }
`;