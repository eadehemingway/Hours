import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { createDay, fillHours, emptyHours, FILLED, UNFILLED, DAYS_ARR } from "./hours";
import Day from "./Day.jsx";
import { TabLabel } from "./TabLabel.jsx";
import { Section, SectionHeader } from "../shared_styles";
import { dummy_categories } from "../Final/dummy_data";
import styled from "styled-components";


export function InputHours({ category_palette, setWeekData }) {
    category_palette = dummy_categories; // for development dummy data
    const [day_data_arr, setDayDataArr] = useState();

    function updateDay(index, new_day_data) {
        const updated = [...day_data_arr];
        updated.splice(index, 1, new_day_data);
        setDayDataArr(updated);
    }

    useEffect(()=>{
        const data_arr = DAYS_ARR.map(() =>  createDay({ categories: category_palette }));
        setDayDataArr(data_arr);

    }, [category_palette]);
    return (

        <Section>
            <SectionHeader>TIMESHEET</SectionHeader>
            {day_data_arr &&
    <>
        <Tab.Group>
            <Tab.List >
                {DAYS_ARR.map((day_label, i) => <TabLabel day_label={day_label} day_data_arr={day_data_arr} i={i} key={i}/>)}
            </Tab.List>

            <Tab.Panels >
                {day_data_arr.map((day_data, i) => (
                    <Tab.Panel key={i}>
                        <Day day_index={i} day_data={day_data} updateDay={updateDay} category_palette={category_palette} />
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
        <button onClick={()=> setWeekData(day_data_arr)}>DONE</button>
    </>}
        </Section>
    );
}

