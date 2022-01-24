import { Description } from "./Description";
import React, { useState, useEffect } from "react";
import { Homepage } from "./Homepage";
import { InputCategories } from "./InputCategories";
import { InputHours } from "./InputHours";
import { FinalViz } from "./Final";
import { Nav } from "./Nav";
import { createDay, fillHours, emptyHours, FILLED, UNFILLED, DAYS_ARR } from "./InputHours/hours";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

export const ROUTES = { HOME: "/", DESCRIPTION: "/description", INPUT_CATEGORIES: "/input-categories", INPUT_HOURS: "/input-hours", FINAL_VIZ: "/final-viz" };
function App() {
    const [category_palette, setCategoryPalette] = useState([]);
    const [week_data, setWeekData] = useState();

    return (
        <div>

            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route exact path={ROUTES.HOME} element={<Homepage/>}/>
                        <Route exact path={ROUTES.DESCRIPTION} element={<Description/>}/>
                        <Route exact path={ROUTES.INPUT_CATEGORIES} element={<InputCategories setCategoryPalette={setCategoryPalette} />}/>
                        <Route exact path={ROUTES.INPUT_HOURS} element={<InputHours category_palette={category_palette} setWeekData={setWeekData} week_data={week_data} />}/>
                        <Route exact path={ROUTES.FINAL_VIZ} element={<FinalViz category_palette={category_palette} week_data={week_data} />}/>

                    </Routes>
                </div>
            </BrowserRouter>


        </div>
    );

}

export default App;
