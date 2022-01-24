import { Description } from "./Description";
import React, { useState } from "react";
import { Homepage } from "./Homepage";
import { InputCategories } from "./InputCategories";
import { InputHours } from "./InputHours";
import { FinalViz } from "./Final";
import { Nav } from "./Nav";
import "./App.css";
import { PAGES } from "./data";
// export const PAGES = ["HOME", "DESCRIPTION", "INPUT-CATEGORIES", "INPUT-HOURS", "FINAL"];


function App() {
    const [category_palette, setCategoryPalette] = useState([]);
    const [week_data, setWeekData] = useState();
    // const [page_completion, setPageCompletion] = useState({
    //     home: true,
    //     description: true,
    //     input_categories: false,
    //     input_hours: false,
    // });
    const [current_page_index, setCurrentPageIndex] = useState(0);
    console.log("current_page_index:", current_page_index);
    const PAGE_COMPONENTS = {
        [PAGES[0]]: <Homepage />,
        [PAGES[1]]: <Description />,
        [PAGES[2]]: <InputCategories setCategoryPalette={setCategoryPalette} />,
        [PAGES[3]]:<InputHours category_palette={category_palette} setWeekData={setWeekData} week_data={week_data} />,
        [PAGES[4]]:<FinalViz category_palette={category_palette} week_data={week_data} />
    };
    const PageComponent = PAGE_COMPONENTS[PAGES[current_page_index]];
    return (
        <div>
            <Nav current_page_index={current_page_index} setCurrentPageIndex={setCurrentPageIndex}/>
            {PageComponent}
            {/* <Homepage />
            <Description />
            <InputCategories setCategoryPalette={setCategoryPalette} />
            <InputHours category_palette={category_palette} setWeekData={setWeekData} week_data={week_data} />
            <FinalViz category_palette={category_palette} week_data={week_data} /> */}

        </div>
    );

}

export default App;
