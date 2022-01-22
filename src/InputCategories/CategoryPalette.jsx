import { useEffect, useState } from "react";
import { AddCategory } from "./AddCategory";
import { CategoryItem } from "./CategoryItem";
import { ColumnHeader, ColumnThree } from "./general_styles";

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

    function unmount(){
        console.log("categories:", categories);
        updatePalettes(palette_index, categories);
    }


    useEffect(()=>{
        return unmount;
    }, [categories]);

    return (
        <ColumnThree>
            <ColumnHeader>{palette_data.name}</ColumnHeader>
            {categories.map((d, i) => <CategoryItem
                key={i}
                category_obj={d}
                category_index ={i}
                editCategory={editCategory}
                removeCategory ={removeCategory}
            />)}

            <AddCategory
                addNewCategory = {addNewCategory}
            />
        </ColumnThree>
    );
}