import React, { useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED } from "./hours";
import styled from "styled-components";

export  function Aggregate({ ag_data }) {

    return (
        <AggregateCell filled={ag_data !== UNFILLED}/>

    );
}


const AggregateCell = styled.div`
  border: 1px solid black;
  height: 30px;
  background: ${({ filled })=> filled ? "blue" : null }

`;