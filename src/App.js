import { Description } from "./Description";
import React, { useState, useEffect } from "react";
import { Homepage } from "./Homepage";
import { InputCategories } from "./InputCategories";
import { InputHours } from "./InputHours";
import { FinalViz } from "./Final";
import { colors_array } from "./data";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

export const ROUTES = { HOME: "/", DESCRIPTION: "/description", INPUT_CATEGORIES: "/input-categories", INPUT_HOURS: "/input-hours", FINAL_VIZ: "/final-viz" };
function App() {
    const [category_palette, setCategoryPalette] = useState([]);
    const [week_data, setWeekData] = useState();
    const [colors, setColors] = useState(colors_array);

    return (
        <div>

            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route exact path={ROUTES.HOME} element={<Homepage/>}/>
                        <Route exact path={ROUTES.DESCRIPTION} element={<Description/>}/>
                        <Route exact path={ROUTES.INPUT_CATEGORIES} element={<InputCategories colors={colors} setCategoryPalette={setCategoryPalette} />}/>
                        <Route exact path={ROUTES.INPUT_HOURS} element={<InputHours colors={colors} category_palette={category_palette} setWeekData={setWeekData} week_data={week_data} />}/>
                        <Route exact path={ROUTES.FINAL_VIZ} element={<FinalViz colors={colors} category_palette={category_palette} week_data={week_data} />}/>

                    </Routes>
                </div>
            </BrowserRouter>


        </div>
    );

}

export default App;
