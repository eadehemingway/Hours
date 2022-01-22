import { Description } from "./Description";
import React, { useState } from "react";
import { Homepage } from "./Homepage";
import { InputCategories } from "./InputCategories";
import { InputHours } from "./InputHours";
import { FinalViz } from "./Final";
import './App.css';

function App() {
  const [category_palette, setCategoryPalette] = useState([])
  const [week_data, setWeekData] = useState([])
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <Homepage/>

      <Description/>
      <InputCategories setCategoryPalette={setCategoryPalette}/>
      <InputHours category_palette={category_palette} setWeekData={setWeekData}/>
      <FinalViz category_palette={category_palette} week_data={week_data}/>

    </div>
  );

}

export default App;
