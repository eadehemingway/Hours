import { ListName } from "./general_styles";
import { PlusIcon } from "./PlusIcon";

export function AddCategory({ addNewCategory, list_index, array_index }) {


    return (
        <ListName >
            <PlusIcon
                handleClick = {addNewCategory}
                list_index = {list_index}
                array_index = {array_index} />
            <span>{"Add new"}</span>
        </ListName>
    );
}