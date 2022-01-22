import { ListName } from "./general_styles";
import { PlusIcon } from "./PlusIcon";

export function AddCategory({ updateCategories, list_index, array_index }) {
    return (
        <ListName bottom = "40px" position = "absolute">
            <PlusIcon updateCategories = {updateCategories} list_index = {list_index} array_index = {array_index} />
            <span>{"Add new"}</span>
        </ListName>
    );
}