import styled from "styled-components";
import { ListName } from "./general_styles";
import { MinusIcon } from "./MinusIcon";
import { useRef, useEffect } from "react";

const EditableSpan = styled.span`
  &:focus {outline: none;};
`;

export function CategoryItem({ category_obj, editCategory, removeCategory, category_index }) {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();
    }, []);

    function handleInput(d) {
        if (d.charCode === 13) {
            editCategory(category_index, { category: d.target.innerHTML, editable: false });
        }
    }

    function handleBlur(d) {
        editCategory(category_index, { category: d.target.innerHTML, editable: false });
    }



    return (
        <ListName>
            <MinusIcon
                removeCategory = {removeCategory}
                category_index={category_index}
            />
            <EditableSpan
                ref = {ref}
                suppressContentEditableWarning={true}
                contentEditable = {category_obj.editable}
                onKeyPress = {handleInput}
                onBlur = {handleBlur}>
                {category_obj.category}
            </EditableSpan>
        </ListName>
    );
}