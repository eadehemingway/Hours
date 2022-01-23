import { Description } from "./Description";
import React, { useState } from "react";
import { Homepage } from "./Homepage";
import { InputCategories } from "./InputCategories";
import { InputHours } from "./InputHours";
import { FinalViz } from "./Final";
import "./App.css";

function App() {
    const [category_palette, setCategoryPalette] = useState([]);
    const [week_data, setWeekData] = useState([]);
    console.log("week_data:", week_data);
    return (
        <div>
            {/* <Homepage/>

            <Description/>
            <InputCategories setCategoryPalette={setCategoryPalette}/> */}
            <InputHours category_palette={category_palette} setWeekData={setWeekData} week_data={week_data}/>
            {/* <FinalViz category_palette={category_palette} week_data={week_data}/> */}

        </div>
    );

}

export default App;
