import React, { useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED } from "./hours";
import { Tab } from "@headlessui/react";
import styled from "styled-components";
import { SelectedTab, UnselectedTab } from "../shared_styles";

export  function TabLabel({ day_label, day_data_arr, i }) {

    return (
        <Tab as={React.Fragment}>
            {({ selected }) => (
                selected ? (
                    <SelectedTab>
                        {day_label}
                        <Incomplete day_data={day_data_arr[i]}/>
                    </SelectedTab>)

                    : <UnselectedTab>
                        {day_label}
                        <Incomplete day_data={day_data_arr[i]}/>
                    </UnselectedTab>
            )}
        </Tab>

    );
}

function Incomplete({ day_data }){
    const is_incomplete = Object.values(day_data.aggregate).some((agg) => agg === UNFILLED);
    return <IncompleteLabel > {is_incomplete ? "(incomplete)" : ""} </IncompleteLabel>;
}


const IncompleteLabel = styled.div`
  font-size: 0.5rem;
  color: red;
  margin-bottom: 10px;
`;

