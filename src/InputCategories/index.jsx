import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CategoryPalette } from  "./CategoryPalette";
import { preset_category_palettes } from "../data";
import { Section, SectionInner, SectionHeader, TabStyled } from "../shared_styles";
import { Tab } from "@headlessui/react";
import { useEffect } from "react/cjs/react.development";
import { Nav } from "../Nav";
import { ROUTES } from "../App";


export function InputCategories({ setCategoryPalette }) {
    const [category_palettes, setCategoryPalettes] = useState(preset_category_palettes);
    const [selected_palette, setSelectedPalette] = useState(preset_category_palettes[0]);
    const navigate = useNavigate();
    const handleBack = () => navigate(ROUTES.DESCRIPTION);
    const handleNext = () => navigate(ROUTES.INPUT_HOURS);

    function updatePalettes(palette_index, updated_categories){
        const new_palettes_arr = [...category_palettes];
        new_palettes_arr[palette_index].categories = updated_categories;
        setCategoryPalettes(new_palettes_arr);
    }

    useEffect(()=>{
        const category_palette = selected_palette.categories;
        setCategoryPalette(category_palette);
    }, [selected_palette, setCategoryPalette]);



    function onChangeTab(index){
        setSelectedPalette(category_palettes[index]);
    }

    return (
        <Section>
            <Nav
                show_back={true}
                show_next={true}
                handleBack={handleBack}
                handleNext={handleNext}
            />

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
            </SectionInner>
        </Section>
    );
}

export  function TabLabel({ label }) {
    return (
        <>
            <Tab as={React.Fragment}>
                {({ selected }) => (
                        <TabStyled selected={selected} width = {`calc(100% / ${preset_category_palettes.length})`}>
                            {label}
                        </TabStyled>)}
            </Tab>
        </>

    );
}

