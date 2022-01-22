import styled from "styled-components";
import { ListName } from "./general_styles";
import { MinusIcon } from "./MinusIcon";
import { useRef, useEffect } from "react";

const EditableSpan = styled.span`
  &:focus {outline: none;};
`;

export function CategoryItem({ data, updateCategories, list_index, array_index }) {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();
    }, []);

    function handleInput(d) {
        if (d.charCode === 13) {
            updateCategories("edit", list_index, array_index, { category: d.target.innerHTML, editable: false });
        }
    }

    function handleBlur(d) {
        updateCategories("edit", list_index, array_index, { category: d.target.innerHTML, editable: false });
    }

    return (
        <ListName>
            <MinusIcon
                updateCategories = {updateCategories}
                list_index = {list_index}
                array_index = {array_index}
            />
            <EditableSpan
                ref = {ref}
                suppressContentEditableWarning={true}
                contentEditable = {data.editable}
                onKeyPress = {handleInput}
                onBlur = {handleBlur}>
                {data.category}
            </EditableSpan>
        </ListName>
    );
}