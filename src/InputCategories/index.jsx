import React, { useState } from "react";
import styled from "styled-components";
import { CategoryPalette } from  "./CategoryPalette";
import { preset_category_palettes } from "../data";
import { Section, SectionInner, SectionHeader, SelectedTab, UnselectedTab } from "../shared_styles";
import { Tab } from "@headlessui/react";


export function InputCategories({ setCategoryPalette }) {
    const [category_palettes, setCategoryPalettes] = useState(preset_category_palettes);
    const [selected_palette, setSelectedPalette] = useState(preset_category_palettes[0]);

    function updatePalettes(palette_index, updated_categories){
        const new_palettes_arr = [...category_palettes];
        new_palettes_arr[palette_index].categories = updated_categories;
        setCategoryPalettes(new_palettes_arr);
    }

    function submit(){
        const category_palette = selected_palette.categories.map(d => d.category);
        setCategoryPalette(category_palette);
    }

    function onChangeTab(index){
        setSelectedPalette(category_palettes[index]);
    }

    return (
        <Section>
            <SectionHeader>CATEGORIES</SectionHeader>
            <SectionInner>
                <Tab.Group onChange={onChangeTab} >
                    <Tab.List >
                        {category_palettes.map((c, i) => <TabLabel label={c.palette} key={i} />)}
                    </Tab.List>

                    <Tab.Panels >
                        {category_palettes.map((palette_data, i)=>(
                            <Tab.Panel key={i}>
                                <CategoryPalette
                                    updatePalettes={updatePalettes}
                                    palette_index={i}
                                    palette_data ={palette_data}

                                />
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
                <button onClick={submit}>Submit</button>
            </SectionInner>
        </Section>
    );
}

export  function TabLabel({ label }) {
    return (
        <>
            <Tab as={React.Fragment}>
                {({ selected }) => (
                    selected ? (
                        <SelectedTab width = {`calc(100% / ${preset_category_palettes.length})`}>
                            {label}
                        </SelectedTab>)

                        : <UnselectedTab width = {`calc(100% / ${preset_category_palettes.length})`}>
                            {label}
                        </UnselectedTab>
                )}
            </Tab>
        </>

    );
}

