import { useEffect, useState } from "react";
import { CategoryItem } from "./CategoryItem";
import styled from "styled-components";
import { ListName } from "./general_styles";
import { PlusIcon } from "./PlusIcon";


export function CategoryPalette({ palette_data, updatePalettes, palette_index }) {
    const [categories, setCategories] = useState(palette_data.categories);

    function editCategory(category_index, obj){
        const new_category_list = [...categories];
        new_category_list[category_index]= obj;
        setCategories(new_category_list);
    }

    function removeCategory(category_index){
        const new_category_list = [...categories];
        new_category_list.splice(category_index, 1);
        setCategories(new_category_list);

    }

    function addNewCategory(){
        const new_category_list = [...categories];
        new_category_list.push({ category: "", editable: true });
        setCategories(new_category_list);
    }

    useEffect(()=>{
        updatePalettes(palette_index, categories);
    }, [categories]);

    return (
        <TabContents>
            {categories.map((d, i) => <CategoryItem
                key={i}
                category_obj={d}
                category_index ={i}
                editCategory={editCategory}
                removeCategory ={removeCategory}
            />)}
            <ListName >
                <PlusIcon
                    handleClick = {addNewCategory}
                />
                <span>{"Add new"}</span>
            </ListName>
        </TabContents>
    );
}

const TabContents = styled.div`
 padding: 50px;
`;
