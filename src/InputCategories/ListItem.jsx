import { ListName } from "./general_styles";

export function ListItem({ data, list_i, chooseList }) {
    function handleClick() {
        chooseList(list_i);
    }
    return (
        <ListName className="list-item" onClick={handleClick}>{data.name}</ListName>
    );
}