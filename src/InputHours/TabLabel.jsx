import React, { useState } from "react";
import { fillHours, emptyHours, FILLED, UNFILLED } from "./hours";
import { Tab } from "@headlessui/react";
import styled from "styled-components";

export  function TabLabel({ day_label, day_data_arr, i}) {

  return (
    <TabWrapper
    key={day_label}
    className={({ selected }) => {
    return selected ? "no-border-bottom" : 'border-bottom'
    }
    }
  >
    <TextWrapper>
      <div>{day_label}</div>

      <IncompleteLabel >
        {Object.values(day_data_arr[i].aggregate).some(
          (agg) => agg === UNFILLED
        )
          ? "(incomplete)"
          : ""}
      </IncompleteLabel>
    </TextWrapper>
  </TabWrapper>

  );
}


const IncompleteLabel = styled.div`
  font-size: 0.5rem;
  color: red;
  margin-bottom: 10px;
`

const TextWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const TabWrapper= styled(Tab)`
border-top: 2px solid;
border-left: 2px solid;
border-right: 2px solid;


`