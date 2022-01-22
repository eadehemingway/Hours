import { AddCategory } from "./AddCategory";
import { CategoryItem } from "./CategoryItem";
import { ColumnHeader, ColumnThree } from "./general_styles";

export function Categories({data, updateCategories, list_index}) {
    return (
      <ColumnThree>
        <ColumnHeader>{data.name}</ColumnHeader>
        {data.categories.map((d, i) => <CategoryItem updateCategories = {updateCategories} data = {d} list_index = {list_index} array_index = {i}  key = {`categories_${i}`}/>)}
        <AddCategory updateCategories = {updateCategories} list_index = {list_index} array_index = {data.categories.length - 1} />
      </ColumnThree>
    );
}