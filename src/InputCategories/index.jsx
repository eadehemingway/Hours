import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { Lists } from "./Lists";
import { Categories } from  "./Categories";
import { ColumnThree } from "./general_styles";
import { preset_lists } from "./default_lists";
import { Section, SectionHeader } from "../shared_styles";
import { Tab } from "@headlessui/react";


export function InputCategories({ setCategoryPalette }) {
    const [edited_lists, setEditedLists] = useState(preset_lists);
    console.log("edited_lists:", edited_lists);
    const [selected_list, setSelectedList] = useState(null);
    const [selected_list_index, setSelectedListIndex] = useState(null);

    function chooseList(list_i) {
        setSelectedListIndex(list_i);
        setSelectedList(edited_lists[list_i]);
    }

    function updateCategories(action, list_i, array_i, obj) {
        let lists = [...edited_lists];
        if (action === "edit") lists[list_i].categories[array_i] = obj;
        if (action === "add") lists[list_i].categories.push(obj);
        if (action === "remove") lists[list_i].categories.splice(array_i, 1);
        setEditedLists(lists);
    }


    function submit(){
        const category_palette = selected_list.categories.map(d => d.category);
        setCategoryPalette(category_palette);
    }
    return (
        <Section>
            <SectionHeader>CATEGORIES</SectionHeader>
            <Tab.Group>
                <Tab.List >
                    {edited_lists.map((list, i) => <TabLabel label={list.name} key={i} />)}
                </Tab.List>

                <Tab.Panels >

                    {edited_lists.map((list, i)=>(
                        <Tab.Panel key={i}>
                            <Categories
                                chooseList={chooseList}
                                updateCategories={updateCategories}
                                list_index={selected_list_index}
                                data ={list}
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