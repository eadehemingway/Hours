import React, { useMemo, useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED, random_image_selection } from "./hours";
import styled from "styled-components";
import grain_2 from "../wood_grain-02.jpg";
import grain_3 from "../wood_grain-03.jpg";
import grain_4 from "../wood_grain-04.jpg";
import grain_5 from "../wood_grain-05.jpg";
import grain_6 from "../wood_grain-06.jpg";
import grain_7 from "../wood_grain-07.jpg";
import grain_8 from "../wood_grain-08.jpg";
import grain_9 from "../wood_grain-09.jpg";

let imgs = [grain_2, grain_3, grain_4, grain_5, grain_6, grain_7, grain_8, grain_9];

export function GridCell({ cat, hours_index, startDragging, onDraggedOver, endDragging, isPending, color }) {
    const is_already_filled = cat[hours_index] === FILLED;
    const is_pending = isPending(cat.category, hours_index);

    const image_index = useMemo(()=>{
        return Math.round(Math.random() * 7);
    }, []);

    const scale_values = [-1, 1];
    const scale_y = useMemo(()=>{
        const y_index = Math.round(Math.random());
        return scale_values[y_index];
    },[scale_values]);
    const scale_x = useMemo(()=>{
        const x_index = Math.round(Math.random());
        return scale_values[x_index];
    },[scale_values]);


    const image = imgs[image_index];
    return (
        <Cell color={color} is_pending={is_pending} is_already_filled={is_already_filled} texture={image} scale_x={cat.scale_x} scale_y={cat.scale_x}
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
        background-color: ${({ is_already_filled, is_pending, color })=>{
        if (is_pending) return color + "1)";
        if (is_already_filled && !is_pending) return color + "1)";
        else return "rgba(0,0,0,0.05)";
    }};
        background-blend-mode: overlay;
        background-size: cover;
        background-image: ${({ is_already_filled, is_pending, texture })=>{
            if (is_pending) return `none`;
            if (is_already_filled && !is_pending) return `url("${texture}")`;
            else return "none";
        }};
        transform: scale(${ props => props.scale_x || 1 }, ${ props => props.scale_y || 1 });
    }
`;