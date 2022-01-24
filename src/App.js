import { Description } from "./Description";
import React, { useState, useEffect } from "react";
import { Homepage } from "./Homepage";
import { InputCategories } from "./InputCategories";
import { InputHours } from "./InputHours";
import { FinalViz } from "./Final";
import { Nav } from "./Nav";
import { createDay, fillHours, emptyHours, FILLED, UNFILLED, DAYS_ARR } from "./InputHours/hours";

import "./App.css";
import { PAGES } from "./data";


function App() {
    const [category_palette, setCategoryPalette] = useState([]);
    const [week_data, setWeekData] = useState();
    const [current_page_index, setCurrentPageIndex] = useState(0);
    const [highlight_missing_data, setHighlightMissingData] = useState(false); // for input_hours page, had to lift it so we could update when pressing next

    const PAGE_COMPONENTS = {
        [PAGES[0]]: <Homepage />,
        [PAGES[1]]: <Description />,
        [PAGES[2]]: <InputCategories setCategoryPalette={setCategoryPalette} />,
        [PAGES[3]]: <InputHours category_palette={category_palette} setWeekData={setWeekData} week_data={week_data} highlight_missing_data={highlight_missing_data} />,
        [PAGES[4]]: <FinalViz category_palette={category_palette} week_data={week_data} />
    };
    const PageComponent = PAGE_COMPONENTS[PAGES[current_page_index]];


    function handleNext(){
        const is_input_hours_page = current_page_index === 3;
        if (is_input_hours_page){
            const aggregates_for_each_day = week_data.map((day_obj)=> Object.values(day_obj.aggregate));
            const data_missing = aggregates_for_each_day.flat().includes(UNFILLED);

            if (data_missing){
                setHighlightMissingData(true);
                return;
            }
        }
        setCurrentPageIndex(current_page_index + 1);
    }

    useEffect(()=>{
        if (highlight_missing_data){
            setTimeout(()=>{
                setHighlightMissingData(false);
            }, 100);
        }
    }, [highlight_missing_data]);


    function handleBack(){
        setCurrentPageIndex(current_page_index - 1);
    }

    return (
        <div>
            <Nav
                current_page_index={current_page_index}
                handleBack={handleBack}
                handleNext={handleNext}
            />
            {PageComponent}

        </div>
    );

}

export default App;
