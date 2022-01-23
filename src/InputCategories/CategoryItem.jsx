import styled from "styled-components";
import { MinusIcon } from "./MinusIcon";
import { useRef, useEffect } from "react";
import { useState } from "react/cjs/react.development";



export function CategoryItem({ category_obj, editCategory, removeCategory, category_index }) {
    const [category_title, setCategoryTitle] = useState("");
    console.log("category_title:", category_title);
    const [category_description, setCategoryDescription] = useState("");
    const ref = useRef(null);

    useEffect(() => {
        ref.current.focus();

    }, []);

    useEffect(()=>{
        setCategoryTitle(category_obj.category);
        setCategoryDescription(category_obj.description);
    }, [category_obj]);

    function handleInput(d) {
        if (d.charCode === 13) {
            editCategory(category_index, { category: category_title, editable: true, description: category_description });
        }
    }

    function handleBlur(d) {
        editCategory(category_index, { category:category_title, editable: true , description: category_description });
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
                disabled = {!category_obj.editable}
                onKeyPress = {handleInput}
                onBlur = {handleBlur}
                onChange={(e)=>{setCategoryTitle(e.target.value);}}
                value={category_title}
                type="text"
                editable = {category_obj.editable}
            />
            <EditableSpan
                ref = {ref}
                suppressContentEditableWarning={true}
                disabled = {!category_obj.editable}
                onKeyPress = {handleInput}
                onBlur = {handleBlur}
                onChange={(e)=>{setCategoryDescription(e.target.value);}}
                value={category_description}
                editable = {category_obj.editable}
                type="text"
            />

        </CategoryTile>
    );
}

export const CategoryTile = styled.div`
  border: 1px solid red;
  cursor: pointer;
  padding: 50px;
  position: relative;
  :hover{
    #minus-icon{
        display: block;
    }
  }

`;


const EditableSpan = styled.input`
    &:focus {outline: none;};
    background: none;
    border: ${props=> props.editable ? "1px solid": "none"}
`;