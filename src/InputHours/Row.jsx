import React, { useEffect, useRef, useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED, HOURS_ARR } from "./hours";
import { Tab } from "@headlessui/react";
import { GridCell } from "./GridCell";
import styled from "styled-components";

export  function Row(props) {
    let $category_label = useRef(null);

    useEffect(()=>{
        if (!$category_label.current) return null;
        const category_label_width = $category_label.current.clientWidth;
        props.setCategoryLabelWidth(category_label_width); // this is so that we can work out how big the canvas for the axes is
    }, []);

    return (
        <React.Fragment key={props.cat.category}>
            <CategoryLabel ref={$category_label}>
                {props.cat.category}
            </CategoryLabel>
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

const CategoryLabel = styled.h3`
font-size: 1rem;
display: flex;
justify-content: end;
align-items: center;
padding-right: 20px;

`;