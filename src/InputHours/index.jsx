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


export function InputHours({ category_palette, setWeekData, week_data, colors }) {
    // week_data = dummy_week_data;
    category_palette = dummy_categories;
    const [category_label_width, setCategoryLabelWidth] = useState(null);
    const [highlight_missing_data, setHighlightMissingData] = useState(false);
    const navigate = useNavigate();
    const handleBack = () => navigate(ROUTES.INPUT_CATEGORIES);
    const canvas_width = document.body.clientWidth;
    const canvas_height = window.innerHeight;
    const section_padding = 100;
    const table_height = 400;
    const axis_height = table_height;
    const axis_top = canvas_height - (section_padding + table_height);

    const $canvas = useRef(null);

    const axis_width = useMemo(()=>{
        return canvas_width - (category_label_width + (section_padding * 2));
    }, [category_label_width]);

    const axis_left = useMemo(()=>{
        return category_label_width + section_padding;
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
        ctx.scale(2, 2);
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        drawAxis(ctx, axis_width, axis_height, axis_left, axis_top);
    }, [category_label_width, canvas_width, canvas_height]);

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
                width={`${canvas_width * 2}px`}
                height={`${canvas_height * 2}px`}
                style={{ zIndex: "3", pointerEvents: "none", position: "absolute", top: "0px", left: "0px", width: canvas_width + "px", height: canvas_height + "px" }}>
            </canvas>}
            {week_data &&
            <SectionInner style={{ position: "absolute", bottom: "0px", left: "0px" }}>
                <Tab.Group>
                    <Tab.List style={{ paddingBottom: "100px" }}>
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


