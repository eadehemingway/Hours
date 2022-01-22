import React, { useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED, HOURS_ARR } from "./hours";
import { Tab } from "@headlessui/react";
import { GridCell } from "./GridCell";
import styled from "styled-components";

export  function Row(props) {

  return (
    <React.Fragment key={props.cat.name}>
    <CategoryLabel>
      {props.cat.name}
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
padding-right: 10px;

`