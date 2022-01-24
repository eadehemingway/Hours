import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { createDay, fillHours, emptyHours, FILLED, UNFILLED, DAYS_ARR } from "./hours";
import Day from "./Day.jsx";
import { TabLabel } from "./TabLabel.jsx";
import { Section, SectionInner, SectionHeader } from "../shared_styles";
import { dummy_categories, dummy_week_data } from "../data";
import styled from "styled-components";
import { drawAxis } from "../axis";
import { Nav } from "../Nav";
import { ROUTES } from "../App";


export function InputHours({ category_palette, setWeekData, week_data }) {
    // week_data = dummy_week_data;
    category_palette = dummy_categories;
    const [category_label_width, setCategoryLabelWidth] = useState(null);
    const [highlight_missing_data, setHighlightMissingData] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => navigate(ROUTES.INPUT_CATEGORIES);

    const $canvas = useRef(null);
    const window_height = window.innerHeight;

    const canvas_width = useMemo(()=>{
        const window_width = document.body.clientWidth;
        return window_width - category_label_width;
    }, [category_label_width]);

    function updateDay(index, new_day_data) {
        const updated = [...week_data];
        updated.splice(index, 1, new_day_data);
        setWeekData(updated);
    }

    useEffect(()=>{
        const data_arr = DAYS_ARR.map(() =>  createDay({ categories: category_palette }));
        setWeekData(data_arr);

    }, [category_palette, setWeekData]);

    useEffect(() => {
        if (!$canvas.current) return;
        if (!category_label_width) return;
        const ctx = $canvas.current.getContext("2d");
        ctx.clearRect(0, 0, (canvas_width * 2) - 160, (window_height - 350) * 2);
        drawAxis(ctx, (canvas_width * 2) - 160, (window_height - 350) * 2, (80 + (category_label_width * 2)), 700);
    }, [category_label_width, canvas_width, window_height]);

    const handleNext = useCallback(()=> {

        // if data missing then highlight missing bits in tabs
        // const aggregates_for_each_day = week_data.map((day_obj)=> {
        //     return Object.values(day_obj.aggregate);
        // });
        // const data_missing = aggregates_for_each_day.flat().includes(UNFILLED);

        // if (data_missing)setHighlightMissingData(true);
        // else  navigate(ROUTES.FINAL_VIZ);
        navigate(ROUTES.FINAL_VIZ);
    }, [week_data, navigate]);

    useEffect(()=>{
        if (highlight_missing_data){
            setTimeout(()=>{
                setHighlightMissingData(false);
            }, 100);
        }
    }, [highlight_missing_data]);
    return (

        <Section>
            <Nav
                show_back={true}
                show_next={true}
                handleBack={handleBack}
                handleNext={handleNext}
            />
            <SectionHeader>TIMESHEET</SectionHeader>
            {category_label_width && <canvas
                ref={$canvas}
                width={`${canvas_width* 2}px`}
                height={`${window_height * 2}px`}
                style={{ pointerEvents: "none", position: "absolute", top: "0px", left: "0px", width: canvas_width + "px", height: window_height + "px" }}>
            </canvas>}
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
                            />)}
                    </Tab.List>

                    <Tab.Panels>
                        {week_data.map((day_data, i) => (
                            <Tab.Panel key={i}>
                                <Day
                                    day_index={i}
                                    day_data={day_data}
                                    updateDay={updateDay}
                                    setCategoryLabelWidth={setCategoryLabelWidth}
                                />
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </SectionInner>}
        </Section>
    );
}


