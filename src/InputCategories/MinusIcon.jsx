import { IconOuter } from "./general_styles";
let minus_icon_path = "M 25 50 L 75 50";

export function MinusIcon({ removeCategory, category_index }) {
    function handleClick() {
        removeCategory(category_index);
    }
    return (
        <IconOuter onClick = {handleClick}>
            <svg viewBox='0 0 100 100'>
                <path strokeWidth='2px' stroke="black" d={minus_icon_path}/>
            </svg>
        </IconOuter>
    );
}