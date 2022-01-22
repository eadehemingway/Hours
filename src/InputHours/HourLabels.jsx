import React, { useState } from "react";
import styled from "styled-components";


export  function HourLabels({ index }) {

    return (
        <HourLabel >
            {index % 12 ? index % 12 : 12}
            <span>{index > 11 ? "pm" : "am"}</span>
        </HourLabel>

    );
}


const HourLabel = styled.h2`
text-align: center;
padding-bottom: 10px;
margin-top: 20px;
border-radius: 4px;
font-size: 10px;

`;