import { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import { createDay, fillHours, emptyHours, FILLED, UNFILLED, DAYS_ARR } from "./hours";
import Day from "./Day.jsx";
import { TabLabel } from "./TabLabel.jsx";
import { Section, SectionInner, SectionHeader } from "../shared_styles";
import { dummy_categories } from "../Final/dummy_data";
import styled from "styled-components";
import { drawAxis } from "../axis";


export function InputHours({ category_palette, setWeekData, week_data }) {
    // category_palette = dummy_categories; // for development dummy data
    const [highlight_missing_data, setHighlightMissingData] = useState(false);
    const $canvas = useRef(null);
    const window_width = document.body.clientWidth;
    const window_height = window.innerHeight;

    function updateDay(index, new_day_data) {
        const updated = [...week_data];
        updated.splice(index, 1, new_day_data);
        setWeekData(updated);
    }

    useEffect(()=>{
        const data_arr = DAYS_ARR.map(() =>  createDay({ categories: category_palette }));
        setWeekData(data_arr);

    }, [category_palette]);

    useEffect(() => {
        if (!$canvas) return;
        const ctx = $canvas.current.getContext("2d");
        ctx.clearRect(0, 0, window_width, window_height);
        drawAxis(ctx, (window_width * 2) - 160, (window_height - 350) * 2, 80, 700);
    }, []);

    function handleNext(){
        // if data all filled in then go to next page

        // if data missing then highlight missing bits in tabs
        const aggregates_for_each_day = week_data.map((day_obj)=> {
            return Object.values(day_obj.aggregate);
        });
        const data_missing = aggregates_for_each_day.flat().includes(UNFILLED);

        if (data_missing){
            // highlight missing bits in tabs
            setHighlightMissingData(true);
        }
    }

    return (

        <Section>
            <SectionHeader>TIMESHEET</SectionHeader>
            <canvas ref={$canvas} width={`${window_width * 2}px`} height={`${window_height * 2}px`} style={{ pointerEvents: "none", position: "absolute", top: "0px", left: "0px", width: window_width + "px", height: window_height + "px" }}></canvas>
            {week_data &&
    <SectionInner>
        <Tab.Group>
            <Tab.List style={{ paddingBottom: "40px" }}>
                {DAYS_ARR.map((day_label, i) =>
                    <TabLabel
                        width={`calc(100% / ${DAYS_ARR.length})`}
                        day_label={day_label}
                        week_data={week_data}
                        i={i}
                        key={i}
                        highlight_missing_data={highlight_missing_data}
                        setHighlightMissingData={setHighlightMissingData}
                    />)}
            </Tab.List>

            <Tab.Panels>
                {week_data.map((day_data, i) => (
                    <Tab.Panel key={i}>
                        <Day day_index={i} day_data={day_data} updateDay={updateDay} category_palette={category_palette} />
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
        <Button onClick={handleNext}>NEXT</Button>
    </SectionInner>}
        </Section>
    );
}


const Button = styled.button`
font-size: 20px;
border: 1px solid;
margin: 50px;
padding: 50px;
background: none;
cursor: pointer

`;