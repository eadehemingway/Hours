import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Lists } from "./Lists";
import { CategoryPalette } from  "./CategoryPalette";
import { ColumnThree } from "./general_styles";
import { preset_lists } from "./default_lists";
import { Section, SectionHeader } from "../shared_styles";
import { Tab } from "@headlessui/react";


export function InputCategories({ setCategoryPalette }) {
    const [category_palettes, setCategoryPalettes] = useState(preset_lists);
    const [selected_palette, setSelectedPalette] = useState(null);

    function submit(){
        const category_palette = selected_palette.categories.map(d => d.category);
        setCategoryPalette(category_palette);
    }

    function updatePalettes(palette_index, updated_categories){

        const new_palettes_arr = [...category_palettes];
        new_palettes_arr[palette_index].categories = updated_categories;
        setCategoryPalettes(new_palettes_arr);

    }
    return (
        <Section>
            <SectionHeader>CATEGORIES</SectionHeader>
            <Tab.Group>
                <Tab.List >
                    {category_palettes.map((list, i) => <TabLabel label={list.name} key={i} />)}
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
        </Section>
    );
}

export  function TabLabel({ label }) {
    return (
        <>
            <Tab as={React.Fragment}>
                {({ selected }) => (
                    selected ? (
                        <SelectedTab>
                            {label}
                        </SelectedTab>)

                        : <UnselectedTab>
                            {label}
                        </UnselectedTab>
                )}
            </Tab>
        </>

    );
}

const SelectedTab= styled.button`
  background: none;
  border: 1px solid;
  border-bottom: none;
  padding: 20px;
cursor: pointer;


`;
const UnselectedTab= styled.button`
  background: none;
  border: 1px solid;

  padding: 20px;
cursor: pointer;



`;