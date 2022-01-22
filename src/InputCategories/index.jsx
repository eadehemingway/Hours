import React, { useState } from "react";
import { Header } from './Header';
import { Lists } from './Lists';
import { Categories } from  "./Categories";
import { ColumnThree } from "./general_styles";
import { preset_lists } from './default_lists'
import { Section, SectionHeader } from '../shared_styles'

export function InputCategories({setCategoryPalette}) {
  const [edited_lists, setEditedLists] = useState(preset_lists);
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
    const category_palette = selected_list.categories.map(d => d.category)
    setCategoryPalette(category_palette)
  }
    return (
      <Section>
        <SectionHeader>CATEGORIES</SectionHeader>
        <Lists chooseList = {chooseList} data = {edited_lists}/>
        {selected_list ? <Categories chooseList = {chooseList} updateCategories = {updateCategories} list_index = {selected_list_index} data = {selected_list}/> : <ColumnThree/>}
        <button onClick={submit}>Submit</button>
      </Section>
    );
}