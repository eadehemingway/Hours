import React, { useEffect, useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED } from "./hours";
import { Tab } from "@headlessui/react";
import styled from "styled-components";
import { TabStyled } from "../shared_styles";

export function TabLabel({ day_label, week_data, i, width, highlight_missing_data }) {

    return (
        <Tab as={React.Fragment}>
            {({ selected }) => (
                     <TabStyled width={width} selected={selected}>
                        <ProgressBar highlight_missing_data={highlight_missing_data} day_data={week_data[i]}/>
                        <Label>{day_label}</Label>
                    </TabStyled>
            )}
        </Tab>

    );
}

function ProgressBar({ day_data , highlight_missing_data }){

    return (
        <MiniProgress>
            {Object.keys(day_data.aggregate).map((hour, i)=>{
                const filled = day_data.aggregate[hour] !== UNFILLED;
                const highlight = !filled && highlight_missing_data;
                return <ProgressHour key={i} filled={filled} highlight={highlight}/>;
            })}
        </MiniProgress>
    );
}

const Label = styled.p`
    position: relative;
    z-index: 1;
`;

const ProgressHour = styled.div`
    height: 100%;
    width: 4%;
    background:${props=> props.filled ? "rgba(0,0,0,0.05)": "rgba(0,0,0,0)"}
`;

const MiniProgress = styled.div`
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 100%;
    display: flex;
`;

