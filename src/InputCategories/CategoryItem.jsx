import styled from "styled-components";
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

    function handleRemove(){
        removeCategory(category_index);
    }

    return (
        <CategoryTile>
            <MinusIcon
                handleClick= {handleRemove}
            />
            <EditableSpan
                ref = {ref}
                suppressContentEditableWarning={true}
                contentEditable = {category_obj.editable}
                onKeyPress = {handleInput}
                onBlur = {handleBlur}>
                {category_obj.category}
            </EditableSpan>
        </CategoryTile>
    );
}

export const CategoryTile = styled.div`
  border: 1px solid red;
  cursor: pointer;
  padding: 50px;

`;